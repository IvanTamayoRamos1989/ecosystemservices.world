// Species Extinction Countdown Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the species extinction data
let extinctionData = {
    totalSpecies: 8700000,
    endangeredCount: 41415,
    criticallyEndangered: 8404,
    extinctionRate: 1000, // species per year
    extinctionCountdown: {
        mammals: { total: 6400, endangered: 1201, timeframe: 28 },
        birds: { total: 11000, endangered: 1469, timeframe: 35 },
        reptiles: { total: 11050, endangered: 1216, timeframe: 40 },
        amphibians: { total: 8400, endangered: 2100, timeframe: 22 },
        fish: { total: 34000, endangered: 2390, timeframe: 32 },
        insects: { total: 5500000, endangered: 1800, timeframe: 45 },
        plants: { total: 390000, endangered: 31250, timeframe: 38 }
    },
    recentExtinctions: [
        { name: "Spix's Macaw", year: 2018, cause: "habitat loss" },
        { name: "Northern White Rhinoceros", year: 2018, cause: "poaching" },
        { name: "Pinta Giant Tortoise", year: 2012, cause: "hunting" },
        { name: "Western Black Rhinoceros", year: 2011, cause: "poaching" },
        { name: "Pyrenean Ibex", year: 2000, cause: "hunting" }
    ],
    successStories: [
        { name: "Giant Panda", status: "Vulnerable (from Endangered)", population: 1864 },
        { name: "Arabian Oryx", status: "Vulnerable (from Extinct in Wild)", population: 1220 },
        { name: "Southern White Rhinoceros", status: "Near Threatened", population: 20000 },
        { name: "Gray Whale", status: "Least Concern (from Endangered)", population: 27000 }
    ],
    primaryThreats: {
        "Habitat Loss": 37,
        "Overexploitation": 23,
        "Climate Change": 19,
        "Pollution": 12,
        "Invasive Species": 9
    }
};

// Function to initialize the Species Extinction Countdown widget
function initSpeciesExtinctionCountdown() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('species-extinction-countdown')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget medium" id="species-extinction-countdown">
                <div class="widget-header">
                    <h4>SPECIES EXTINCTION COUNTDOWN</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="extinction-countdown">
                        <div class="extinction-main">
                            <div class="extinction-counter">
                                <div class="counter-label">ENDANGERED SPECIES</div>
                                <div class="counter-value" id="endangered-counter">${extinctionData.endangeredCount.toLocaleString()}</div>
                                <div class="counter-sublabel">OF ${extinctionData.totalSpecies.toLocaleString()} KNOWN SPECIES</div>
                            </div>
                            <div class="extinction-rate">
                                <div class="rate-label">EXTINCTION RATE</div>
                                <div class="rate-value" id="extinction-rate">${extinctionData.extinctionRate}</div>
                                <div class="rate-sublabel">SPECIES PER YEAR</div>
                                <div class="rate-comparison">1000× NATURAL RATE</div>
                            </div>
                        </div>
                        
                        <div class="extinction-categories">
                            <div class="categories-header">EXTINCTION RISK BY CATEGORY</div>
                            <div class="categories-grid">
                                ${generateCategoryCountdowns()}
                            </div>
                        </div>
                        
                        <div class="extinction-threats">
                            <div class="threats-header">PRIMARY EXTINCTION THREATS</div>
                            <div class="threats-chart">
                                ${generateThreatsChart()}
                            </div>
                        </div>
                        
                        <div class="extinction-stories">
                            <div class="stories-tabs">
                                <button class="tab-btn active" data-tab="recent">RECENT LOSSES</button>
                                <button class="tab-btn" data-tab="success">SUCCESS STORIES</button>
                            </div>
                            <div class="stories-content">
                                <div class="tab-content active" id="recent-tab">
                                    <div class="recent-losses">
                                        ${generateRecentLosses()}
                                    </div>
                                </div>
                                <div class="tab-content" id="success-tab">
                                    <div class="success-stories">
                                        ${generateSuccessStories()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Initialize the tabs
        initTabs();
        
        // Start the data simulation
        startExtinctionSimulation();
    }
}

// Function to generate category countdowns HTML
function generateCategoryCountdowns() {
    let categoriesHTML = '';
    
    Object.entries(extinctionData.extinctionCountdown).forEach(([category, data]) => {
        const percentage = (data.endangered / data.total * 100).toFixed(1);
        const categoryLabel = formatCategoryLabel(category);
        
        categoriesHTML += `
            <div class="category-item">
                <div class="category-header">
                    <div class="category-name">${categoryLabel}</div>
                    <div class="category-timeframe">${data.timeframe} YRS</div>
                </div>
                <div class="category-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="progress-stats">
                        <div class="stats-endangered">${data.endangered.toLocaleString()}</div>
                        <div class="stats-total">of ${data.total.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return categoriesHTML;
}

// Function to generate threats chart HTML
function generateThreatsChart() {
    let threatsHTML = '';
    
    Object.entries(extinctionData.primaryThreats).forEach(([threat, percentage]) => {
        threatsHTML += `
            <div class="threat-bar">
                <div class="threat-label">${threat}</div>
                <div class="threat-bar-container">
                    <div class="threat-bar-fill" style="width: ${percentage}%">
                        <span class="threat-percentage">${percentage}%</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    return threatsHTML;
}

// Function to generate recent losses HTML
function generateRecentLosses() {
    let lossesHTML = '';
    
    extinctionData.recentExtinctions.forEach(extinction => {
        lossesHTML += `
            <div class="loss-item">
                <div class="loss-name">${extinction.name}</div>
                <div class="loss-details">
                    <div class="loss-year">${extinction.year}</div>
                    <div class="loss-cause">${formatCause(extinction.cause)}</div>
                </div>
            </div>
        `;
    });
    
    return lossesHTML;
}

// Function to generate success stories HTML
function generateSuccessStories() {
    let storiesHTML = '';
    
    extinctionData.successStories.forEach(story => {
        storiesHTML += `
            <div class="success-item">
                <div class="success-name">${story.name}</div>
                <div class="success-details">
                    <div class="success-status">${story.status}</div>
                    <div class="success-population">Pop: ${story.population.toLocaleString()}</div>
                </div>
            </div>
        `;
    });
    
    return storiesHTML;
}

// Function to initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Auto-switch tabs every 15 seconds
    let activeTabIndex = 0;
    setInterval(() => {
        activeTabIndex = (activeTabIndex + 1) % tabButtons.length;
        tabButtons[activeTabIndex].click();
    }, 15000);
}

// Function to start the extinction data simulation
function startExtinctionSimulation() {
    // Update the endangered counter in real-time
    let lastUpdate = Date.now();
    let counter = extinctionData.endangeredCount;
    
    function updateCounter() {
        const now = Date.now();
        const elapsed = (now - lastUpdate) / 1000; // seconds
        lastUpdate = now;
        
        // Calculate how many species became endangered in this time period
        // Based on the extinction rate and a factor for new endangered species
        const newEndangered = (extinctionData.extinctionRate * 5 * elapsed) / (365 * 24 * 60 * 60);
        counter += newEndangered;
        
        // Update the counter display
        document.getElementById('endangered-counter').textContent = Math.floor(counter).toLocaleString();
        
        // Continue the animation
        requestAnimationFrame(updateCounter);
    }
    
    // Start the counter animation
    updateCounter();
    
    // Occasionally update other data
    setInterval(() => {
        // Simulate changes in extinction rate
        const rateChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        extinctionData.extinctionRate = Math.max(800, Math.min(1200, extinctionData.extinctionRate + rateChange));
        
        // Update the extinction rate display
        document.getElementById('extinction-rate').textContent = extinctionData.extinctionRate;
        
        // Occasionally update category data
        if (Math.random() > 0.8) {
            Object.keys(extinctionData.extinctionCountdown).forEach(category => {
                // Simulate changes in endangered counts
                const change = Math.floor(Math.random() * 10) - 3; // Random change between -3 and +6
                extinctionData.extinctionCountdown[category].endangered = 
                    Math.max(100, extinctionData.extinctionCountdown[category].endangered + change);
                
                // Occasionally adjust timeframe
                if (Math.random() > 0.9) {
                    const timeframeChange = Math.random() > 0.7 ? -1 : 0;
                    extinctionData.extinctionCountdown[category].timeframe = 
                        Math.max(10, extinctionData.extinctionCountdown[category].timeframe + timeframeChange);
                }
            });
            
            // Update the categories display
            document.querySelector('.categories-grid').innerHTML = generateCategoryCountdowns();
        }
        
        // Occasionally update threat percentages
        if (Math.random() > 0.9) {
            // Adjust threat percentages slightly
            let total = 0;
            Object.keys(extinctionData.primaryThreats).forEach(threat => {
                const change = Math.floor(Math.random() * 3) - 1;
                extinctionData.primaryThreats[threat] = Math.max(1, extinctionData.primaryThreats[threat] + change);
                total += extinctionData.primaryThreats[threat];
            });
            
            // Normalize to ensure total is 100%
            Object.keys(extinctionData.primaryThreats).forEach(threat => {
                extinctionData.primaryThreats[threat] = Math.round((extinctionData.primaryThreats[threat] / total) * 100);
            });
            
            // Update the threats chart
            document.querySelector('.threats-chart').innerHTML = generateThreatsChart();
        }
        
    }, 10000);
}

// Helper function to format category labels
function formatCategoryLabel(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Helper function to format extinction causes
function formatCause(cause) {
    switch(cause) {
        case 'habitat loss':
            return 'Habitat Loss';
        case 'poaching':
            return 'Poaching';
        case 'hunting':
            return 'Hunting';
        default:
            return cause.charAt(0).toUpperCase() + cause.slice(1);
    }
}

// Add CSS for the Species Extinction Countdown widget
function addExtinctionCountdownStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Species Extinction Countdown Styles */
        .extinction-countdown {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .extinction-main {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .extinction-counter {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        
        .counter-label {
            font-size: 0.8rem;
            color: #ff3366;
            margin-bottom: 5px;
        }
        
        .counter-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #ff3366;
            font-family: var(--header-font);
            text-shadow: 0 0 10px #ff3366;
            margin-bottom: 5px;
        }
        
        .counter-sublabel {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
        }
        
        .extinction-rate {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        
        .rate-label {
            font-size: 0.8rem;
            color: #ff3366;
            margin-bottom: 5px;
        }
        
        .rate-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ff3366;
            font-family: var(--header-font);
            text-shadow: 0 0 10px #ff3366;
            margin-bottom: 5px;
        }
        
        .rate-sublabel {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
        }
        
        .rate-comparison {
            font-size: 0.8rem;
            color: #ffcc00;
            margin-top: 5px;
        }
        
        .extinction-categories {
            margin-bottom: 20px;
        }
        
        .categories-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .category-item {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .category-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .category-name {
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .category-timeframe {
            font-size: 0.8rem;
            color: #ff3366;
            font-weight: 600;
        }
        
        .category-progress {
            display: flex;
            flex-direction: column;
        }
        
        .progress-bar {
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 5px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff3366, #ff0000);
            box-shadow: 0 0 5px #ff3366;
            transition: width 1s;
        }
        
        .progress-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
        }
        
        .stats-endangered {
            color: #ff3366;
        }
        
        .stats-total {
            color: rgba(224, 224, 224, 0.6);
        }
        
        .extinction-threats {
            margin-bottom: 20px;
        }
        
        .threats-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .threats-chart {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .threat-bar {
            display: flex;
            align-items: center;
        }
        
        .threat-label {
            width: 120px;
            font-size: 0.8rem;
            white-space: nowrap;
        }
        
        .threat-bar-container {
            flex: 1;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .threat-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff3366, #ff0000);
            box-shadow: 0 0 5px #ff3366;
            position: relative;
            transition: width 1s;
        }
        
        .threat-percentage {
            position: absolute;
            right: 5px;
            top: -7px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .extinction-stories {
            margin-bottom: 10px;
        }
        
        .stories-tabs {
            display: flex;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .tab-btn {
            background: none;
            border: none;
            color: rgba(224, 224, 224, 0.6);
            padding: 8px 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }
        
        .tab-btn:hover {
            color: var(--text-color);
        }
        
        .tab-btn.active {
            color: var(--primary-color);
        }
        
        .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
            box-shadow: 0 0 5px var(--primary-color);
        }
        
        .stories-content {
            position: relative;
            min-height: 150px;
        }
        
        .tab-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s, visibility 0.5s;
        }
        
        .tab-content.active {
            opacity: 1;
            visibility: visible;
        }
        
        .recent-losses, .success-stories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
        }
        
        .loss-item, .success-item {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .loss-name, .success-name {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 5px;
            color: var(--text-color);
        }
        
        .loss-details, .success-details {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
        }
        
        .loss-year {
            color: #ff3366;
        }
        
        .loss-cause {
            color: rgba(224, 224, 224, 0.6);
        }
        
        .success-status {
            color: #00ff9d;
        }
        
        .success-population {
            color: rgba(224, 224, 224, 0.6);
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addExtinctionCountdownStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initSpeciesExtinctionCountdown, 1000);
});
