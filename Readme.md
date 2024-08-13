# IP Geolocation Activity Scraper

## Overview

The IP Geolocation Activity Scraper is a JavaScript-based tool designed to extract IP addresses from the activity log on [Microsoft's activity page](https://account.live.com/activity). This script utilizes the IPGeolocation API to obtain geographic coordinates for these IP addresses and generates a route on Google Maps based on the collected coordinates. 

## Features

- **Activity Log Scraping**: Automatically clicks the "Show More" button to load additional activity logs until the specified target date is reached.
- **Geolocation Fetching**: Retrieves geographic coordinates for each IP address using the IPGeolocation API.
- **Progress Monitoring**: Logs the percentage of IPs successfully localized and displays alerts with the number of IPs collected.
- **Route Generation**: Creates a Google Maps route with the collected geographic coordinates.
- **Script Control**: Provides methods to stop or cancel script execution.

## Setup and Usage

1. **Navigate to https://account.live.com/activity in your browser.**

2. **Open the browser console:**
   - **Chrome**: Right-click on the page -> Inspect -> Console tab.
   - **Firefox**: Right-click on the page -> Inspect Element -> Console tab.
   - **Edge**: Right-click on the page -> Inspect -> Console tab.
   - **Safari**: Right-click on the page -> Inspect Element -> Console tab.

3. **Paste the JavaScript code into the console and press Enter.** Make sure to replace the placeholder `API-KEY` with your actual API key from IPGeolocation, and set the `targetDate` to the desired date in `YYYY-MM-DD` format.

4. **The script will start running, clicking the "Show More" button to load additional activities until it reaches the target date.** 

5. **Upon reaching the target date or stopping manually, the script will process the collected IP addresses, fetch their geographic locations, and display a Google Maps route based on the coordinates.**

## Stopping or Canceling the Script

- **To stop the script**: Call `stopExecution()` in the console. This will halt the script's execution and log a message indicating that the script has been stopped.
- **To cancel the script**: Call `cancelExecution()` in the console. This will stop further processing of IP addresses and cancel the script's execution.

## Configuration

- **API Key**: You need an API key from [IPGeolocation](https://ipgeolocation.io/) to fetch the geographic coordinates. Replace `'API-KEY'` in the script with your key.
- **Target Date**: Set `targetDate` in the script to the date you want to reach for scraping.

## Important Notes

- Ensure you comply with Microsoft's terms of service and legal requirements when using this script.
- The script is intended for educational and personal use. Use it responsibly and respect privacy considerations.
- If you encounter issues or need modifications, you might need to adapt the script according to changes in the webpage structure or API limits.
- If the Google Maps URL opens in a blocked window or tab, adjust your browser settings or manually copy the URL to view it.

## Contributing

Contributions to the project are welcome. If you have suggestions or improvements, please fork the repository and submit a pull request.
