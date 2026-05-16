# FitLedger Trainer

Mobile-first MVP for a freelance gym trainer who manages clients across multiple society gyms.

## What It Does

- Tracks clients, society gyms, start dates, monthly fee, and experience level
- Adds new society gyms from the app
- Tracks payment cycles from each client's joining date
- Records payments and shows pending/collected totals
- Opens WhatsApp with a prefilled reminder message
- Logs attendance, body parts trained, exercises, and notes
- Provides a larger exercise library filtered by body part and level, with reference thumbnails
- Opens exercise guides with image references, coaching cues, and an explainer video search
- Shares level-based workout packs to clients by body part through WhatsApp
- Adds basic local password protection with a security-question reset flow
- Includes a Google Apps Script backend starter for Google Sheets

## Run Locally

Run a tiny static server:

```bash
npm run start
```

Then open:

```text
http://127.0.0.1:5173
```

The prototype starts with sample data and saves edits to browser local storage.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for GitHub Pages hosting, PWA install, TestFlight, and Google Play setup.

## Google Sheets Backend

1. Create a Google Sheet.
2. Open Extensions > Apps Script.
3. In this project, open `apps-script/Code.gs` and copy the full file contents.
4. In Apps Script, delete the default `function myFunction() {}` code.
5. Paste the full contents of `apps-script/Code.gs`.
6. Click Save.
7. In the function dropdown near Run, select `setupWorkbook`.
8. Click Run once and approve the Google permissions prompt.
9. Go back to the Google Sheet. The required tabs should now exist.
10. Click Deploy > New deployment.
11. Choose type: Web app.
12. Set Execute as: Me.
13. Set Who has access: Anyone.
14. Click Deploy and copy the Web App URL. It should end with `/exec`.
15. Open the FitLedger app.
16. Tap the status pill in the top-right, currently `Local only`.
17. Paste the Web App URL and click Save and load sheet.

Do not paste the text `apps-script/Code.gs` into Apps Script. That is only the local filename.

## How Sync Works

- Before connecting, the app saves data only in the browser's local storage.
- After connecting, new clients, payment records, workout logs, and exercises are sent to Google Sheets.
- New societies are also sent to Google Sheets.
- The app also loads existing Sheet rows when it starts.
- If you edit `apps-script/Code.gs` later, create a new Apps Script deployment version or update the existing deployment.

## Resetting Old Sample Data

This version no longer preloads sample societies, clients, payments, or sessions. If you previously opened the older prototype, refresh the app after this update. The app uses a new local storage key, so the old sample societies should disappear automatically.

## Important

For the simplest v1 private-link setup, deploy the Web App with:

- Execute as: `Me`
- Who has access: `Anyone`

This does not make the Google Sheet itself public. It only lets the app call your Apps Script URL.

## Sheet Tabs

- `Societies`: society gyms
- `Clients`: client profile and joining details
- `Payments`: payment cycle status
- `Sessions`: attendance and workout logs
- `Exercises`: exercise library
- `BodyParts`: configurable body part list
