import * as XLSX from 'xlsx';

/**
 * Export payment verification data to Excel
 * @param {Array} teams - Array of team payment data
 * @param {String} fileName - Name of the file to export
 */
export const exportPaymentVerification = (teams, fileName = 'payment_verification') => {
  const data = teams.map(team => ({
    'Team ID': team.teamId,
    'Team Name': team.teamName,
    'Domain': team.domain,
    'Payment Status': team.paymentVerified ? 'Verified' : 'Pending',
    'Verified By': team.verifiedBy || '-',
    'Verification Date': team.verificationDate ? new Date(team.verificationDate).toLocaleDateString() : '-',
    'Transaction ID': team.transactionId || '-',
    'Notes': team.notes || '-'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Payment Verification');

  // Style the header
  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 20 },
    { wch: 18 },
    { wch: 15 },
    { wch: 15 },
    { wch: 18 },
    { wch: 18 },
    { wch: 25 }
  ];

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

/**
 * Export registration check-in data to Excel
 * @param {Array} teams - Array of team registration data
 * @param {String} fileName - Name of the file to export
 */
export const exportRegistrationCheckIn = (teams, fileName = 'registration_checkin') => {
  const data = teams.map((team, index) => ({
    'S.No': index + 1,
    'Team ID': team.teamId,
    'Team Name': team.teamName,
    'Domain': team.domain,
    'Check-in Status': team.checkedIn ? 'Checked In' : 'Not Checked In',
    'Check-in Time': team.checkInTime ? new Date(team.checkInTime).toLocaleString() : '-',
    'Total Members': team.memberCount || '-',
    'Contact': team.contactPerson || '-'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registration Check-in');

  worksheet['!cols'] = [
    { wch: 8 },
    { wch: 12 },
    { wch: 20 },
    { wch: 18 },
    { wch: 16 },
    { wch: 20 },
    { wch: 14 },
    { wch: 20 }
  ];

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

/**
 * Export multiple sheets to a single Excel file
 * @param {Object} sheetsData - Object with sheet names as keys and data arrays as values
 * @param {String} fileName - Name of the file to export
 */
export const exportMultipleSheets = (sheetsData, fileName = 'export') => {
  const workbook = XLSX.utils.book_new();

  Object.entries(sheetsData).forEach(([sheetName, data]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31)); // Sheet names limited to 31 chars
  });

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

/**
 * Export domain-wise summary statistics
 * @param {Object} stats - Statistics object by domain
 * @param {String} fileName - Name of the file to export
 */
export const exportDomainSummary = (stats, fileName = 'domain_summary') => {
  const data = Object.entries(stats).map(([domain, info]) => ({
    'Domain': domain,
    'Total Teams': info.total || 0,
    'Verified/Checked In': info.verified || 0,
    'Pending': (info.total || 0) - (info.verified || 0),
    'Completion %': info.total ? Math.round((info.verified / info.total) * 100) : 0
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');

  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 12 },
    { wch: 18 },
    { wch: 12 },
    { wch: 14 }
  ];

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};
