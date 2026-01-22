/**
 * Google Apps Script for Bon Voyage Contact Form
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Spreadsheet
 *    - Go to https://sheets.google.com and create a new sheet
 *    - Name it "Bon Voyage Contact Form Submissions"
 *    - Add these headers in Row 1: Timestamp | Name | Email | Subject | Message | Source
 * 
 * 2. Open Apps Script
 *    - In your spreadsheet, go to Extensions > Apps Script
 *    - Delete any existing code and paste this entire script
 * 
 * 3. Deploy as Web App
 *    - Click "Deploy" > "New deployment"
 *    - Choose type: "Web app"
 *    - Description: "Contact Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL
 * 
 * 4. Add URL to your .env file
 *    - In your Bon-Voyage project, create/edit .env file
 *    - Add: VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 * 
 * 5. Restart your dev server for the env variable to take effect
 */

// Spreadsheet ID - you can find this in your sheet's URL
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual ID

function doPost(e) {
    try {
        // Parse the incoming JSON data
        const data = JSON.parse(e.postData.contents);

        // Open the spreadsheet
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

        // Append the row with form data
        sheet.appendRow([
            data.timestamp || new Date().toISOString(),
            data.name || '',
            data.email || '',
            data.subject || '',
            data.message || '',
            data.source || 'Website'
        ]);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle GET requests (for testing)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'ok',
            message: 'Bon Voyage Contact Form API is running'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this in Apps Script to verify setup
function testAppendRow() {
    const testData = {
        timestamp: new Date().toISOString(),
        name: 'Test User',
        email: 'test@example.com',
        subject: 'general',
        message: 'This is a test message',
        source: 'Test Script'
    };

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    sheet.appendRow([
        testData.timestamp,
        testData.name,
        testData.email,
        testData.subject,
        testData.message,
        testData.source
    ]);

    Logger.log('Test row added successfully!');
}
