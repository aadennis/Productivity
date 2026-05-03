# Productivity
Utilities to improve personal productivity. Start with time-stealers, like monitoring viewing of Youtube Shorts

# Time Tracker Chrome Extension

## Overview
The Time Tracker Chrome Extension helps users monitor the time they spend on specific websites, such as YouTube Shorts and Facebook Marketplace. It provides a simple overlay on the webpage to display the tracked time and stores the data locally for easy access.

## Features
- Tracks time spent on YouTube Shorts and Facebook Marketplace.
- Displays an overlay with the total time spent on the current category.
- Automatically updates the time data when switching tabs or URLs.
- Resets data at midnight to start fresh each day.

## Code Files

### 1. `background.js`
- Implements the logic for tracking time spent on specific categories of websites.
- Uses `chrome.storage.local` to store time data persistently.
- Updates the active tab's category and tracks elapsed time.
- Includes a mechanism to reset data at midnight.

### 2. `content.js`
- Creates an overlay on the webpage to display tracked time.
- Formats time into `HH:MM:SS` format for better readability.
- Updates the overlay dynamically based on the current URL and stored time data.
- Listens for changes in storage or URL to refresh the overlay.

### 3. `manifest.json`
- Defines the Chrome extension's metadata and configuration.
- Specifies the extension as Manifest V3.
- Declares permissions for tabs, storage, and alarms.
- Configures `background.js` as the service worker and `content.js` as a content script for specific URLs (YouTube and Facebook Marketplace).
- Includes `overlay.css` for styling the overlay.

## Usage
1. **Install the Extension**:
   - Load the extension in Chrome by enabling Developer Mode and selecting "Load unpacked" from the Extensions page.
   - Choose the folder containing the `manifest.json` file.

2. **Start Tracking**:
   - Open YouTube Shorts or Facebook Marketplace in a Chrome tab.
   - The extension will automatically start tracking the time spent on these websites.

3. **View Tracked Time**:
   - An overlay will appear on the webpage, showing the total time spent on the current category.

4. **Reset Data**:
   - The extension resets the tracked time at midnight automatically.

## Purpose
This extension is designed for users who want to monitor and manage their time spent on specific websites. It is particularly useful for individuals aiming to reduce time spent on distracting platforms or to better understand their browsing habits.

## Contribution
Feel free to contribute to this project by submitting issues or pull requests. For any questions, contact the repository owner.
