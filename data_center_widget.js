// Data Center Footprint Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the data center footprint data
let dataCenterData = {
    globalCount: 8732,
    totalPower: 205, // TWh per year
    waterUsage: 1.8, // Trillion liters per year
    carbonEmissions: 227, // Million metric tons CO2e per year
    energyEfficiency: {
        pue: 1.58, // Power Usage Effectiveness (lower is better)
        wue: 1.8, // Water Usage Effectiveness (lower is better)
        cue: 0.42 // Carbon Usage Effectiveness (lower is better)
    },
    regionalDistribution: {
        "North America": 35,
        "Europe": 29,
        "Asia Pacific": 27,
        "Latin America": 5,
        "Middle East & Africa": 4
    },
    powerSources: {
        "Coal": 32,
        "Natural Gas": 22,
        "Nuclear": 10,
        "Hydro": 15,
        "Solar": 8,
        "Wind": 11,
        "Other Renewable": 2
    },
    majorProviders: [
        { name: "AWS", centers: 84, renewable: 65, efficiency: 1.15 },
        { name: "Microsoft Azure", centers: 160, renewable: 60, efficiency: 1.12 },
        { name: "Google Cloud", centers: 24, renewable: 100, efficiency: 1.10 },
        { name: "Alibaba Cloud", centers: 25, renewable: 50, efficiency: 1.30 },
        { name: "IBM Cloud", centers: 60, renewable: 55, efficiency: 1.25 }
    ],
    historicalGrowth: {
        "2010": { count: 2600, power: 70 },
        "2015": { count: 4500, power: 120 },
        "2020": { count: 7500, power: 180 },
        "Current": { count: 8732, power: 205 }
    },
    projections: {
        "2025": { count: 10000, power: 250 },
        "2030": { count: 12500, power: 310 }
    }
};

// Function to initialize the Data Center Footprint widget
function initDataCenterFootprint() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('data-center-footprint')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget medium" id="data-center-footprint">
                <div class="widget-header">
                    <h4>DATA CENTER FOOTPRINT</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="data-center-footprint">
                        <div class="datacenter-main">
                            <div class="datacenter-stats">
                                <div class="stat-group">
                                    <div class="stat-value">${dataCenterData.globalCount.toLocaleString()}</div>
                                    <div class="stat-label">GLOBAL DATA CENTERS</div>
                                </div>
                                <div class="stat-group">
                                    <div class="stat-value">${dataCenterData.totalPower}</div>
                                    <div class="stat-label">TWh ANNUAL ENERGY</div>
                                </div>
                                <div class="stat-group">
                                    <div class="stat-value">${dataCenterData.carbonEmissions}</div>
                                    <div class="stat-label">Mt CO₂e EMISSIONS</div>
                                </div>
                            </div>
                            
                            <div class="datacenter-map">
                                <div class="map-container" id="datacenter-map-container">
                                    <!-- Map visualization will be rendered here -->
                                    ${generateDataCenterMap()}
                                </div>
                                <div class="map-legend">
                                    <div class="legend-item">
                                        <div class="legend-color high"></div>
                                        <div class="legend-label">High Density</div>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color medium"></div>
                                        <div class="legend-label">Medium Density</div>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color low"></div>
                                        <div class="legend-label">Low Density</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="datacenter-efficiency">
                            <div class="efficiency-header">EFFICIENCY METRICS</div>
                            <div class="efficiency-metrics">
                                <div class="metric-item">
                                    <div class="metric-gauge">
                                        <svg viewBox="0 0 100 50" class="gauge">
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="8" />
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#00ff9d" stroke-width="8" stroke-dasharray="126" stroke-dashoffset="${126 - (126 * (3 - dataCenterData.energyEfficiency.pue) / 2)}" class="gauge-fill pue" />
                                            <text x="50" y="60" text-anchor="middle" class="gauge-value">${dataCenterData.energyEfficiency.pue}</text>
                                            <text x="50" y="70" text-anchor="middle" class="gauge-label">PUE</text>
                                        </svg>
                                    </div>
                                    <div class="metric-info">
                                        <div class="info-label">Power Usage Effectiveness</div>
                                        <div class="info-desc">Lower is better (1.0 is ideal)</div>
                                    </div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-gauge">
                                        <svg viewBox="0 0 100 50" class="gauge">
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="8" />
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#00ccff" stroke-width="8" stroke-dasharray="126" stroke-dashoffset="${126 - (126 * (4 - dataCenterData.energyEfficiency.wue) / 3)}" class="gauge-fill wue" />
                                            <text x="50" y="60" text-anchor="middle" class="gauge-value">${dataCenterData.energyEfficiency.wue}</text>
                                            <text x="50" y="70" text-anchor="middle" class="gauge-label">WUE</text>
                                        </svg>
                                    </div>
                                    <div class="metric-info">
                                        <div class="info-label">Water Usage Effectiveness</div>
                                        <div class="info-desc">Liters per kWh of IT energy</div>
                                    </div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-gauge">
                                        <svg viewBox="0 0 100 50" class="gauge">
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="8" />
                                            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#ff3366" stroke-width="8" stroke-dasharray="126" stroke-dashoffset="${126 - (126 * (1 - dataCenterData.energyEfficiency.cue) / 1)}" class="gauge-fill cue" />
                                            <text x="50" y="60" text-anchor="middle" class="gauge-value">${dataCenterData.energyEfficiency.cue}</text>
                                            <text x="50" y="70" text-anchor="middle" class="gauge-label">CUE</text>
                                        </svg>
                                    </div>
                                    <div class="metric-info">
                                        <div class="info-label">Carbon Usage Effectiveness</div>
                                        <div class="info-desc">kg CO₂e per kWh of IT energy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="datacenter-power">
                            <div class="power-header">POWER SOURCES</div>
                            <div class="power-chart">
                                <div class="donut-chart-container">
                                    <svg viewBox="0 0 100 100" class="power-donut">
                                        ${generatePowerDonut()}
                                    </svg>
                                </div>
                                <div class="power-legend">
                                    ${generatePowerLegend()}
                                </div>
                            </div>
                        </div>
                        
                        <div class="datacenter-providers">
                            <div class="providers-header">MAJOR CLOUD PROVIDERS</div>
                            <div class="providers-table">
                                <div class="table-header">
                                    <div class="header-cell">PROVIDER</div>
                                    <div class="header-cell">DATA CENTERS</div>
                                    <div class="header-cell">RENEWABLE %</div>
                                    <div class="header-cell">PUE</div>
                                </div>
                                <div class="table-body">
                                    ${generateProvidersTable()}
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
        startDataCenterSimulation();
    }
}

// Function to generate the data center map HTML
function generateDataCenterMap() {
    // This is a simplified representation of a world map with data center hotspots
    let mapHTML = `
        <div class="world-map">
            <div class="map-hotspot north-america" style="--intensity: 0.9;"></div>
            <div class="map-hotspot europe" style="--intensity: 0.8;"></div>
            <div class="map-hotspot asia" style="--intensity: 0.75;"></div>
            <div class="map-hotspot south-america" style="--intensity: 0.4;"></div>
            <div class="map-hotspot africa" style="--intensity: 0.3;"></div>
            <div class="map-hotspot australia" style="--intensity: 0.5;"></div>
        </div>
    `;
    
    return mapHTML;
}

// Function to generate the power donut chart
function generatePowerDonut() {
    let donutHTML = '';
    let cumulativePercentage = 0;
    
    // Define colors for each power source
    const colors = {
        "Coal": "#666666",
        "Natural Gas": "#cc99ff",
        "Nuclear": "#ff9900",
        "Hydro": "#0066ff",
        "Solar": "#ffcc00",
        "Wind": "#00ccff",
        "Other Renewable": "#66cc00"
    };
    
    // Generate the donut segments
    Object.entries(dataCenterData.powerSources).forEach(([source, percentage]) => {
        const startAngle = cumulativePercentage * 3.6; // 3.6 degrees per percentage point
        cumulativePercentage += percentage;
        const endAngle = cumulativePercentage * 3.6;
        
        // Convert angles to radians
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        // Calculate the SVG arc path
        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);
        
        // Determine if the arc should be drawn as a large arc (more than 180 degrees)
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        
        // Create the SVG path for the donut segment
        donutHTML += `
            <path d="M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z" 
                  fill="${colors[source]}" 
                  stroke="#111" 
                  stroke-width="1" 
                  class="donut-segment"
                  data-source="${source}"
                  data-percentage="${percentage}">
                <title>${source}: ${percentage}%</title>
            </path>
        `;
    });
    
    // Add a center circle to create the donut hole
    donutHTML += `<circle cx="50" cy="50" r="25" fill="#111" />`;
    
    return donutHTML;
}

// Function to generate the power sources legend
function generatePowerLegend() {
    let legendHTML = '';
    
    // Define colors for each power source
    const colors = {
        "Coal": "#666666",
        "Natural Gas": "#cc99ff",
        "Nuclear": "#ff9900",
        "Hydro": "#0066ff",
        "Solar": "#ffcc00",
        "Wind": "#00ccff",
        "Other Renewable": "#66cc00"
    };
    
    Object.entries(dataCenterData.powerSources).forEach(([source, percentage]) => {
        legendHTML += `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${colors[source]};"></div>
                <div class="legend-label">${source}</div>
                <div class="legend-value">${percentage}%</div>
            </div>
        `;
    });
    
    return legendHTML;
}

// Function to generate the providers table
function generateProvidersTable() {
    let tableHTML = '';
    
    dataCenterData.majorProviders.forEach(provider => {
        tableHTML += `
            <div class="table-row">
                <div class="row-cell provider-name">${provider.name}</div>
                <div class="row-cell">${provider.centers}</div>
                <div class="row-cell">
                    <div class="renewable-bar">
                        <div class="renewable-fill" style="width: ${provider.renewable}%"></div>
                        <span class="renewable-text">${provider.renewable}%</span>
                    </div>
                </div>
                <div class="row-cell">${provider.efficiency}</div>
            </div>
        `;
    });
    
    return tableHTML;
}

// Function to start the data center simulation
function startDataCenterSimulation() {
    // Update the data center data every 12 seconds
    setInterval(() => {
        // Simulate changes in global count
        const countChange = Math.floor(Math.random() * 10) - 2; // Random change between -2 and +7
        dataCenterData.globalCount = Math.max(8000, dataCenterData.globalCount + countChange);
        
        // Simulate changes in power consumption
        const powerChange = (Math.random() * 0.4) - 0.1; // Random change between -0.1 and +0.3
        dataCenterData.totalPower = parseFloat((dataCenterData.totalPower + powerChange).toFixed(1));
        
        // Simulate changes in carbon emissions based on power changes
        const emissionsChange = powerChange * 1.1; // Slightly more than power change
        dataCenterData.carbonEmissions = parseFloat((dataCenterData.carbonEmissions + emissionsChange).toFixed(1));
        
        // Occasionally update efficiency metrics
        if (Math.random() > 0.7) {
            // PUE improvements (lower is better)
            const pueChange = (Math.random() * 0.02) - 0.015; // Bias towards improvement
            dataCenterData.energyEfficiency.pue = parseFloat((dataCenterData.energyEfficiency.pue + pueChange).toFixed(2));
            if (dataCenterData.energyEfficiency.pue < 1.05) dataCenterData.energyEfficiency.pue = 1.05; // Can't be better than 1.05
            if (dataCenterData.energyEfficiency.pue > 3) dataCenterData.energyEfficiency.pue = 3;
            
            // WUE changes
            const wueChange = (Math.random() * 0.04) - 0.03; // Bias towards improvement
            dataCenterData.energyEfficiency.wue = parseFloat((dataCenterData.energyEfficiency.wue + wueChange).toFixed(2));
            if (dataCenterData.energyEfficiency.wue < 0.5) dataCenterData.energyEfficiency.wue = 0.5;
            if (dataCenterData.energyEfficiency.wue > 4) dataCenterData.energyEfficiency.wue = 4;
            
            // CUE changes
            const cueChange = (Math.random() * 0.01) - 0.008; // Bias towards improvement
            dataCenterData.energyEfficiency.cue = parseFloat((dataCenterData.energyEfficiency.cue + cueChange).toFixed(2));
            if (dataCenterData.energyEfficiency.cue < 0.1) dataCenterData.energyEfficiency.cue = 0.1;
            if (dataCenterData.energyEfficiency.cue > 1) dataCenterData.energyEfficiency.cue = 1;
            
            // Update the efficiency gauges
            updateEfficiencyGauges();
        }
        
        // Occasionally update power sources
        if (Math.random() > 0.8) {
            // Slightly adjust power source percentages
            let total = 0;
            Object.keys(dataCenterData.powerSources).forEach(source => {
                // Bias towards increasing renewables and decreasing fossil fuels
                let change = Math.floor(Math.random() * 3) - 1;
                if (source === "Coal" || source === "Natural Gas") {
                    change -= 0.2; // More likely to decrease
                } else if (source === "Solar" || source === "Wind" || source === "Other Renewable") {
                    change += 0.2; // More likely to increase
                }
                
                dataCenterData.powerSources[source] = Math.max(1, dataCenterData.powerSources[source] + change);
                total += dataCenterData.powerSources[source];
            });
            
            // Normalize to ensure total is 100%
            Object.keys(dataCenterData.powerSources).forEach(source => {
                dataCenterData.powerSources[source] = Math.round((dataCenterData.powerSources[source] / total) * 100);
            });
            
            // Update the power donut and legend
            document.querySelector('.power-donut').innerHTML = generatePowerDonut();
            document.querySelector('.power-legend').innerHTML = generatePowerLegend();
        }
        
        // Occasionally update provider data
        if (Math.random() > 0.9) {
            dataCenterData.majorProviders.forEach(provider => {
                // Update data center count
                const centerChange = Math.floor(Math.random() * 3) - 1;
                provider.centers = Math.max(10, provider.centers + centerChange);
                
                // Update renewable percentage (trend upward)
                const renewableChange = Math.floor(Math.random() * 2);
                provider.renewable = Math.min(100, Math.max(0, provider.renewable + renewableChange));
                
                // Update efficiency (trend toward improvement)
                const efficiencyChange = (Math.random() * 0.02) - 0.015;
                provider.efficiency = parseFloat((provider.efficiency + efficiencyChange).toFixed(2));
                if (provider.efficiency < 1.05) provider.efficiency = 1.05;
                if (provider.efficiency > 2) provider.efficiency = 2;
            });
            
            // Sort providers by renewable percentage (highest first)
            dataCenterData.majorProviders.sort((a, b) => b.renewable - a.renewable);
            
            // Update the providers table
            document.querySelector('.table-body').innerHTML = generateProvidersTable();
        }
        
        // Update the main stats
        updateDataCenterStats();
        
    }, 12000);
    
    // Animate map hotspots continuously
    animateMapHotspots();
}

// Function to update the efficiency gauges
function updateEfficiencyGauges() {
    // Update PUE gauge
    const pueGauge = document.querySelector('.gauge-fill.pue');
    const pueValue = document.querySelector('.gauge-value:nth-of-type(1)');
    if (pueGauge && pueValue) {
        pueGauge.setAttribute('stroke-dashoffset', `${126 - (126 * (3 - dataCenterData.energyEfficiency.pue) / 2)}`);
        pueValue.textContent = dataCenterData.energyEfficiency.pue;
    }
    
    // Update WUE gauge
    const wueGauge = document.querySelector('.gauge-fill.wue');
    const wueValue = document.querySelector('.gauge-value:nth-of-type(2)');
    if (wueGauge && wueValue) {
        wueGauge.setAttribute('stroke-dashoffset', `${126 - (126 * (4 - dataCenterData.energyEfficiency.wue) / 3)}`);
        wueValue.textContent = dataCenterData.energyEfficiency.wue;
    }
    
    // Update CUE gauge
    const cueGauge = document.querySelector('.gauge-fill.cue');
    const cueValue = document.querySelector('.gauge-value:nth-of-type(3)');
    if (cueGauge && cueValue) {
        cueGauge.setAttribute('stroke-dashoffset', `${126 - (126 * (1 - dataCenterData.energyEfficiency.cue) / 1)}`);
        cueValue.textContent = dataCenterData.energyEfficiency.cue;
    }
}

// Function to update the main data center stats
function updateDataCenterStats() {
    const statValues = document.querySelectorAll('.datacenter-stats .stat-value');
    if (statValues.length >= 3) {
        statValues[0].textContent = dataCenterData.globalCount.toLocaleString();
        statValues[1].textContent = dataCenterData.totalPower;
        statValues[2].textContent = dataCenterData.carbonEmissions;
    }
}

// Function to animate map hotspots
function animateMapHotspots() {
    const hotspots = document.querySelectorAll('.map-hotspot');
    
    hotspots.forEach(hotspot => {
        // Randomly change the intensity of the hotspot
        setInterval(() => {
            const intensityChange = (Math.random() * 0.1) - 0.05;
            const currentIntensity = parseFloat(hotspot.style.getPropertyValue('--intensity'));
            const newIntensity = Math.max(0.2, Math.min(1, currentIntensity + intensityChange));
            hotspot.style.setProperty('--intensity', newIntensity);
        }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
    });
}

// Add CSS for the Data Center Footprint widget
function addDataCenterStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Data Center Footprint Styles */
        .data-center-footprint {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .datacenter-main {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }
        
        .datacenter-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        
        .stat-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
            font-family: var(--header-font);
        }
        
        .stat-label {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
            text-align: center;
        }
        
        .datacenter-map {
            position: relative;
            height: 150px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .world-map {
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMwLDUwIEwxNTAsNTAgTDE3MCw2MCBMMTM1LDg1IEwxNDAsOTUgTDE0MCwxMTAgTDE1MCwxMjAgTDE0MCwxMzAgTDEzMCwxMzAgTDEyMCwxNDAgTDEzMCwxNTAgTDE0MCwxNTAgTDE1MCwxNjAgTDE0MCwxNzAgTDEzMCwxODAgTDEyMCwxOTAgTDExMCwyMDAgTDEwMCwyMTAgTDkwLDIyMCBMODAsMjMwIEw3MCwyNDAgTDYwLDI1MCBMNTAsMjYwIEw0MCwyNzAgTDMwLDI4MCBMMjAsMjkwIEwxMCwzMDAgTDIwLDMxMCBMMzAsMzIwIEw0MCwzMzAgTDUwLDM0MCBMNjAsMzUwIEw3MCwzNjAgTDgwLDM3MCBMOTAsMzgwIEwxMDAsMzkwIEwxMTAsNDAwIEwxMjAsNDEwIEwxMzAsNDIwIEwxNDAsNDMwIEwxNTAsNDQwIEwxNjAsNDUwIEwxNzAsNDYwIEwxODAsNDcwIEwxOTAsNDgwIEwyMDAsNDkwIEwyMTAsNTAwIEwyMjAsNTEwIEwyMzAsNTIwIEwyNDAsNTMwIEwyNTAsNTQwIEwyNjAsNTUwIEwyNzAsNTYwIEwyODAsNTcwIEwyOTAsNTgwIEwzMDAsNTkwIEwzMTAsNjAwIEwzMjAsNjEwIEwzMzAsNjIwIEwzNDAsNjMwIEwzNTAsNjQwIEwzNjAsNjUwIEwzNzAsNjYwIEwzODAsNjcwIEwzOTAsNjgwIEw0MDAsNjkwIEw0MTAsNzAwIEw0MjAsNzEwIEw0MzAsNzIwIEw0NDAsNzMwIEw0NTAsNzQwIEw0NjAsNzUwIEw0NzAsNzYwIEw0ODAsNzcwIEw0OTAsNzgwIEw1MDAsNzkwIEw1MTAsODAwIEw1MjAsODEwIEw1MzAsODIwIEw1NDAsODMwIEw1NTAsODQwIEw1NjAsODUwIEw1NzAsODYwIEw1ODAsODcwIEw1OTAsODgwIEw2MDAsODkwIEw2MTAsOTAwIEw2MjAsOTEwIEw2MzAsOTIwIEw2NDAsOTMwIEw2NTAsOTQwIEw2NjAsOTUwIEw2NzAsOTYwIEw2ODAsOTcwIEw2OTAsOTgwIEw3MDAsOTkwIEw3MTAsMTAwMCBMNzIwLDEwMTAgTDczMCwxMDIwIEw3NDAsMTAzMCBMNzUwLDEwNDAgTDc2MCwxMDUwIEw3NzAsMTA2MCBMNzgwLDEwNzAgTDc5MCwxMDgwIEw4MDAsMTA5MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIGZpbGw9Im5vbmUiLz48L3N2Zz4=');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
        }
        
        .map-hotspot {
            position: absolute;
            border-radius: 50%;
            background-color: var(--primary-color);
            filter: blur(5px);
            opacity: var(--intensity, 0.7);
            animation: pulse 3s infinite;
        }
        
        .map-hotspot.north-america {
            top: 30%;
            left: 20%;
            width: 60px;
            height: 40px;
        }
        
        .map-hotspot.europe {
            top: 25%;
            left: 45%;
            width: 40px;
            height: 30px;
        }
        
        .map-hotspot.asia {
            top: 35%;
            left: 70%;
            width: 60px;
            height: 40px;
        }
        
        .map-hotspot.south-america {
            top: 60%;
            left: 30%;
            width: 30px;
            height: 30px;
        }
        
        .map-hotspot.africa {
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
        }
        
        .map-hotspot.australia {
            top: 65%;
            left: 80%;
            width: 25px;
            height: 25px;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: var(--intensity, 0.7);
            }
            50% {
                transform: scale(1.1);
                opacity: calc(var(--intensity, 0.7) * 0.8);
            }
            100% {
                transform: scale(1);
                opacity: var(--intensity, 0.7);
            }
        }
        
        .map-legend {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 4px;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .map-legend .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 3px;
        }
        
        .map-legend .legend-color {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        
        .map-legend .legend-color.high {
            background-color: var(--primary-color);
            box-shadow: 0 0 5px var(--primary-color);
        }
        
        .map-legend .legend-color.medium {
            background-color: var(--accent-color);
            box-shadow: 0 0 5px var(--accent-color);
        }
        
        .map-legend .legend-color.low {
            background-color: var(--secondary-color);
            box-shadow: 0 0 5px var(--secondary-color);
        }
        
        .map-legend .legend-label {
            font-size: 0.7rem;
            white-space: nowrap;
        }
        
        .datacenter-efficiency {
            margin-bottom: 20px;
        }
        
        .efficiency-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .efficiency-metrics {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        
        .metric-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .metric-gauge {
            width: 100%;
            max-width: 100px;
            margin-bottom: 10px;
        }
        
        .gauge {
            overflow: visible;
        }
        
        .gauge-fill {
            transition: stroke-dashoffset 1s;
        }
        
        .gauge-fill.pue {
            stroke: #00ff9d;
            filter: drop-shadow(0 0 3px #00ff9d);
        }
        
        .gauge-fill.wue {
            stroke: #00ccff;
            filter: drop-shadow(0 0 3px #00ccff);
        }
        
        .gauge-fill.cue {
            stroke: #ff3366;
            filter: drop-shadow(0 0 3px #ff3366);
        }
        
        .gauge-value {
            font-size: 14px;
            fill: var(--text-color);
            font-weight: 700;
        }
        
        .gauge-label {
            font-size: 10px;
            fill: rgba(224, 224, 224, 0.6);
        }
        
        .metric-info {
            text-align: center;
        }
        
        .info-label {
            font-size: 0.8rem;
            margin-bottom: 3px;
        }
        
        .info-desc {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
        }
        
        .datacenter-power {
            margin-bottom: 20px;
        }
        
        .power-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .power-chart {
            display: flex;
            gap: 20px;
        }
        
        .donut-chart-container {
            width: 120px;
            flex-shrink: 0;
        }
        
        .power-donut {
            width: 100%;
            height: auto;
        }
        
        .donut-segment {
            transition: all 0.3s;
        }
        
        .donut-segment:hover {
            transform: translateX(2px) translateY(2px);
            filter: brightness(1.2);
        }
        
        .power-legend {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 0.8rem;
        }
        
        .power-legend .legend-item {
            display: flex;
            align-items: center;
        }
        
        .power-legend .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            margin-right: 8px;
        }
        
        .power-legend .legend-label {
            flex: 1;
        }
        
        .power-legend .legend-value {
            font-weight: 600;
        }
        
        .datacenter-providers {
            margin-bottom: 10px;
        }
        
        .providers-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .providers-table {
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .table-header {
            display: flex;
            background-color: rgba(0, 0, 0, 0.3);
            padding: 8px 0;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .header-cell {
            flex: 1;
            padding: 0 10px;
            text-align: center;
        }
        
        .header-cell:first-child {
            text-align: left;
            flex: 1.5;
        }
        
        .table-body {
            font-size: 0.8rem;
        }
        
        .table-row {
            display: flex;
            padding: 8px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            background-color: rgba(0, 0, 0, 0.2);
        }
        
        .table-row:nth-child(odd) {
            background-color: rgba(0, 0, 0, 0.1);
        }
        
        .row-cell {
            flex: 1;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .row-cell:first-child {
            justify-content: flex-start;
            flex: 1.5;
        }
        
        .provider-name {
            font-weight: 600;
        }
        
        .renewable-bar {
            width: 100%;
            height: 16px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }
        
        .renewable-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff9d, #00ccff);
            box-shadow: 0 0 5px #00ff9d;
            transition: width 1s;
        }
        
        .renewable-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.7rem;
            font-weight: 600;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addDataCenterStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initDataCenterFootprint, 1000);
});
