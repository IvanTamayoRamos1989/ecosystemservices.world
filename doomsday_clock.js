// Doomsday Clock Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the doomsday clock data
let doomsdayClockData = {
    currentTime: "100 seconds", // Current setting of the Doomsday Clock
    minutesToMidnight: 1.67, // Minutes to midnight (100 seconds = 1.67 minutes)
    previousSettings: [
        { year: 2023, time: "90 seconds", minutesToMidnight: 1.5 },
        { year: 2020, time: "100 seconds", minutesToMidnight: 1.67 },
        { year: 2018, time: "2 minutes", minutesToMidnight: 2 },
        { year: 2017, time: "2.5 minutes", minutesToMidnight: 2.5 },
        { year: 2015, time: "3 minutes", minutesToMidnight: 3 },
        { year: 2012, time: "5 minutes", minutesToMidnight: 5 },
        { year: 2010, time: "6 minutes", minutesToMidnight: 6 },
        { year: 2007, time: "5 minutes", minutesToMidnight: 5 },
        { year: 2002, time: "7 minutes", minutesToMidnight: 7 },
        { year: 1998, time: "9 minutes", minutesToMidnight: 9 },
        { year: 1995, time: "14 minutes", minutesToMidnight: 14 },
        { year: 1991, time: "17 minutes", minutesToMidnight: 17 },
        { year: 1990, time: "10 minutes", minutesToMidnight: 10 },
        { year: 1988, time: "6 minutes", minutesToMidnight: 6 },
        { year: 1984, time: "3 minutes", minutesToMidnight: 3 },
        { year: 1981, time: "4 minutes", minutesToMidnight: 4 },
        { year: 1980, time: "7 minutes", minutesToMidnight: 7 },
        { year: 1974, time: "9 minutes", minutesToMidnight: 9 },
        { year: 1972, time: "12 minutes", minutesToMidnight: 12 },
        { year: 1969, time: "10 minutes", minutesToMidnight: 10 },
        { year: 1968, time: "7 minutes", minutesToMidnight: 7 },
        { year: 1963, time: "12 minutes", minutesToMidnight: 12 },
        { year: 1960, time: "7 minutes", minutesToMidnight: 7 },
        { year: 1953, time: "2 minutes", minutesToMidnight: 2 },
        { year: 1949, time: "3 minutes", minutesToMidnight: 3 },
        { year: 1947, time: "7 minutes", minutesToMidnight: 7 }
    ],
    threatFactors: [
        {
            name: "Nuclear Risk",
            level: 85, // 0-100 scale
            trend: "increasing",
            description: "Modernization of nuclear arsenals and abandonment of arms control treaties"
        },
        {
            name: "Climate Change",
            level: 78,
            trend: "increasing",
            description: "Insufficient action to meet Paris Agreement targets"
        },
        {
            name: "Disruptive Technologies",
            level: 72,
            trend: "increasing",
            description: "AI, biotechnology, and cyber threats developing faster than governance"
        },
        {
            name: "Biological Threats",
            level: 65,
            trend: "stable",
            description: "Pandemic preparedness and bioweapon concerns"
        },
        {
            name: "Information Warfare",
            level: 70,
            trend: "increasing",
            description: "Disinformation undermining democratic institutions and fact-based decision making"
        }
    ],
    historicalEvents: [
        { year: 1947, event: "Clock introduced at 7 minutes to midnight", significance: "Beginning of the Cold War" },
        { year: 1953, event: "Clock set to 2 minutes to midnight", significance: "US and Soviet Union test thermonuclear devices" },
        { year: 1991, event: "Clock set to 17 minutes to midnight", significance: "End of Cold War, US-Soviet Union sign Strategic Arms Reduction Treaty" },
        { year: 2007, event: "Climate change added as existential threat factor", significance: "Expansion beyond nuclear risk" },
        { year: 2020, event: "Clock set to 100 seconds to midnight", significance: "Closest to midnight in history at that time" },
        { year: 2023, event: "Clock set to 90 seconds to midnight", significance: "Closest to midnight in history, reflecting multiple existential threats" }
    ]
};

// Function to initialize the Doomsday Clock widget
function initDoomsdayClock() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('doomsday-clock')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
        <div class="widget medium" id="doomsday-clock">
            <div class="widget-header">
                <h4>DOOMSDAY CLOCK</h4>
                <div class="widget-controls">
                    <button class="expand-btn">+</button>
                    <button class="info-btn">i</button>
                </div>
            </div>
            <div class="widget-content">
                <div class="doomsday-container">
                    <div class="clock-header">
                        <div class="clock-title">MINUTES TO MIDNIGHT</div>
                        <div class="clock-subtitle">Bulletin of the Atomic Scientists</div>
                    </div>
                    
                    <div class="clock-display">
                        <div class="clock-face">
                            <div class="clock-center"></div>
                            <div class="clock-hand"></div>
                            <div class="clock-midnight"></div>
                            <div class="clock-time-display">${doomsdayClockData.currentTime}</div>
                        </div>
                        <div class="clock-info">
                            <div class="info-item">
                                <div class="info-label">CURRENT SETTING</div>
                                <div class="info-value">${doomsdayClockData.currentTime}</div>
                                <div class="info-description">to midnight</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">HISTORICAL RANGE</div>
                                <div class="info-value">17 min - 90 sec</div>
                                <div class="info-description">1947 - Present</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">CURRENT TREND</div>
                                <div class="info-value trend-negative">INCREASING RISK</div>
                                <div class="info-description">Multiple threat vectors</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="threat-factors">
                        <div class="factors-header">EXISTENTIAL THREAT FACTORS</div>
                        <div class="factors-container">
                            ${generateThreatFactorsHTML()}
                        </div>
                    </div>
                    
                    <div class="clock-timeline">
                        <div class="timeline-header">HISTORICAL PROGRESSION</div>
                        <div class="timeline-container">
                            <div class="timeline-line"></div>
                            <div class="timeline-markers">
                                ${generateTimelineMarkersHTML()}
                            </div>
                        </div>
                    </div>
                    
                    <div class="key-events">
                        <div class="events-header">KEY HISTORICAL EVENTS</div>
                        <div class="events-container">
                            ${generateKeyEventsHTML()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Add doomsday clock-specific styles
        addDoomsdayClockStyles();
        
        // Initialize the clock hand position
        setClockHandPosition();
        
        // Add animation to make the clock pulse
        animateClockPulse();
    }
}

// Function to generate HTML for threat factors
function generateThreatFactorsHTML() {
    let factorsHTML = '';
    
    doomsdayClockData.threatFactors.forEach(factor => {
        // Determine trend icon and class
        let trendIcon, trendClass;
        if (factor.trend === 'increasing') {
            trendIcon = '↑';
            trendClass = 'trend-negative';
        } else if (factor.trend === 'decreasing') {
            trendIcon = '↓';
            trendClass = 'trend-positive';
        } else {
            trendIcon = '→';
            trendClass = 'trend-stable';
        }
        
        factorsHTML += `
        <div class="threat-factor">
            <div class="factor-header">
                <div class="factor-name">${factor.name}</div>
                <div class="factor-trend ${trendClass}">${trendIcon}</div>
            </div>
            <div class="factor-level-bar">
                <div class="level-fill" style="width: ${factor.level}%"></div>
            </div>
            <div class="factor-description">${factor.description}</div>
        </div>
        `;
    });
    
    return factorsHTML;
}

// Function to generate HTML for timeline markers
function generateTimelineMarkersHTML() {
    // Select a subset of significant years for the timeline
    const significantYears = [1947, 1953, 1984, 1991, 2007, 2020, 2023];
    
    let markersHTML = '';
    
    significantYears.forEach(year => {
        // Find the setting for this year
        const yearData = doomsdayClockData.previousSettings.find(setting => setting.year === year);
        
        if (yearData) {
            // Calculate position on timeline (0-100%)
            const position = ((year - 1947) / (2023 - 1947)) * 100;
            
            markersHTML += `
            <div class="timeline-marker" style="left: ${position}%">
                <div class="marker-dot"></div>
                <div class="marker-label">${year}</div>
                <div class="marker-time">${yearData.time}</div>
                <div class="marker-tooltip">
                    <div class="tooltip-year">${year}</div>
                    <div class="tooltip-time">${yearData.time} to midnight</div>
                    ${getEventForYear(year)}
                </div>
            </div>
            `;
        }
    });
    
    return markersHTML;
}

// Function to get event description for a specific year
function getEventForYear(year) {
    const event = doomsdayClockData.historicalEvents.find(e => e.year === year);
    
    if (event) {
        return `
        <div class="tooltip-event">${event.event}</div>
        <div class="tooltip-significance">${event.significance}</div>
        `;
    }
    
    return '';
}

// Function to generate HTML for key historical events
function generateKeyEventsHTML() {
    let eventsHTML = '';
    
    doomsdayClockData.historicalEvents.forEach(event => {
        eventsHTML += `
        <div class="key-event">
            <div class="event-year">${event.year}</div>
            <div class="event-details">
                <div class="event-description">${event.event}</div>
                <div class="event-significance">${event.significance}</div>
            </div>
        </div>
        `;
    });
    
    return eventsHTML;
}

// Function to set the clock hand position based on current minutes to midnight
function setClockHandPosition() {
    const clockHand = document.querySelector('.clock-hand');
    if (clockHand) {
        // Convert minutes to midnight to degrees
        // 0 minutes = 0 degrees (midnight)
        // 17 minutes (max historical) = -90 degrees (9 o'clock position)
        const maxMinutes = 17; // Maximum historical minutes to midnight
        const degrees = -(doomsdayClockData.minutesToMidnight / maxMinutes) * 90;
        
        clockHand.style.transform = `rotate(${degrees}deg)`;
    }
}

// Function to animate the clock pulse
function animateClockPulse() {
    const clockFace = document.querySelector('.clock-face');
    if (clockFace) {
        // Add pulse animation class
        clockFace.classList.add('pulse-animation');
    }
}

// Function to add doomsday clock-specific styles
function addDoomsdayClockStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Doomsday Clock Styles */
    .doomsday-container {
        padding: 20px;
        color: var(--text-color);
        font-family: var(--body-font);
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .clock-header {
        text-align: center;
        margin-bottom: 10px;
    }
    
    .clock-title {
        font-size: 1.4rem;
        color: #ff3366;
        margin: 0 0 5px 0;
        font-family: var(--header-font);
        letter-spacing: 2px;
        text-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
    }
    
    .clock-subtitle {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
    }
    
    .clock-display {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 20px 0;
    }
    
    .clock-face {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: #111;
        border: 2px solid rgba(255, 51, 102, 0.5);
        position: relative;
        box-shadow: 0 0 20px rgba(255, 51, 102, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.8);
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 20px rgba(255, 51, 102, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.8);
        }
        50% {
            box-shadow: 0 0 30px rgba(255, 51, 102, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.8);
        }
        100% {
            box-shadow: 0 0 20px rgba(255, 51, 102, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.8);
        }
    }
    
    .clock-center {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #ff3366;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    
    .clock-hand {
        position: absolute;
        width: 4px;
        height: 70px;
        background-color: #ff3366;
        top: 50%;
        left: 50%;
        transform-origin: bottom center;
        transform: translateX(-50%) rotate(0deg);
        z-index: 1;
        box-shadow: 0 0 10px #ff3366;
    }
    
    .clock-midnight {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #ff3366;
        border-radius: 50%;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 10px #ff3366;
    }
    
    .clock-time-display {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 1.2rem;
        color: #ff3366;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
    }
    
    .clock-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
        flex: 1;
    }
    
    .info-item {
        background-color: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 10px;
        border-left: 2px solid #ff3366;
    }
    
    .info-label {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.6);
        margin-bottom: 5px;
    }
    
    .info-value {
        font-size: 1.1rem;
        font-weight: bold;
        color: #ff3366;
        margin-bottom: 5px;
    }
    
    .info-description {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.8);
    }
    
    .trend-negative {
        color: #ff3366;
    }
    
    .trend-positive {
        color: var(--primary-color);
    }
    
    .trend-stable {
        color: #ffcc00;
    }
    
    .threat-factors {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .factors-header {
        font-size: 1rem;
        color: #ff3366;
        margin-bottom: 15px;
        font-family: var(--header-font);
        text-align: center;
    }
    
    .factors-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
    }
    
    .threat-factor {
        background-color: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 12px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .factor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .factor-name {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--text-color);
    }
    
    .factor-trend {
        font-size: 0.9rem;
        font-weight: bold;
    }
    
    .factor-level-bar {
        height: 6px;
        background-color: rgba(255,255,255,0.1);
        border-radius: 3px;
        margin-bottom: 10px;
        overflow: hidden;
    }
    
    .level-fill {
        height: 100%;
        background: linear-gradient(90deg, #ffcc00 0%, #ff3366 100%);
        border-radius: 3px;
    }
    
    .factor-description {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
    }
    
    .clock-timeline {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .timeline-header {
        font-size: 1rem;
        color: #ff3366;
        margin-bottom: 15px;
        font-family: var(--header-font);
        text-align: center;
    }
    
    .timeline-container {
        position: relative;
        height: 100px;
        padding: 20px 0;
    }
    
    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
        transform: translateY(-50%);
    }
    
    .timeline-markers {
        position: relative;
        height: 100%;
    }
    
    .timeline-marker {
        position: absolute;
        transform: translateX(-50%);
    }
    
    .marker-dot {
        width: 8px;
        height: 8px;
        background-color: #ff3366;
        border-radius: 50%;
        margin: 0 auto;
    }
    
    .marker-label {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.7);
        text-align: center;
        margin-top: 5px;
    }
    
    .marker-time {
        font-size: 0.7rem;
        color: #ff3366;
        text-align: center;
    }
    
    .marker-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        background-color: rgba(0,0,0,0.8);
        border: 1px solid #ff3366;
        border-radius: 4px;
        padding: 8px;
        display: none;
        z-index: 10;
    }
    
    .timeline-marker:hover .marker-tooltip {
        display: block;
    }
    
    .tooltip-year {
        font-size: 0.8rem;
        font-weight: bold;
        color: #ff3366;
        margin-bottom: 5px;
    }
    
    .tooltip-time {
        font-size: 0.8rem;
        color: var(--text-color);
        margin-bottom: 8px;
    }
    
    .tooltip-event {
        font-size: 0.75rem;
        color: var(--text-color);
        margin-bottom: 5px;
    }
    
    .tooltip-significance {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.7);
        font-style: italic;
    }
    
    .key-events {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .events-header {
        font-size: 1rem;
        color: #ff3366;
        margin-bottom: 15px;
        font-family: var(--header-font);
        text-align: center;
    }
    
    .events-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 200px;
        overflow-y: auto;
    }
    
    .key-event {
        display: flex;
        gap: 15px;
        padding: 10px;
        background-color: rgba(0,0,0,0.3);
        border-radius: 8px;
        border-left: 2px solid #ff3366;
    }
    
    .event-year {
        font-size: 0.9rem;
        font-weight: bold;
        color: #ff3366;
        min-width: 40px;
    }
    
    .event-details {
        flex: 1;
    }
    
    .event-description {
        font-size: 0.85rem;
        color: var(--text-color);
        margin-bottom: 5px;
    }
    
    .event-significance {
        font-size: 0.75rem;
        color: rgba(255,255,255,0.7);
        font-style: italic;
    }
    
    @media (max-width: 768px) {
        .clock-display {
            flex-direction: column;
            gap: 20px;
        }
        
        .factors-container {
            grid-template-columns: 1fr;
        }
    }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the Doomsday Clock widget when the dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if dashboard is already loaded
    if (document.querySelector('.dashboard-grid')) {
        initDoomsdayClock();
    } else {
        // Wait for dashboard to be initialized
        document.addEventListener('dashboard:initialized', initDoomsdayClock);
    }
});

// Also listen for dashboard refresh events to reinitialize if needed
document.addEventListener('dashboard:refresh', () => {
    // Reinitialize only if the widget doesn't exist
    if (!document.getElementById('doomsday-clock')) {
        initDoomsdayClock();
    }
});
