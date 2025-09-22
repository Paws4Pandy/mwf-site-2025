# Google Maps API Configuration Guide

## Problem: RefererNotAllowedMapError

This error occurs when the Google Maps API key has domain restrictions that don't allow the current domain.

## Solution: Configure API Key Domain Restrictions

### Step 1: Access Google Cloud Console
1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Find your Google Maps API key (currently: `AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`)
3. Click on the API key to edit it

### Step 2: Configure Application Restrictions
In the API key settings, under "Application restrictions":

1. Select "HTTP referrers (web sites)"
2. Add the following referrer patterns:

```
# Production domain
https://www.mortgagewithford.ca/*
https://mortgagewithford.ca/*

# Development (localhost)
http://localhost:*/*
http://127.0.0.1:*/*
```

### Step 3: API Restrictions
Under "API restrictions":
1. Select "Restrict key" 
2. Choose:
   - Maps JavaScript API
   - Places API (if using autocomplete)
   - Geocoding API (if using address lookup)

### Step 4: Environment Variable Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Add your API key to `.env.local`:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### Step 5: Test Configuration
1. Save the API key settings in Google Cloud Console
2. Wait 5-10 minutes for changes to propagate
3. Refresh the website and check the /contact page
4. Open browser DevTools Console to verify no errors

## Troubleshooting

### Still getting RefererNotAllowedMapError?
1. Double-check the referrer patterns include your exact domain
2. Wait 10 minutes for Google's changes to propagate
3. Clear browser cache and refresh
4. Check the exact error in DevTools Console

### Alternative: Create New API Key
If you can't modify the existing key:
1. Create a new Google Maps API key
2. Configure it with the correct domain restrictions
3. Update `.env.local` with the new key

### Fallback Behavior
The website now includes proper fallback UI when Maps fails to load:
- Shows loading spinner initially
- Displays service area list if Maps fails
- Provides contact information as backup

## Current Domains to Configure:
- Production: `mortgagewithford.ca`
- Development: `localhost` (any port)