// Energy Mix Monitor Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the energy mix data
let energyData = {
    currentMix: {
        renewable: 38.2,
        nonRenewable: 61.8
    },
    renewableBreakdown: {
        solar: 12.5,
        wind: 14.3,
        hydro: 7.8,
        geothermal: 1.2,
        biomass: 2.4
    },
    nonRenewableBreakdown: {
        coal: 22.7,
        naturalGas: 24.5,
        oil: 10.2,
        nuclear: 4.4
    },
    carbonIntensity: 385, // gCO2/kWh
    yearlyChange: 3.2, // percentage increase in renewables
    countryComparison: [
        { name: "Iceland", renewable: 97, nonRenewable: 3 },
        { name: "Norway", renewable: 92, nonRenewable: 8 },
        { name: "Brazil", renewable: 78, nonRenewable: 22 },
        { name: "Germany", renewable: 46, nonRenewable: 54 },
        { name: "United States", renewable: 21, nonRenewable: 79 },
        { name: "China", renewable: 29, nonRenewable: 71 },
        { name: "India", renewable: 18, nonRenewable: 82 },
        { name: "Saudi Arabia", renewable: 0.5, nonRenewable: 99.5 }
    ],
    historicalData: {
        "2010": { renewable: 19.8, nonRenewable: 80.2 },
        "2015": { renewable: 23.5, nonRenewable: 76.5 },
        "2020": { renewable: 29.7, nonRenewable: 70.3 },
        "Current": { renewable: 38.2, nonRenewable: 61.8 }
    },
    projections: {
        "2030": { renewable: 55, nonRenewable: 45 },
        "2040": { renewable: 72, nonRenewable: 28 },
        "2050": { renewable: 90, nonRenewable: 10 }
    }
};

// Function to initialize the Energy Mix Monitor widget
function initEnergyMixMonitor() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('energy-mix-monitor')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget medium" id="energy-mix-monitor">
                <div class="widget-header">
                    <h4>ENERGY MIX MONITOR</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="energy-mix">
                        <div class="energy-donut-container">
                            <div class="energy-donut">
                                <svg viewBox="0 0 100 100" class="donut-chart">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255, 255, 255, 0.1)" stroke-width="15" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ff3366" stroke-width="15" stroke-dasharray="${energyData.currentMix.nonRenewable} ${energyData.currentMix.renewable}" stroke-dashoffset="25" class="non-renewable-arc" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00ff9d" stroke-width="15" stroke-dasharray="${energyData.currentMix.renewable} ${energyData.currentMix.nonRenewable}" stroke-dashoffset="${100 - energyData.currentMix.nonRenewable - 25}" class="renewable-arc" />
                                </svg>
                                <div class="donut-content">
                                    <div class="donut-percentage" id="renewable-percentage">${energyData.currentMix.renewable}%</div>
                                    <div class="donut-label">RENEWABLE</div>
                                </div>
                            </div>
                            <div class="energy-trend">
                                <div class="trend-value up">+${energyData.yearlyChange}%</div>
                                <div class="trend-label">YEARLY CHANGE</div>
                            </div>
                        </div>
                        
                        <div class="energy-breakdown">
                            <div class="breakdown-section">
                                <div class="breakdown-header renewable">RENEWABLE SOURCES</div>
                                <div class="breakdown-bars">
                                    ${generateEnergyBreakdownBars(energyData.renewableBreakdown, 'renewable')}
                                </div>
                            </div>
                            <div class="breakdown-section">
                                <div class="breakdown-header non-renewable">NON-RENEWABLE SOURCES</div>
                                <div class="breakdown-bars">
                                    ${generateEnergyBreakdownBars(energyData.nonRenewableBreakdown, 'non-renewable')}
                                </div>
                            </div>
                        </div>
                        
                        <div class="energy-carbon">
                            <div class="carbon-header">CARBON INTENSITY</div>
                            <div class="carbon-value-container">
                                <div class="carbon-value" id="carbon-intensity">${energyData.carbonIntensity}</div>
                                <div class="carbon-unit">gCO₂/kWh</div>
                            </div>
                            <div class="carbon-gauge">
                                <div class="gauge-scale">
                                    <div class="scale-marker good">100</div>
                                    <div class="scale-marker moderate">300</div>
                                    <div class="scale-marker poor">600</div>
                                </div>
                                <div class="gauge-bar">
                                    <div class="gauge-fill" style="width: ${Math.min(100, (energyData.carbonIntensity / 800) * 100)}%"></div>
                                    <div class="gauge-indicator" style="left: ${Math.min(100, (energyData.carbonIntensity / 800) * 100)}%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="energy-comparison">
                            <div class="comparison-header">COUNTRY COMPARISON</div>
                            <div class="comparison-slider">
                                <div class="slider-container" id="country-slider">
                                    ${generateCountryComparison()}
                                </div>
                                <div class="slider-controls">
                                    <button class="slider-prev">◀</button>
                                    <button class="slider-next">▶</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Initialize the slider controls
        initSliderControls();
        
        // Start the data simulation
        startEnergySimulation();
    }
}

// Function to generate energy breakdown bars
function generateEnergyBreakdownBars(breakdown, type) {
    let barsHTML = '';
    
    Object.entries(breakdown).forEach(([source, percentage]) => {
        const sourceLabel = formatEnergySourceLabel(source);
        const barClass = type === 'renewable' ? 'renewable' : 'non-renewable';
        const sourceClass = source.toLowerCase().replace(/\s+/g, '-');
        
        barsHTML += `
            <div class="breakdown-bar">
                <div class="bar-label">${sourceLabel}</div>
                <div class="bar-container">
                    <div class="bar-fill ${barClass} ${sourceClass}" style="width: ${percentage * 2}%">
                        <span class="bar-percentage">${percentage}%</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    return barsHTML;
}

// Function to generate country comparison HTML
function generateCountryComparison() {
    let comparisonHTML = '';
    
    energyData.countryComparison.forEach((country, index) => {
        comparisonHTML += `
            <div class="country-item ${index === 0 ? 'active' : ''}">
                <div class="country-name">${country.name}</div>
                <div class="country-mix">
                    <div class="mix-bar">
                        <div class="mix-renewable" style="width: ${country.renewable}%"></div>
                        <div class="mix-non-renewable" style="width: ${country.nonRenewable}%"></div>
                    </div>
                    <div class="mix-labels">
                        <div class="mix-label renewable">${country.renewable}%</div>
                        <div class="mix-label non-renewable">${country.nonRenewable}%</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return comparisonHTML;
}

// Function to initialize slider controls
function initSliderControls() {
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const slider = document.getElementById('country-slider');
    
    if (prevButton && nextButton && slider) {
        let currentIndex = 0;
        const items = slider.querySelectorAll('.country-item');
        
        prevButton.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].classList.add('active');
            updateSliderPosition(slider, items, currentIndex);
        });
        
        nextButton.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
            updateSliderPosition(slider, items, currentIndex);
        });
        
        // Auto-advance the slider every 8 seconds
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
            updateSliderPosition(slider, items, currentIndex);
        }, 8000);
    }
}

// Function to update slider position
function updateSliderPosition(slider, items, currentIndex) {
    if (items.length > 0) {
        const itemWidth = items[0].offsetWidth;
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

// Function to start the energy data simulation
function startEnergySimulation() {
    // Update the energy data every 10 seconds
    setInterval(() => {
        // Simulate changes in renewable percentage
        const renewableChange = (Math.random() * 0.4) - 0.1; // Random change between -0.1 and +0.3
        energyData.currentMix.renewable = parseFloat((energyData.currentMix.renewable + renewableChange).toFixed(1));
        energyData.currentMix.nonRenewable = parseFloat((100 - energyData.currentMix.renewable).toFixed(1));
        
        // Update yearly change occasionally
        if (Math.random() > 0.7) {
            const yearlyChange = (Math.random() * 0.3) - 0.1;
            energyData.yearlyChange = parseFloat((energyData.yearlyChange + yearlyChange).toFixed(1));
            if (energyData.yearlyChange < 0) energyData.yearlyChange = 0.1;
            if (energyData.yearlyChange > 5) energyData.yearlyChange = 5;
        }
        
        // Update carbon intensity based on renewable percentage
        const intensityChange = -renewableChange * 5; // Inverse relationship with renewable percentage
        energyData.carbonIntensity = Math.max(50, Math.min(800, Math.round(energyData.carbonIntensity + intensityChange)));
        
        // Update the UI
        updateEnergyUI();
        
    }, 10000);
    
    // Occasionally update the breakdown percentages
    setInterval(() => {
        // Adjust renewable breakdown
        let renewableTotal = 0;
        Object.keys(energyData.renewableBreakdown).forEach(source => {
            const change = (Math.random() * 0.6) - 0.3;
            energyData.renewableBreakdown[source] = Math.max(0.1, parseFloat((energyData.renewableBreakdown[source] + change).toFixed(1)));
            renewableTotal += energyData.renewableBreakdown[source];
        });
        
        // Normalize to match current renewable percentage
        const renewableFactor = energyData.currentMix.renewable / renewableTotal;
        Object.keys(energyData.renewableBreakdown).forEach(source => {
            energyData.renewableBreakdown[source] = parseFloat((energyData.renewableBreakdown[source] * renewableFactor).toFixed(1));
        });
        
        // Adjust non-renewable breakdown
        let nonRenewableTotal = 0;
        Object.keys(energyData.nonRenewableBreakdown).forEach(source => {
            const change = (Math.random() * 0.6) - 0.3;
            energyData.nonRenewableBreakdown[source] = Math.max(0.1, parseFloat((energyData.nonRenewableBreakdown[source] + change).toFixed(1)));
            nonRenewableTotal += energyData.nonRenewableBreakdown[source];
        });
        
        // Normalize to match current non-renewable percentage
        const nonRenewableFactor = energyData.currentMix.nonRenewable / nonRenewableTotal;
        Object.keys(energyData.nonRenewableBreakdown).forEach(source => {
            energyData.nonRenewableBreakdown[source] = parseFloat((energyData.nonRenewableBreakdown[source] * nonRenewableFactor).toFixed(1));
        });
        
        // Update the breakdown bars
        updateEnergyBreakdown();
        
    }, 30000);
}

// Function to update the energy UI
function updateEnergyUI() {
    // Update donut chart
    const renewableArc = document.querySelector('.renewable-arc');
    const nonRenewableArc = document.querySelector('.non-renewable-arc');
    
    if (renewableArc && nonRenewableArc) {
        renewableArc.setAttribute('stroke-dasharray', `${energyData.currentMix.renewable} ${energyData.currentMix.nonRenewable}`);
        renewableArc.setAttribute('stroke-dashoffset', `${100 - energyData.currentMix.nonRenewable - 25}`);
        
        nonRenewableArc.setAttribute('stroke-dasharray', `${energyData.currentMix.nonRenewable} ${energyData.currentMix.renewable}`);
    }
    
    // Update percentage display
    document.getElementById('renewable-percentage').textContent = `${energyData.currentMix.renewable}%`;
    
    // Update yearly trend
    const trendElement = document.querySelector('.trend-value');
    trendElement.textContent = `+${energyData.yearlyChange}%`;
    
    // Update carbon intensity
    document.getElementById('carbon-intensity').textContent = energyData.carbonIntensity;
    
    // Update gauge
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeIndicator = document.querySelector('.gauge-indicator');
    
    if (gaugeFill && gaugeIndicator) {
        const gaugePercentage = Math.min(100, (energyData.carbonIntensity / 800) * 100);
        gaugeFill.style.width = `${gaugePercentage}%`;
        gaugeIndicator.style.left = `${gaugePercentage}%`;
        
        // Update gauge color based on intensity
        if (energyData.carbonIntensity < 200) {
            gaugeFill.className = 'gauge-fill good';
        } else if (energyData.carbonIntensity < 400) {
            gaugeFill.className = 'gauge-fill moderate';
        } else {
            gaugeFill.className = 'gauge-fill poor';
        }
    }
}

// Function to update energy breakdown
function updateEnergyBreakdown() {
    const renewableSection = document.querySelector('.breakdown-section:first-child .breakdown-bars');
    const nonRenewableSection = document.querySelector('.breakdown-section:last-child .breakdown-bars');
    
    if (renewableSection && nonRenewableSection) {
        renewableSection.innerHTML = generateEnergyBreakdownBars(energyData.renewableBreakdown, 'renewable');
        nonRenewableSection.innerHTML = generateEnergyBreakdownBars(energyData.nonRenewableBreakdown, 'non-renewable');
    }
}

// Helper function to format energy source labels
function formatEnergySourceLabel(source) {
    switch(source) {
        case 'naturalGas':
            return 'Natural Gas';
        default:
            return source.charAt(0).toUpperCase() + source.slice(1);
    }
}

// Add CSS for the Energy Mix Monitor widget
function addEnergyMixStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Energy Mix Monitor Styles */
        .energy-mix {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .energy-donut-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .energy-donut {
            position: relative;
            width: 120px;
            height: 120px;
        }
        
        .donut-chart {
            transform: rotate(-90deg);
            overflow: visible;
        }
        
        .renewable-arc {
            stroke: #00ff9d;
            filter: drop-shadow(0 0 5px #00ff9d);
            transition: stroke-dasharray 1s, stroke-dashoffset 1s;
        }
        
        .non-renewable-arc {
            stroke: #ff3366;
            filter: drop-shadow(0 0 5px #ff3366);
            transition: stroke-dasharray 1s;
        }
        
        .donut-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        
        .donut-percentage {
            font-size: 1.8rem;
            font-weight: 700;
            color: #00ff9d;
            line-height: 1;
        }
        
        .donut-label {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .energy-trend {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .trend-value {
            font-size: 1.4rem;
            font-weight: 600;
        }
        
        .trend-value.up {
            color: #00ff9d;
        }
        
        .trend-value.down {
            color: #ff3366;
        }
        
        .trend-label {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .energy-breakdown {
            margin-bottom: 20px;
        }
        
        .breakdown-section {
            margin-bottom: 15px;
        }
        
        .breakdown-header {
            font-size: 0.9rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .breakdown-header.renewable {
            color: #00ff9d;
        }
        
        .breakdown-header.non-renewable {
            color: #ff3366;
        }
        
        .breakdown-bars {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .breakdown-bar {
            display: flex;
            align-items: center;
        }
        
        .bar-label {
            width: 80px;
            font-size: 0.8rem;
            white-space: nowrap;
        }
        
        .bar-container {
            flex: 1;
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }
        
        .bar-fill {
            height: 100%;
            border-radius: 3px;
            position: relative;
            transition: width 1s;
        }
        
        .bar-fill.renewable {
            background-color: #00ff9d;
            box-shadow: 0 0 5px #00ff9d;
        }
        
        .bar-fill.renewable.solar {
            background-color: #ffcc00;
            box-shadow: 0 0 5px #ffcc00;
        }
        
        .bar-fill.renewable.wind {
            background-color: #00ccff;
            box-shadow: 0 0 5px #00ccff;
        }
        
        .bar-fill.renewable.hydro {
            background-color: #0066ff;
            box-shadow: 0 0 5px #0066ff;
        }
        
        .bar-fill.renewable.geothermal {
            background-color: #ff6600;
            box-shadow: 0 0 5px #ff6600;
        }
        
        .bar-fill.renewable.biomass {
            background-color: #66cc00;
            box-shadow: 0 0 5px #66cc00;
        }
        
        .bar-fill.non-renewable {
            background-color: #ff3366;
            box-shadow: 0 0 5px #ff3366;
        }
        
        .bar-fill.non-renewable.coal {
            background-color: #666666;
            box-shadow: 0 0 5px #666666;
        }
        
        .bar-fill.non-renewable.natural-gas {
            background-color: #cc99ff;
            box-shadow: 0 0 5px #cc99ff;
        }
        
        .bar-fill.non-renewable.oil {
            background-color: #996633;
            box-shadow: 0 0 5px #996633;
        }
        
        .bar-fill.non-renewable.nuclear {
            background-color: #ff9900;
            box-shadow: 0 0 5px #ff9900;
        }
        
        .bar-percentage {
            position: absolute;
            right: 5px;
            top: -7px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .energy-carbon {
            margin-bottom: 20px;
        }
        
        .carbon-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .carbon-value-container {
            display: flex;
            align-items: baseline;
            margin-bottom: 10px;
        }
        
        .carbon-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--accent-color);
        }
        
        .carbon-unit {
            font-size: 0.9rem;
            margin-left: 5px;
            color: rgba(224, 224, 224, 0.7);
        }
        
        .carbon-gauge {
            position: relative;
            margin-top: 15px;
        }
        
        .gauge-scale {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .scale-marker {
            font-size: 0.7rem;
            position: relative;
        }
        
        .scale-marker.good {
            color: #00ff9d;
        }
        
        .scale-marker.moderate {
            color: #ffcc00;
        }
        
        .scale-marker.poor {
            color: #ff3366;
        }
        
        .gauge-bar {
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        
        .gauge-fill {
            height: 100%;
            transition: width 1s;
        }
        
        .gauge-fill.good {
            background: linear-gradient(90deg, #00ff9d, #00ccff);
            box-shadow: 0 0 10px #00ff9d;
        }
        
        .gauge-fill.moderate {
            background: linear-gradient(90deg, #ffcc00, #ff9900);
            box-shadow: 0 0 10px #ffcc00;
        }
        
        .gauge-fill.poor {
            background: linear-gradient(90deg, #ff3366, #ff0000);
            box-shadow: 0 0 10px #ff3366;
        }
        
        .gauge-indicator {
            position: absolute;
            top: 50%;
            width: 4px;
            height: 16px;
            background-color: white;
            transform: translate(-50%, -50%);
            border-radius: 2px;
            transition: left 1s;
        }
        
        .energy-comparison {
            margin-bottom: 10px;
        }
        
        .comparison-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .comparison-slider {
            position: relative;
        }
        
        .slider-container {
            display: flex;
            transition: transform 0.5s;
            overflow: hidden;
        }
        
        .country-item {
            min-width: 100%;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transition: opacity 0.5s;
            display: none;
        }
        
        .country-item.active {
            opacity: 1;
            display: block;
        }
        
        .country-name {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--accent-color);
        }
        
        .country-mix {
            margin-bottom: 5px;
        }
        
        .mix-bar {
            height: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            margin-bottom: 5px;
        }
        
        .mix-renewable {
            height: 100%;
            background: linear-gradient(90deg, #00ff9d, #00ccff);
            box-shadow: 0 0 10px #00ff9d;
        }
        
        .mix-non-renewable {
            height: 100%;
            background: linear-gradient(90deg, #ff3366, #ff0000);
            box-shadow: 0 0 10px #ff3366;
        }
        
        .mix-labels {
            display: flex;
            justify-content: space-between;
        }
        
        .mix-label {
            font-size: 0.8rem;
        }
        
        .mix-label.renewable {
            color: #00ff9d;
        }
        
        .mix-label.non-renewable {
            color: #ff3366;
        }
        
        .slider-controls {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }
        
        .slider-prev, .slider-next {
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--text-color);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .slider-prev:hover, .slider-next:hover {
            background-color: rgba(0, 255, 157, 0.2);
            border-color: var(--primary-color);
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addEnergyMixStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initEnergyMixMonitor, 1000);
});
