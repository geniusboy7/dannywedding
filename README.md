# Daniella & Prince Wedding Website

A beautiful, responsive wedding invitation and RSVP website built with React and Vite.

## Features

- **Personalized RSVP Flow**: Guests can RSVP directly on the site.
- **Dynamic Countdown**: Real-time countdown to the big day.
- **Interactive Map**: Integration with Google Maps for venue directions.
- **Gallery**: Beautifully curated photo galleries of the couple.
- **Personalized Invitation**: Automated PDF generation for guest invitation cards after RSVP.
- **Google Sheets Integration**: RSVP data is automatically synced to a Google Sheet via Apps Script.

## Tech Stack

- **Frontend**: React, Vite, Vanilla CSS
- **PDF Generation**: html2canvas, jspdf
- **Backend/Data**: Google Apps Script, Google Sheets
- **Hosting**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Google Apps Script URL:
   ```env
   VITE_RSVP_API_URL=your_google_script_url
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### GitHub
1. Create a new repository on GitHub.
2. Add the remote:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Vercel
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Add the `VITE_RSVP_API_URL` environment variable in the Vercel dashboard.

5. Click **Deploy**.
