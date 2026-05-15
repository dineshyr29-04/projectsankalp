import { collection, query, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as XLSX from "xlsx";
import { db, storage } from "./firebase";

// Debounce duration to coalesce rapid updates
const DEBOUNCE_MS = 1500;

let timer = null;
let isUploading = false;

function makePaymentSheet(teams) {
  const data = teams.map((team) => ({
    "Team ID": team.teamId,
    "Team Name": team.teamName,
    Domain: team.selectedDomain,
    "Payment Status":
      team.paymentStatus || team.paymentStatus === 0
        ? team.paymentStatus === "VERIFIED" || team.paymentVerified
          ? "Verified"
          : "Pending"
        : team.paymentVerified
          ? "Verified"
          : "Pending",
    "Transaction ID": team.transactionId || "-",
    "Verified By": team.verifiedBy || "-",
    "Verification Date": team.verificationDate
      ? new Date(team.verificationDate).toLocaleString()
      : "-",
    Notes: team.notes || "-",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Payment Verification");
  ws["!cols"] = [
    { wch: 12 },
    { wch: 30 },
    { wch: 18 },
    { wch: 15 },
    { wch: 20 },
    { wch: 22 },
    { wch: 30 },
  ];
  return wb;
}

function makeRegistrationSheet(teams) {
  const data = teams.map((team, i) => ({
    "S.No": i + 1,
    "Team ID": team.teamId,
    "Team Name": team.teamName,
    Domain: team.selectedDomain,
    "Check-in Status": team.checkedIn ? "Checked In" : "Not Checked In",
    "Check-in Time": team.checkInTime
      ? new Date(team.checkInTime).toLocaleString()
      : "-",
    "Total Members": team.memberCount || "-",
    Contact: team.contactPerson || "-",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registration Check-in");
  ws["!cols"] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 30 },
    { wch: 18 },
    { wch: 16 },
    { wch: 20 },
    { wch: 14 },
    { wch: 20 },
  ];
  return wb;
}

function makeDomainSummary(teams) {
  const stats = {};
  teams.forEach((team) => {
    const d = team.selectedDomain || "unknown";
    stats[d] = stats[d] || { total: 0, verified: 0 };
    stats[d].total += 1;
    const isVerified =
      team.paymentStatus === "VERIFIED" || team.paymentVerified;
    if (isVerified) stats[d].verified += 1;
  });

  const data = Object.entries(stats).map(([domain, info]) => ({
    Domain: domain,
    "Total Teams": info.total || 0,
    "Verified/Checked In": info.verified || 0,
    Pending: (info.total || 0) - (info.verified || 0),
    "Completion %": info.total
      ? Math.round((info.verified / info.total) * 100)
      : 0,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Summary");
  ws["!cols"] = [
    { wch: 25 },
    { wch: 12 },
    { wch: 18 },
    { wch: 12 },
    { wch: 14 },
  ];
  return wb;
}

async function uploadWorkbook(wb, path) {
  const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType: blob.type });
  return getDownloadURL(storageRef);
}

/**
 * Start a real-time export sync that updates a fixed Excel file in Storage
 * whenever the `registrations` collection changes.
 * The exported file uses a fixed path (`exports/payment_verification.xlsx`) so
 * the filename remains constant and is overwritten on each update.
 */
export function startExportSync() {
  try {
    const q = query(collection(db, "registrations"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const teams = snapshot.docs.map((d) => ({ ...d.data(), _id: d.id }));

        // Debounce to collapse bursts of realtime updates
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
          if (isUploading) return;
          isUploading = true;
          try {
            const wbPayment = makePaymentSheet(teams);
            const wbRegistration = makeRegistrationSheet(teams);
            const wbSummary = makeDomainSummary(teams);

            // Fixed paths so files always retain same names
            await Promise.all([
              uploadWorkbook(wbPayment, "exports/payment_verification.xlsx"),
              uploadWorkbook(
                wbRegistration,
                "exports/registration_checkin.xlsx",
              ),
              uploadWorkbook(wbSummary, "exports/domain_summary.xlsx"),
            ]);
          } catch (err) {
            console.error("Export sync upload failed:", err);
          } finally {
            isUploading = false;
          }
        }, DEBOUNCE_MS);
      },
      (err) => {
        console.error("Export sync listener error:", err);
      },
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Export sync not started:", err);
    return () => {};
  }
}

export default { startExportSync };
