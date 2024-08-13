const targetDate = new Date('YYYY-MM-DD'); 

let stopScript = false;
let cancelScript = false;

const parseDate = (dateString) => {
    dateString = dateString.toLowerCase();
    // Check for relative times or specific terms
    if (dateString.includes('hace') || dateString.includes('ayer') || dateString.includes('ago') || dateString.includes('yesterday')) {
        return new Date(NaN); // Return an invalid date
    }

    // Handle specific date formats (dd/MM/yyyy HH:mm)
    const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2})$/;
    const match = dateString.match(regex);
    if (match) {
        const [, day, month, year, hour, minute] = match;
        return new Date(year, month - 1, day, hour, minute);
    }

    // Handle other common formats
    const commonDate = new Date(dateString);
    if (!isNaN(commonDate.getTime())) {
        return commonDate;
    }

    // Return an invalid date if no format matches
    return new Date(NaN);
};

const getActivityDates = () => {
    const activityDates = document.querySelectorAll('[data-bind="text: displayTime"]');
    return Array.from(activityDates)
        .map(dateElement => {
            const dateText = dateElement.textContent.trim();
            const dateObj = parseDate(dateText);
            if (isNaN(dateObj.getTime())) {
                return null;
            }
            return dateObj;
        })
        .filter(date => date !== null);
};

const clickShowMore = () => {
    const showMoreLink = document.getElementById('idShowMoreLink');
    if (showMoreLink) {
        showMoreLink.click();
        return true;
    } else {
        return false;
    }
};

const countIPs = () => {
    const ipElements = document.querySelectorAll('span[data-bind="text: ip"]');
    return ipElements.length;
};

const apiKey = 'API-KEY'; 
const milestones = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const milestonesLogged = new Set();

const logPercentage = (milestone, totalIps, successfulIps) => {
    const percentage = (successfulIps / totalIps) * 100;
    if (percentage >= milestone && !milestonesLogged.has(milestone)) {
        console.log(`Reached ${milestone}%: ${successfulIps} IPs localized`);
        milestonesLogged.add(milestone);
    }
};

const fetchIPGeolocation = async (ipText, coordinates) => {
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipText}`);
        if (response.ok) {
            const data = await response.json();
            const { latitude, longitude } = data;
            coordinates.push(`${latitude},${longitude}`);
            return true;
        } else {
            console.error('Error fetching location:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error fetching location:', error);
        return false;
    }
};

const scrollUntilDate = async () => {
    let continueScraping = true;
    let totalIps = 0;
    let successfulIps = 0;
    const coordinates = [];
    
    while (continueScraping && !stopScript && !cancelScript) {
        if (clickShowMore()) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for new activities to load
        } else {
            console.log('No more "Show More" button found.');
            break;
        }
        
        const activityDates = getActivityDates();
        if (activityDates.length === 0) {
            console.log('No valid activity dates found.');
            break;
        }
        
        const oldestDate = activityDates.reduce((oldest, date) => date < oldest ? date : oldest, new Date());

        if (oldestDate <= targetDate) {
            totalIps = countIPs(); // Update total IP count
            console.log(`Found ${totalIps} IPs.`);
            
            alert(`Total number of IPs collected: ${totalIps}`);
            continueScraping = confirm('Reached the target date. Do you want to continue collecting more IPs?');
            if (!continueScraping) {
                console.log('Stopping the collection.');
                break;
            }
        }
    }
    
    if (cancelScript) {
        console.log('Script execution has been canceled.');
        return;
    }

    if(stopScript) {
        totalIps = countIPs(); // Update total IP count
        console.log(`Found ${totalIps} IPs.`);
        alert(`Total number of IPs collected: ${totalIps}`);
        getLocations = confirm('Do you want to get the locations of the collected IPs?');
        if (!getLocations) {
            console.log('Script execution has been stopped.');
            return;
        }
    }


    // Process IP addresses after reaching target date or stopping
    const divs = document.querySelectorAll('div.NoOverflow');
    totalIps = divs.length;
    
    for (const div of divs) {
        const span = div.querySelector('span[data-bind="text: ip"]');
        if (span) {
            const ipText = span.textContent.trim();
            const success = await fetchIPGeolocation(ipText, coordinates);
            if (success) {
                successfulIps++;
                milestones.forEach(milestone => logPercentage(milestone, totalIps, successfulIps));
            }
        }
    }

    const finalPercentage = totalIps > 0 ? (successfulIps / totalIps) * 100 : 0;
    console.log(`Final percentage of IPs localized: ${finalPercentage.toFixed(2)}%`);

    if (coordinates.length > 0) {
        const route = coordinates.join('/');
        const googleMapsUrl = `https://www.google.com/maps/dir/${route}/@${coordinates[0]},12z?entry=ttu`;
        // Try to open the Google Maps URL in a new tab
        window.open(googleMapsUrl, '_blank');
    }
};

// Add a way to stop the script
const stopExecution = () => {
    stopScript = true;
    console.log('Script execution has been stopped.');
};

const cancelExecution = () => {
    cancelScript = true;
    console.log('Script execution has been canceled.');
}

// Attach stopExecution to a key combination or button click in your testing environment
console.log('To stop the script, call `stopExecution()` in the console.');
console.log('To cancel the script, call `cancelExecution()` in the console.');
scrollUntilDate();
