// Climate Migration Tracker Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the climate migration data
let migrationData = {
    activeMigrations: 14,
    totalDisplaced: 32500000,
    yearlyIncrease: 12.7,
    primaryCauses: {
        drought: 31,
        flooding: 28,
        storms: 22,
        sealevelRise: 12,
        extremeHeat: 7
    },
    hotspots: [
        { id: 1, name: "South Asia", lat: 22, lng: 78, intensity: 0.9, direction: "urban", cause: "flooding" },
        { id: 2, name: "Central America", lat: 15, lng: -90, intensity: 0.7, direction: "north", cause: "drought" },
        { id: 3, name: "Sub-Saharan Africa", lat: 5, lng: 20, intensity: 0.85, direction: "coastal", cause: "drought" },
        { id: 4, name: "Pacific Islands", lat: -8, lng: 160, intensity: 0.6, direction: "mainland", cause: "sealevelRise" },
        { id: 5, name: "Middle East", lat: 30, lng: 40, intensity: 0.75, direction: "europe", cause: "extremeHeat" }
    ],
    projections: {
        "2030": 48000000,
        "2040": 86000000,
        "2050": 143000000
    }
};

// Function to initialize the Climate Migration Tracker widget
function initClimateMigrationTracker() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('climate-migration-tracker')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget medium" id="climate-migration-tracker">
                <div class="widget-header">
                    <h4>CLIMATE MIGRATION TRACKER</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="migration-tracker">
                        <div class="migration-stats">
                            <div class="stat-group">
                                <div class="stat-label">ACTIVE MIGRATIONS</div>
                                <div class="stat-value" id="active-migrations">${migrationData.activeMigrations}</div>
                            </div>
                            <div class="stat-group">
                                <div class="stat-label">CLIMATE DISPLACED</div>
                                <div class="stat-value" id="total-displaced">${formatNumber(migrationData.totalDisplaced)}</div>
                                <div class="stat-trend up">+${migrationData.yearlyIncrease}% YOY</div>
                            </div>
                        </div>
                        
                        <div class="migration-map">
                            <div class="map-container" id="migration-map-container">
                                <!-- Map visualization will be rendered here -->
                                ${generateMigrationPaths()}
                            </div>
                            <div class="map-overlay">
                                <div class="map-legend">
                                    <div class="legend-item">
                                        <div class="legend-color drought"></div>
                                        <div class="legend-label">Drought</div>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color flooding"></div>
                                        <div class="legend-label">Flooding</div>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color storms"></div>
                                        <div class="legend-label">Storms</div>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color sealevelRise"></div>
                                        <div class="legend-label">Sea Level Rise</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="migration-causes">
                            <div class="causes-header">PRIMARY DISPLACEMENT CAUSES</div>
                            <div class="causes-chart">
                                ${generateCausesChart()}
                            </div>
                        </div>
                        
                        <div class="migration-projections">
                            <div class="projections-header">PROJECTED DISPLACEMENT</div>
                            <div class="projections-timeline">
                                <div class="timeline-point">
                                    <div class="year">NOW</div>
                                    <div class="value">${formatNumber(migrationData.totalDisplaced)}</div>
                                </div>
                                <div class="timeline-point">
                                    <div class="year">2030</div>
                                    <div class="value">${formatNumber(migrationData.projections["2030"])}</div>
                                </div>
                                <div class="timeline-point">
                                    <div class="year">2050</div>
                                    <div class="value">${formatNumber(migrationData.projections["2050"])}</div>
                                </div>
                                <div class="timeline-line">
                                    <div class="timeline-progress"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Start the data simulation
        startMigrationSimulation();
    }
}

// Function to generate the migration paths HTML
function generateMigrationPaths() {
    let pathsHTML = '';
    
    migrationData.hotspots.forEach(hotspot => {
        // Calculate position based on lat/lng (simplified for this example)
        const x = ((hotspot.lng + 180) / 360) * 100;
        const y = ((90 - hotspot.lat) / 180) * 100;
        
        // Determine the path direction (simplified)
        let pathClass = '';
        let pathX = 0;
        let pathY = 0;
        
        switch(hotspot.direction) {
            case 'north':
                pathClass = 'north';
                pathY = -15;
                break;
            case 'urban':
                pathClass = 'urban';
                pathX = 10;
                pathY = -5;
                break;
            case 'coastal':
                pathClass = 'coastal';
                pathX = 15;
                break;
            case 'mainland':
                pathClass = 'mainland';
                pathX = -15;
                break;
            case 'europe':
                pathClass = 'europe';
                pathX = -10;
                pathY = -10;
                break;
        }
        
        // Create the hotspot and path
        pathsHTML += `
            <div class="migration-hotspot ${hotspot.cause}" style="left: ${x}%; top: ${y}%;" data-id="${hotspot.id}">
                <div class="hotspot-pulse"></div>
                <div class="hotspot-label">${hotspot.name}</div>
                <div class="migration-path ${pathClass}" style="--intensity: ${hotspot.intensity}; --path-x: ${pathX}px; --path-y: ${pathY}px;"></div>
            </div>
        `;
    });
    
    return pathsHTML;
}

// Function to generate the causes chart HTML
function generateCausesChart() {
    let chartHTML = '';
    
    Object.entries(migrationData.primaryCauses).forEach(([cause, percentage]) => {
        chartHTML += `
            <div class="cause-bar">
                <div class="cause-label">${formatCauseLabel(cause)}</div>
                <div class="cause-bar-container">
                    <div class="cause-bar-fill ${cause}" style="width: ${percentage}%;">
                        <span class="cause-percentage">${percentage}%</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    return chartHTML;
}

// Function to start the migration data simulation
function startMigrationSimulation() {
    // Update the migration data every 8 seconds
    setInterval(() => {
        // Simulate changes in active migrations
        const migrationChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        migrationData.activeMigrations = Math.max(5, migrationData.activeMigrations + migrationChange);
        
        // Simulate changes in displaced population
        const displacedChange = Math.floor(Math.random() * 100000) - 20000;
        migrationData.totalDisplaced = Math.max(20000000, migrationData.totalDisplaced + displacedChange);
        
        // Occasionally update yearly increase
        if (Math.random() > 0.8) {
            const yearlyChange = (Math.random() * 0.6) - 0.2;
            migrationData.yearlyIncrease = parseFloat((migrationData.yearlyIncrease + yearlyChange).toFixed(1));
            if (migrationData.yearlyIncrease < 0) migrationData.yearlyIncrease = 0.1;
            if (migrationData.yearlyIncrease > 20) migrationData.yearlyIncrease = 20;
        }
        
        // Update the UI
        updateMigrationUI();
        
    }, 8000);
    
    // Animate hotspots continuously
    animateHotspots();
}

// Function to animate the migration hotspots
function animateHotspots() {
    const hotspots = document.querySelectorAll('.migration-hotspot');
    
    hotspots.forEach(hotspot => {
        // Randomly change the intensity of the pulse
        setInterval(() => {
            const id = parseInt(hotspot.dataset.id);
            const hotspotData = migrationData.hotspots.find(h => h.id === id);
            
            if (hotspotData) {
                // Slightly adjust intensity
                const intensityChange = (Math.random() * 0.2) - 0.1;
                hotspotData.intensity = Math.max(0.3, Math.min(1, hotspotData.intensity + intensityChange));
                
                // Apply the new intensity
                const path = hotspot.querySelector('.migration-path');
                if (path) {
                    path.style.setProperty('--intensity', hotspotData.intensity);
                }
            }
        }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
    });
}

// Function to update the migration UI
function updateMigrationUI() {
    // Update active migrations
    document.getElementById('active-migrations').textContent = migrationData.activeMigrations;
    
    // Update total displaced
    document.getElementById('total-displaced').textContent = formatNumber(migrationData.totalDisplaced);
    
    // Update yearly trend
    const trendElement = document.querySelector('.stat-trend');
    trendElement.textContent = `+${migrationData.yearlyIncrease}% YOY`;
    
    // Occasionally update the causes (not on every update to reduce visual noise)
    if (Math.random() > 0.7) {
        // Slightly adjust cause percentages
        let total = 0;
        Object.keys(migrationData.primaryCauses).forEach(cause => {
            const change = Math.floor(Math.random() * 3) - 1;
            migrationData.primaryCauses[cause] = Math.max(1, migrationData.primaryCauses[cause] + change);
            total += migrationData.primaryCauses[cause];
        });
        
        // Normalize to ensure total is 100%
        Object.keys(migrationData.primaryCauses).forEach(cause => {
            migrationData.primaryCauses[cause] = Math.round((migrationData.primaryCauses[cause] / total) * 100);
        });
        
        // Update the causes chart
        document.querySelector('.causes-chart').innerHTML = generateCausesChart();
    }
}

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

// Helper function to format cause labels
function formatCauseLabel(cause) {
    switch(cause) {
        case 'drought':
            return 'Drought';
        case 'flooding':
            return 'Flooding';
        case 'storms':
            return 'Storms';
        case 'sealevelRise':
            return 'Sea Level Rise';
        case 'extremeHeat':
            return 'Extreme Heat';
        default:
            return cause.charAt(0).toUpperCase() + cause.slice(1);
    }
}

// Add CSS for the Climate Migration Tracker widget
function addClimateMigrationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Climate Migration Tracker Styles */
        .migration-tracker {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .migration-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        
        .stat-group {
            display: flex;
            flex-direction: column;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: rgba(224, 224, 224, 0.6);
            margin-bottom: 5px;
        }
        
        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .stat-trend {
            font-size: 0.9rem;
            margin-top: 3px;
        }
        
        .stat-trend.up {
            color: #ff5555;
        }
        
        .stat-trend.down {
            color: #00ff9d;
        }
        
        .migration-map {
            flex: 1;
            position: relative;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .map-container {
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMwLDUwIEwxNTAsNTAgTDE3MCw2MCBMMTM1LDg1IEwxNDAsOTUgTDE0MCwxMTAgTDE1MCwxMjAgTDE0MCwxMzAgTDEzMCwxMzAgTDEyMCwxNDAgTDEzMCwxNTAgTDE0MCwxNTAgTDE1MCwxNjAgTDE0MCwxNzAgTDEzMCwxODAgTDEyMCwxOTAgTDExMCwyMDAgTDEwMCwyMTAgTDkwLDIyMCBMODAsMjMwIEw3MCwyNDAgTDYwLDI1MCBMNTAsMjYwIEw0MCwyNzAgTDMwLDI4MCBMMjAsMjkwIEwxMCwzMDAgTDIwLDMxMCBMMzAsMzIwIEw0MCwzMzAgTDUwLDM0MCBMNjAsMzUwIEw3MCwzNjAgTDgwLDM3MCBMOTAsMzgwIEwxMDAsMzkwIEwxMTAsNDAwIEwxMjAsNDEwIEwxMzAsNDIwIEwxNDAsNDMwIEwxNTAsNDQwIEwxNjAsNDUwIEwxNzAsNDYwIEwxODAsNDcwIEwxOTAsNDgwIEwyMDAsNDkwIEwyMTAsNTAwIEwyMjAsNTEwIEwyMzAsNTIwIEwyNDAsNTMwIEwyNTAsNTQwIEwyNjAsNTUwIEwyNzAsNTYwIEwyODAsNTcwIEwyOTAsNTgwIEwzMDAsNTkwIEwzMTAsNjAwIEwzMjAsNjEwIEwzMzAsNjIwIEwzNDAsNjMwIEwzNTAsNjQwIEwzNjAsNjUwIEwzNzAsNjYwIEwzODAsNjcwIEwzOTAsNjgwIEw0MDAsNjkwIEw0MTAsNzAwIEw0MjAsNzEwIEw0MzAsNzIwIEw0NDAsNzMwIEw0NTAsNzQwIEw0NjAsNzUwIEw0NzAsNzYwIEw0ODAsNzcwIEw0OTAsNzgwIEw1MDAsNzkwIEw1MTAsODAwIEw1MjAsODEwIEw1MzAsODIwIEw1NDAsODMwIEw1NTAsODQwIEw1NjAsODUwIEw1NzAsODYwIEw1ODAsODcwIEw1OTAsODgwIEw2MDAsODkwIEw2MTAsOTAwIEw2MjAsOTEwIEw2MzAsOTIwIEw2NDAsOTMwIEw2NTAsOTQwIEw2NjAsOTUwIEw2NzAsOTYwIEw2ODAsOTcwIEw2OTAsOTgwIEw3MDAsOTkwIEw3MTAsMTAwMCBMNzIwLDEwMTAgTDczMCwxMDIwIEw3NDAsMTAzMCBMNzUwLDEwNDAgTDc2MCwxMDUwIEw3NzAsMTA2MCBMNzgwLDEwNzAgTDc5MCwxMDgwIEw4MDAsMTA5MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIGZpbGw9Im5vbmUiLz48L3N2Zz4=');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
        }
        
        .migration-hotspot {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .migration-hotspot.drought {
            background-color: #ff9900;
            box-shadow: 0 0 10px #ff9900;
        }
        
        .migration-hotspot.flooding {
            background-color: #00ccff;
            box-shadow: 0 0 10px #00ccff;
        }
        
        .migration-hotspot.storms {
            background-color: #cc00ff;
            box-shadow: 0 0 10px #cc00ff;
        }
        
        .migration-hotspot.sealevelRise {
            background-color: #0066ff;
            box-shadow: 0 0 10px #0066ff;
        }
        
        .migration-hotspot.extremeHeat {
            background-color: #ff3300;
            box-shadow: 0 0 10px #ff3300;
        }
        
        .hotspot-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: pulse 2s infinite;
            opacity: 0.7;
        }
        
        .migration-hotspot.drought .hotspot-pulse {
            background-color: #ff9900;
        }
        
        .migration-hotspot.flooding .hotspot-pulse {
            background-color: #00ccff;
        }
        
        .migration-hotspot.storms .hotspot-pulse {
            background-color: #cc00ff;
        }
        
        .migration-hotspot.sealevelRise .hotspot-pulse {
            background-color: #0066ff;
        }
        
        .migration-hotspot.extremeHeat .hotspot-pulse {
            background-color: #ff3300;
        }
        
        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.7;
            }
            70% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        .hotspot-label {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 0.7rem;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 2px 5px;
            border-radius: 3px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .migration-hotspot:hover .hotspot-label {
            opacity: 1;
        }
        
        .migration-path {
            position: absolute;
            width: 50px;
            height: 2px;
            transform-origin: left center;
            animation: flow 3s infinite;
            opacity: var(--intensity, 0.7);
        }
        
        .migration-path.north {
            transform: rotate(-45deg);
        }
        
        .migration-path.urban {
            transform: rotate(30deg);
        }
        
        .migration-path.coastal {
            transform: rotate(0deg);
        }
        
        .migration-path.mainland {
            transform: rotate(180deg);
        }
        
        .migration-path.europe {
            transform: rotate(-135deg);
        }
        
        .migration-hotspot.drought .migration-path {
            background: linear-gradient(90deg, #ff9900, transparent);
            box-shadow: 0 0 5px #ff9900;
        }
        
        .migration-hotspot.flooding .migration-path {
            background: linear-gradient(90deg, #00ccff, transparent);
            box-shadow: 0 0 5px #00ccff;
        }
        
        .migration-hotspot.storms .migration-path {
            background: linear-gradient(90deg, #cc00ff, transparent);
            box-shadow: 0 0 5px #cc00ff;
        }
        
        .migration-hotspot.sealevelRise .migration-path {
            background: linear-gradient(90deg, #0066ff, transparent);
            box-shadow: 0 0 5px #0066ff;
        }
        
        .migration-hotspot.extremeHeat .migration-path {
            background: linear-gradient(90deg, #ff3300, transparent);
            box-shadow: 0 0 5px #ff3300;
        }
        
        @keyframes flow {
            0% {
                opacity: 0;
                transform: translateX(0) translateY(0) rotate(var(--rotation, 0deg));
            }
            50% {
                opacity: var(--intensity, 0.7);
            }
            100% {
                opacity: 0;
                transform: translateX(var(--path-x, 0px)) translateY(var(--path-y, 0px)) rotate(var(--rotation, 0deg));
            }
        }
        
        .map-overlay {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 4px;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .map-legend {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .legend-color {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        
        .legend-color.drought {
            background-color: #ff9900;
            box-shadow: 0 0 5px #ff9900;
        }
        
        .legend-color.flooding {
            background-color: #00ccff;
            box-shadow: 0 0 5px #00ccff;
        }
        
        .legend-color.storms {
            background-color: #cc00ff;
            box-shadow: 0 0 5px #cc00ff;
        }
        
        .legend-color.sealevelRise {
            background-color: #0066ff;
            box-shadow: 0 0 5px #0066ff;
        }
        
        .legend-label {
            font-size: 0.7rem;
            white-space: nowrap;
        }
        
        .migration-causes {
            margin-bottom: 15px;
        }
        
        .causes-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .causes-chart {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .cause-bar {
            display: flex;
            align-items: center;
        }
        
        .cause-label {
            width: 100px;
            font-size: 0.8rem;
            white-space: nowrap;
        }
        
        .cause-bar-container {
            flex: 1;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .cause-bar-fill {
            height: 100%;
            border-radius: 4px;
            position: relative;
            transition: width 1s;
        }
        
        .cause-bar-fill.drought {
            background-color: #ff9900;
            box-shadow: 0 0 5px #ff9900;
        }
        
        .cause-bar-fill.flooding {
            background-color: #00ccff;
            box-shadow: 0 0 5px #00ccff;
        }
        
        .cause-bar-fill.storms {
            background-color: #cc00ff;
            box-shadow: 0 0 5px #cc00ff;
        }
        
        .cause-bar-fill.sealevelRise {
            background-color: #0066ff;
            box-shadow: 0 0 5px #0066ff;
        }
        
        .cause-bar-fill.extremeHeat {
            background-color: #ff3300;
            box-shadow: 0 0 5px #ff3300;
        }
        
        .cause-percentage {
            position: absolute;
            right: 5px;
            top: -7px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .migration-projections {
            margin-bottom: 10px;
        }
        
        .projections-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .projections-timeline {
            position: relative;
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
        }
        
        .timeline-line {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.2);
            z-index: 1;
        }
        
        .timeline-progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            animation: progress 60s linear infinite;
        }
        
        @keyframes progress {
            0% {
                width: 0%;
            }
            100% {
                width: 100%;
            }
        }
        
        .timeline-point {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .timeline-point::before {
            content: '';
            width: 10px;
            height: 10px;
            background-color: var(--primary-color);
            border-radius: 50%;
            position: absolute;
            top: -5px;
            box-shadow: 0 0 10px var(--primary-color);
        }
        
        .timeline-point .year {
            margin-top: 15px;
            font-size: 0.8rem;
            color: var(--accent-color);
        }
        
        .timeline-point .value {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-color);
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addClimateMigrationStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initClimateMigrationTracker, 1000);
});
