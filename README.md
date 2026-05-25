# Project Sankalp - Code4Change

A modern, responsive website for **Project Sankalp**, a premier 24-hour hackathon designed to empower developers, designers, and innovators to build technology that solves real-world challenges.

## About Project Sankalp

Project Sankalp is an initiative to bring together creative minds to collaborate on impactful projects focused on social good. Whether you are a beginner or a pro, join us to innovate, collaborate, and create a lasting impact.

**Event Details:**

- **Date**: May 24-25, 2026
- **Duration**: 24 Hours
- **Location**: Yendurance zone, Yenepoya University, Deralakatte, Mangalore
- **Participants**: 500+
- **Prize Pool**: ₹100k
- **Mentors**: 5

## Hackathon Tracks

Project Sankalp features three impactful tracks focused on solving real-world challenges:

### 1. Women's Entrepreneurship

**Economic Empowerment**

- Championing gender equality by building tools for financial independence
- Focus: Financial Independence, Leadership Tools, Micro-Business Scaling

### 2. Health & Sanitation

**Community Wellbeing**

- Developing innovative systems for preventive healthcare and clean water
- Focus: Preventive Care, Clean Water Tech, Wellness Monitoring

### 3. Climate Action

**Environmental Sustainability**

- Harnessing technology to combat climate change and promote green energy
- Focus: Renewable Energy, Circular Economy, Waste Optimization

## Technology Stack

This website is built with modern web technologies for optimal performance and user experience:

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Animation**: Framer Motion
- **Smooth Scrolling**: Lenis
- **UI Components**: Lucide React
- **Code Quality**: ESLint
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## Project Structure

```
projectsankalp/
├── src/
│   ├── components/
│   │   ├── core/              # Reusable core components
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx
│   │   │   └── Section.jsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── StagesPage.jsx
│   │   │   ├── TeamPage.jsx
│   │   │   ├── TracksPage.jsx
│   │   │   └── WinnersPage.jsx
│   │   ├── sections/          # Hero sections
│   │   │   ├── About.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Prizes.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Sponsors.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Timeline.jsx
│   │   │   └── Tracks.jsx
│   │   └── ui/                # UI components
│   │       └── loader-11.jsx
│   ├── config/                # Configuration files
│   │   ├── navigation.js
│   │   └── site.js
│   ├── hooks/                 # Custom React hooks
│   │   ├── useNavbar.js
│   │   └── useScroll.js
│   ├── styles/                # Global styles
│   │   ├── globals.css
│   │   └── theme.css
│   ├── utils/                 # Utility functions
│   │   └── helpers.js
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── public/                    # Static assets
├── config files               # Vite, Tailwind, ESLint, PostCSS configs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd projectsankalp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

## Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the project for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## Key Features

- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Beautiful transitions and animations using Framer Motion
- **Smooth Scrolling**: Enhanced scrolling experience with Lenis
- **Performance Optimized**: Fast load times with Vite and optimized assets
- **Analytics Integration**: Vercel Analytics for performance monitoring
- **Accessibility**: Built with accessibility best practices
- **Dark Mode Ready**: Tailwind CSS configuration for dark/light modes

## Pages & Sections

- **Hero** - Eye-catching landing section with CTA
- **About** - Information about Project Sankalp
- **Event Details** - Date, time, location, and logistics
- **Tracks** - Detailed information about the three hackathon tracks
- **Prizes** - Prize distribution and rewards
- **FAQ** - Frequently asked questions
- **Sponsors** - Event sponsors showcase
- **Team** - Team members and organizers
- **Winners** - Previous hackathon winners showcase
- **Timeline** - Event schedule and timeline

## Configuration

### Site Configuration

Edit `src/config/site.js` to update:

- Event name, subtitle, and description
- Event date, duration, and location
- Tracks and their details
- Stats and other event information

### Navigation

Edit `src/config/navigation.js` to modify the navbar navigation links

## Deployment

The project is configured for deployment on Vercel:

1. Push your changes to your repository
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your changes

View `vercel.json` for Vercel-specific configurations.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues regarding the hackathon, please contact the event organizers.

---

**Made with ❤️ for Project Sankalp - Code4Change**

