/**
 * Google Apps Script to handle RSVP submissions from the wedding website.
 * 
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 * 5. Copy the Web App URL and add it to your project's .env file.
 */

function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data;

    try {
        data = JSON.parse(rawData);
    } catch (err) {
        // Fallback if content type issues occur, though unlikely with our frontend setup
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

function doGet(e) {
    return ContentService.createTextOutput("RSVP API is running!");
}
