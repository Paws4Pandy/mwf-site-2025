# Google Sheets Newsletter Setup Guide

## Overview
This setup automatically saves newsletter signups to a Google Sheet with organized columns and tracking.

## Google Sheet Columns
Your newsletter sheet will automatically include:
- **Name** (optional field)
- **Email** (required)
- **Interest Category** (dropdown selection)
- **Signup Date** (automatically added)
- **Source Page** (Contact, Playbooks, etc.)
- **Status** (Active, Unsubscribed, etc.)

## Setup Instructions

### 1. Create Google Sheet
1. Create a new Google Sheet at https://sheets.google.com
2. Name it "MortgageWithFord Newsletter"
3. Copy the Sheet ID from the URL (the long string between /spreadsheets/d/ and /edit)

### 2. Create Google Service Account
1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name: "newsletter-manager"
   - Download the JSON key file

### 3. Share Google Sheet
1. In your Google Sheet, click "Share"
2. Add the service account email (from the JSON file)
3. Give it "Editor" permissions

### 4. Environment Variables
Add these to your Vercel environment variables:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=newsletter-manager@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----"

# Existing Email Variables
GMAIL_USER=andreina@mortgagewithford.ca
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### 5. Vercel Deployment
1. Add environment variables in Vercel dashboard
2. Redeploy your site
3. Test newsletter signup

## Features

### Automated Data Collection
- All newsletter signups automatically saved to Google Sheet
- Includes timestamp and source tracking
- Organized by interest category for targeted campaigns

### Backup System
- If Google Sheets fails, falls back to email notification
- Ensures no signups are lost
- Development mode simulation for testing

### Interest Categories
- First-Time Home Buyer
- Investment Properties  
- Refinancing
- Mortgage Renewal
- Self-Employed Mortgages
- Cottage & Vacation Properties
- Rate Updates & Market News
- General Mortgage Advice

## Benefits

### Organized Newsletter Management
- Easy filtering by interest category
- Targeted email campaigns
- Growth tracking over time
- Export capabilities for email marketing tools

### Analytics & Insights
- Track which pages generate most signups
- Monitor interest trends
- Identify popular content categories
- Measure conversion rates

## Usage
Once set up, the system automatically:
1. Saves every newsletter signup to Google Sheet
2. Sends email notification to you
3. Tracks source page and interests
4. Organizes data for easy management

## Support
If you need help setting this up, the system will still work with email-only notifications until Google Sheets is configured.