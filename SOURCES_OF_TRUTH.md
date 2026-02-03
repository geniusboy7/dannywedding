# Sources of Truth

This document outlines the central locations for all reusable functions, utilities, constants, and patterns within the Daniella & Prince Wedding Website project.

## Constants

### Wedding Details
- **Location**: `src/constants/wedding.js`
- **Description**: Contains all static information about the wedding (names, date, venue, location, RSVP deadline, Google Maps URL, dress code).
- **Callers**: `Hero.jsx`, `Details.jsx`, `SuccessModal.jsx`, `Countdown.jsx`, `App.jsx`, `ImageSlider.jsx` (for captions).

### Galleries
- **Location**: `src/constants/galleries.js`
- **Description**: Contains the array of photo galleries with titles, covers, and sub-images.
- **Callers**: `Gallery.jsx`, `ImageSlider.jsx`.

## Utilities

### Calendar Service
- **Location**: `src/utils/calendar.js`
- **Description**: Logic for generating `.ics` files and initiating file downloads.
- **Functions**:
  - `generateICS(event)`: Creates the string content for an Apple/Google calendar event.
  - `downloadCalendarFile(filename, content)`: Triggers a browser download.
- **Callers**: `SuccessModal.jsx`, `Details.jsx` (refactored).

### Celebration Logic (Confetti)
- **Location**: `src/utils/confetti.js`
- **Description**: Triggers the visual confetti celebration.
- **Functions**:
  - `triggerConfetti()`: Configures and fires the `canvas-confetti` effect.
- **Callers**: `SuccessModal.jsx`.

## Backend Services

### RSVP Google Sheets Bridge
- **Location**: `google-apps-script.js` (Root)
- **Description**: The standalone script deployed as a Google Web App to receive JSON and log it to a spreadsheet.
- **Endpoints**: `doPost(e)`, `doGet(e)`.

## Design Patterns

### CSS Variables
- **Location**: `src/index.css`
- **Description**: Central design tokens for colors (teal, gold, rustic-gold), typography (Playfair, Outfit), and layout (container width).

### Animation Classes
- **Location**: `src/index.css`
- **Description**: Reusable animation classes like `.animate-in` (fades up) used for entry animations across all sections.
