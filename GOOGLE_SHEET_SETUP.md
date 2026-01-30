# Linking your RSVP Form to Google Sheets

Since we can't directly access your personal Google Drive, you'll need to set up the sheet yourself. It's free and takes about 2 minutes.

## Step 1: Create the Google Sheet
1. Go to [sheet.new](https://sheet.new) to create a new Google Sheet.
2. Name it something like **"Wedding RSVPs"**.
3. (Optional) You can add these headers to the first row, but the script will do it for you if you forget:
   - Timestamp
   - Name
   - Email
   - Attending
   - Plus One
   - Plus One Name
   - Dietary Restrictions

## Step 2: Add the Backend Script
1. In your new Google Sheet, go to the top menu: **Extensions** > **Apps Script**.
2. A new tab will open with a code editor.
3. **Delete any code** that is currently there (like `function myFunction() {...}`).
4. **Copy and paste** the entire code from the file `google-apps-script.js` in your project folder. 
   *(I have included the code below for convenience)*

```javascript
// COPY THIS CODE
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rawData = e.postData.contents;
  var data;
  
  try {
    data = JSON.parse(rawData);
  } catch (err) {
    // Fallback if content type issues occur
    data = e.parameter;
  }

  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "Attending", "Plus One", "Plus One Name", "Dietary Restrictions"]);
  }

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.attending,
    data.plusOne,
    data.plusOneName || "N/A",
    data.dietary || "None"
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy the Web App
1. At the top right of the Apps Script page, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (Select type) next to "Select type" and choose **Web app**.
3. Fill in the details:
   - **Description**: RSVP Endpoint
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (This is crucial! If you select "Only myself", the form won't work for your guests).
4. Click **Deploy**.
5. You might be asked to **Authorize Access**. Click "Review permissions", choose your account, and if you see "Google hasn't verified this app", click **Advanced** > **Go to (Script Name) (unsafe)**. It is safe; it's your own code.

## Step 4: Connect it to the Website
1. Once deployed, you will see a **Web App URL** (starts with `https://script.google.com/...`).
2. **Copy this URL**.
3. Create a file named `.env` in your project root (same folder as `package.json`).
4. Paste the URL like this:
   ```
   VITE_RSVP_API_URL=https://script.google.com/macros/s/LONG_STRING_HERE/exec
   ```
5. **Restart your local server** (`npm run dev`) for the changes to take effect.

## Step 5: Test It
1. Go to your local website.
2. Fill out the RSVP form and submit.
3. Check your Google Sheet—the new row should appear instantly!
