// Spiky City Diagrams Widget
// Based on Richard Florida's model for the EcosystemServices.world platform

// Initialize the spiky city data
let spikyCityData = {
    // Major global innovation hubs with their metrics
    cities: [
        {
            name: "San Francisco",
            region: "North America",
            innovationIndex: 92.7,
            talentConcentration: 88.5,
            techDensity: 94.3,
            creativityScore: 90.1,
            sustainabilityRating: 76.4,
            coordinates: { x: 0.15, y: 0.38 }
        },
        {
            name: "New York",
            region: "North America",
            innovationIndex: 89.3,
            talentConcentration: 90.2,
            techDensity: 85.7,
            creativityScore: 91.5,
            sustainabilityRating: 72.8,
            coordinates: { x: 0.22, y: 0.36 }
        },
        {
            name: "London",
            region: "Europe",
            innovationIndex: 88.9,
            talentConcentration: 89.7,
            techDensity: 83.2,
            creativityScore: 92.3,
            sustainabilityRating: 78.1,
            coordinates: { x: 0.45, y: 0.29 }
        },
        {
            name: "Tokyo",
            region: "Asia",
            innovationIndex: 87.6,
            talentConcentration: 86.9,
            techDensity: 90.5,
            creativityScore: 84.7,
            sustainabilityRating: 81.3,
            coordinates: { x: 0.82, y: 0.38 }
        },
        {
            name: "Singapore",
            region: "Asia",
            innovationIndex: 86.8,
            talentConcentration: 85.3,
            techDensity: 88.9,
            creativityScore: 83.2,
            sustainabilityRating: 85.7,
            coordinates: { x: 0.74, y: 0.55 }
        },
        {
            name: "Berlin",
            region: "Europe",
            innovationIndex: 84.5,
            talentConcentration: 86.1,
            techDensity: 82.3,
            creativityScore: 89.7,
            sustainabilityRating: 83.9,
            coordinates: { x: 0.49, y: 0.30 }
        },
        {
            name: "Shanghai",
            region: "Asia",
            innovationIndex: 83.9,
            talentConcentration: 82.7,
            techDensity: 87.4,
            creativityScore: 80.5,
            sustainabilityRating: 70.2,
            coordinates: { x: 0.78, y: 0.42 }
        },
        {
            name: "Tel Aviv",
            region: "Middle East",
            innovationIndex: 83.2,
            talentConcentration: 84.9,
            techDensity: 86.7,
            creativityScore: 85.3,
            sustainabilityRating: 72.5,
            coordinates: { x: 0.55, y: 0.42 }
        },
        {
            name: "Seoul",
            region: "Asia",
            innovationIndex: 82.7,
            talentConcentration: 83.5,
            techDensity: 89.2,
            creativityScore: 81.9,
            sustainabilityRating: 79.8,
            coordinates: { x: 0.80, y: 0.36 }
        },
        {
            name: "Toronto",
            region: "North America",
            innovationIndex: 82.1,
            talentConcentration: 85.7,
            techDensity: 81.3,
            creativityScore: 86.4,
            sustainabilityRating: 80.7,
            coordinates: { x: 0.20, y: 0.32 }
        },
        {
            name: "Amsterdam",
            region: "Europe",
            innovationIndex: 81.8,
            talentConcentration: 84.2,
            techDensity: 80.7,
            creativityScore: 87.9,
            sustainabilityRating: 86.3,
            coordinates: { x: 0.47, y: 0.28 }
        },
        {
            name: "Stockholm",
            region: "Europe",
            innovationIndex: 81.5,
            talentConcentration: 83.9,
            techDensity: 82.1,
            creativityScore: 85.7,
            sustainabilityRating: 89.4,
            coordinates: { x: 0.50, y: 0.22 }
        },
        {
            name: "Bangalore",
            region: "Asia",
            innovationIndex: 80.9,
            talentConcentration: 82.3,
            techDensity: 85.1,
            creativityScore: 79.8,
            sustainabilityRating: 68.7,
            coordinates: { x: 0.68, y: 0.52 }
        },
        {
            name: "Sydney",
            region: "Oceania",
            innovationIndex: 80.2,
            talentConcentration: 83.1,
            techDensity: 79.5,
            creativityScore: 84.3,
            sustainabilityRating: 77.9,
            coordinates: { x: 0.87, y: 0.70 }
        },
        {
            name: "Austin",
            region: "North America",
            innovationIndex: 79.8,
            talentConcentration: 81.7,
            techDensity: 84.3,
            creativityScore: 86.9,
            sustainabilityRating: 75.2,
            coordinates: { x: 0.16, y: 0.40 }
        }
    ],
    // Global metrics for the 3Ts of economic development
    globalMetrics: {
        talent: {
            globalAverage: 68.3,
            topPerformer: "New York",
            growthRate: 2.7,
            keyIndicators: ["Education Level", "Workforce Skills", "Creative Class %"]
        },
        technology: {
            globalAverage: 65.9,
            topPerformer: "San Francisco",
            growthRate: 4.2,
            keyIndicators: ["R&D Investment", "Patent Generation", "Tech Company Density"]
        },
        tolerance: {
            globalAverage: 71.4,
            topPerformer: "Amsterdam",
            growthRate: 1.8,
            keyIndicators: ["Diversity Index", "Inclusion Metrics", "Foreign-Born Population"]
        }
    },
    // Trends in urban development
    urbanTrends: [
        {
            name: "Remote Work Hubs",
            growth: 15.7,
            leadingCities: ["Lisbon", "Miami", "Bali"],
            impact: "Redistributing talent from traditional centers"
        },
        {
            name: "15-Minute Cities",
            growth: 12.3,
            leadingCities: ["Paris", "Barcelona", "Melbourne"],
            impact: "Reducing emissions while improving quality of life"
        },
        {
            name: "Innovation Districts",
            growth: 9.8,
            leadingCities: ["Boston", "Seoul", "Munich"],
            impact: "Concentrating creative capital in urban cores"
        },
        {
            name: "Smart Eco-Cities",
            growth: 18.2,
            leadingCities: ["Copenhagen", "Singapore", "Vancouver"],
            impact: "Integrating technology with sustainability"
        }
    ]
};

// Function to initialize the Spiky City Diagrams widget
function initSpikyCityDiagrams() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('spiky-city-diagrams')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
        <div class="widget large" id="spiky-city-diagrams">
            <div class="widget-header">
                <h4>GLOBAL INNOVATION GEOGRAPHY</h4>
                <div class="widget-controls">
                    <button class="expand-btn">+</button>
                    <button class="info-btn">i</button>
                </div>
            </div>
            <div class="widget-content">
                <div class="spiky-city-container">
                    <div class="spiky-city-intro">
                        <h3>SPIKY CITY MODEL</h3>
                        <p>Based on Richard Florida's economic geography theory visualizing the concentration of innovation, talent, and creative capital across global urban centers.</p>
                    </div>
                    
                    <div class="spiky-map-container">
                        <div class="world-map-base">
                            <div class="map-overlay"></div>
                            <div id="city-spikes-container"></div>
                        </div>
                        <div class="map-legend">
                            <div class="legend-item">
                                <div class="legend-color high"></div>
                                <div class="legend-label">High Innovation Density</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color medium"></div>
                                <div class="legend-label">Medium Innovation Density</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color low"></div>
                                <div class="legend-label">Emerging Innovation Center</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="metrics-container">
                        <div class="metrics-header">
                            <h3>THE 3Ts OF ECONOMIC DEVELOPMENT</h3>
                            <p>Richard Florida's framework measuring urban economic potential</p>
                        </div>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <div class="metric-icon">T</div>
                                <div class="metric-title">TALENT</div>
                                <div class="metric-value">${spikyCityData.globalMetrics.talent.globalAverage}%</div>
                                <div class="metric-description">Global average talent concentration</div>
                                <div class="metric-leader">
                                    <span class="leader-label">Leader:</span>
                                    <span class="leader-value">${spikyCityData.globalMetrics.talent.topPerformer}</span>
                                </div>
                                <div class="metric-growth">
                                    <span class="growth-arrow">↑</span>
                                    <span class="growth-value">${spikyCityData.globalMetrics.talent.growthRate}%</span>
                                    <span class="growth-label">Annual Growth</span>
                                </div>
                            </div>
                            
                            <div class="metric-card">
                                <div class="metric-icon">T</div>
                                <div class="metric-title">TECHNOLOGY</div>
                                <div class="metric-value">${spikyCityData.globalMetrics.technology.globalAverage}%</div>
                                <div class="metric-description">Global average technology index</div>
                                <div class="metric-leader">
                                    <span class="leader-label">Leader:</span>
                                    <span class="leader-value">${spikyCityData.globalMetrics.technology.topPerformer}</span>
                                </div>
                                <div class="metric-growth">
                                    <span class="growth-arrow">↑</span>
                                    <span class="growth-value">${spikyCityData.globalMetrics.technology.growthRate}%</span>
                                    <span class="growth-label">Annual Growth</span>
                                </div>
                            </div>
                            
                            <div class="metric-card">
                                <div class="metric-icon">T</div>
                                <div class="metric-title">TOLERANCE</div>
                                <div class="metric-value">${spikyCityData.globalMetrics.tolerance.globalAverage}%</div>
                                <div class="metric-description">Global average tolerance index</div>
                                <div class="metric-leader">
                                    <span class="leader-label">Leader:</span>
                                    <span class="leader-value">${spikyCityData.globalMetrics.tolerance.topPerformer}</span>
                                </div>
                                <div class="metric-growth">
                                    <span class="growth-arrow">↑</span>
                                    <span class="growth-value">${spikyCityData.globalMetrics.tolerance.growthRate}%</span>
                                    <span class="growth-label">Annual Growth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="city-rankings">
                        <div class="rankings-header">
                            <h3>TOP INNOVATION CENTERS</h3>
                            <div class="rankings-controls">
                                <button class="ranking-filter active" data-filter="innovationIndex">Innovation</button>
                                <button class="ranking-filter" data-filter="sustainabilityRating">Sustainability</button>
                                <button class="ranking-filter" data-filter="creativityScore">Creativity</button>
                            </div>
                        </div>
                        <div class="rankings-table-container">
                            <table class="rankings-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>City</th>
                                        <th>Region</th>
                                        <th>Score</th>
                                        <th>Trend</th>
                                    </tr>
                                </thead>
                                <tbody id="city-rankings-body">
                                    <!-- City rankings will be dynamically inserted here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="urban-trends">
                        <h3>EMERGING URBAN TRENDS</h3>
                        <div class="trends-container">
                            ${generateTrendsHTML()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Add spiky city-specific styles
        addSpikyCityStyles();
        
        // Initialize the spiky city visualization
        initializeSpikyCityVisualization();
        
        // Initialize the city rankings
        updateCityRankings('innovationIndex');
        
        // Add event listeners for ranking filters
        document.querySelectorAll('.ranking-filter').forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.ranking-filter').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Update rankings based on selected filter
                const filter = e.target.getAttribute('data-filter');
                updateCityRankings(filter);
            });
        });
    }
}

// Function to generate HTML for urban trends
function generateTrendsHTML() {
    let trendsHTML = '';
    
    spikyCityData.urbanTrends.forEach(trend => {
        trendsHTML += `
        <div class="trend-card">
            <div class="trend-header">
                <div class="trend-name">${trend.name}</div>
                <div class="trend-growth">+${trend.growth}%</div>
            </div>
            <div class="trend-cities">
                ${trend.leadingCities.map(city => `<span class="trend-city">${city}</span>`).join('')}
            </div>
            <div class="trend-impact">${trend.impact}</div>
        </div>
        `;
    });
    
    return trendsHTML;
}

// Function to initialize the spiky city visualization
function initializeSpikyCityVisualization() {
    const container = document.getElementById('city-spikes-container');
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create spikes for each city
    spikyCityData.cities.forEach(city => {
        // Calculate spike height based on innovation index (0-100 scale)
        const spikeHeight = city.innovationIndex * 1.5; // Scale factor for visual appeal
        
        // Create the spike element
        const spike = document.createElement('div');
        spike.className = 'city-spike';
        spike.style.left = `${city.coordinates.x * 100}%`;
        spike.style.top = `${city.coordinates.y * 100}%`;
        spike.style.height = `${spikeHeight}px`;
        
        // Determine spike color based on innovation index
        let spikeColor;
        if (city.innovationIndex >= 85) {
            spikeColor = 'var(--primary-color)';
        } else if (city.innovationIndex >= 80) {
            spikeColor = '#ffcc00';
        } else {
            spikeColor = '#ff3366';
        }
        
        spike.style.backgroundColor = spikeColor;
        
        // Create city label
        const cityLabel = document.createElement('div');
        cityLabel.className = 'city-label';
        cityLabel.textContent = city.name;
        
        // Add tooltip with city data
        const tooltip = document.createElement('div');
        tooltip.className = 'city-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">${city.name}</div>
            <div class="tooltip-region">${city.region}</div>
            <div class="tooltip-stat">Innovation: ${city.innovationIndex}</div>
            <div class="tooltip-stat">Talent: ${city.talentConcentration}</div>
            <div class="tooltip-stat">Technology: ${city.techDensity}</div>
            <div class="tooltip-stat">Creativity: ${city.creativityScore}</div>
            <div class="tooltip-stat">Sustainability: ${city.sustainabilityRating}</div>
        `;
        
        // Add hover effect
        spike.addEventListener('mouseenter', () => {
            spike.classList.add('spike-hover');
            tooltip.style.display = 'block';
        });
        
        spike.addEventListener('mouseleave', () => {
            spike.classList.remove('spike-hover');
            tooltip.style.display = 'none';
        });
        
        // Append elements
        spike.appendChild(cityLabel);
        spike.appendChild(tooltip);
        container.appendChild(spike);
    });
}

// Function to update city rankings based on selected filter
function updateCityRankings(filterProperty) {
    const rankingsBody = document.getElementById('city-rankings-body');
    
    // Sort cities by the selected property
    const sortedCities = [...spikyCityData.cities].sort((a, b) => b[filterProperty] - a[filterProperty]);
    
    // Clear existing rankings
    rankingsBody.innerHTML = '';
    
    // Add sorted cities to the table
    sortedCities.forEach((city, index) => {
        const row = document.createElement('tr');
        
        // Generate random trend indicator (for demonstration purposes)
        const trends = ['↑', '↓', '→'];
        const trendClasses = ['trend-up', 'trend-down', 'trend-stable'];
        const randomTrendIndex = Math.floor(Math.random() * 3);
        
        row.innerHTML = `
            <td class="rank-cell">${index + 1}</td>
            <td class="city-cell">${city.name}</td>
            <td class="region-cell">${city.region}</td>
            <td class="score-cell">${city[filterProperty].toFixed(1)}</td>
            <td class="trend-cell ${trendClasses[randomTrendIndex]}">${trends[randomTrendIndex]}</td>
        `;
        
        rankingsBody.appendChild(row);
    });
}

// Function to add spiky city-specific styles
function addSpikyCityStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Spiky City Diagrams Styles */
    .spiky-city-container {
        padding: 20px;
        color: var(--text-color);
        font-family: var(--body-font);
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .spiky-city-intro {
        text-align: center;
        margin-bottom: 10px;
    }
    
    .spiky-city-intro h3 {
        font-size: 1.4rem;
        color: var(--primary-color);
        margin: 0 0 10px 0;
        font-family: var(--header-font);
    }
    
    .spiky-city-intro p {
        font-size: 0.9rem;
        color: rgba(255,255,255,0.8);
        max-width: 800px;
        margin: 0 auto;
    }
    
    .spiky-map-container {
        position: relative;
        width: 100%;
        height: 300px;
        margin: 20px 0;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.1);
    }
    
    .world-map-base {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMCwzMCBMMjAsNDAgTDMwLDM1IEw0MCw0NSBMNTAsNDAgTDYwLDUwIEw3MCw0NSBMODAsNTUgTDkwLDUwIiBzdHJva2U9InJnYmEoMCwyNTUsMTU3LDAuMikiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiAvPjwvc3ZnPg==');
        background-size: cover;
    }
    
    .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
    }
    
    #city-spikes-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .city-spike {
        position: absolute;
        width: 4px;
        background-color: var(--primary-color);
        transform: translate(-50%, -100%);
        transform-origin: bottom center;
        transition: all 0.3s ease;
        cursor: pointer;
        z-index: 2;
    }
    
    .city-spike::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        background-color: inherit;
        border-radius: 50%;
    }
    
    .city-spike.spike-hover {
        width: 6px;
        box-shadow: 0 0 15px currentColor;
        z-index: 3;
    }
    
    .city-label {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.7rem;
        white-space: nowrap;
        color: rgba(255,255,255,0.8);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .spike-hover .city-label {
        opacity: 1;
    }
    
    .city-tooltip {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0,0,0,0.8);
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        padding: 10px;
        width: 180px;
        display: none;
        z-index: 10;
        pointer-events: none;
    }
    
    .tooltip-header {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 5px;
    }
    
    .tooltip-region {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        margin-bottom: 8px;
    }
    
    .tooltip-stat {
        font-size: 0.75rem;
        color: rgba(255,255,255,0.9);
        margin-bottom: 3px;
    }
    
    .map-legend {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0,0,0,0.7);
        border-radius: 4px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    
    .legend-color.high {
        background-color: var(--primary-color);
    }
    
    .legend-color.medium {
        background-color: #ffcc00;
    }
    
    .legend-color.low {
        background-color: #ff3366;
    }
    
    .legend-label {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.8);
    }
    
    .metrics-container {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 20px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .metrics-header {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .metrics-header h3 {
        font-size: 1.2rem;
        color: var(--primary-color);
        margin: 0 0 5px 0;
        font-family: var(--header-font);
    }
    
    .metrics-header p {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        margin: 0;
    }
    
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .metric-card {
        background-color: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s ease;
    }
    
    .metric-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border-color: var(--primary-color);
    }
    
    .metric-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: rgba(0,0,0,0.7);
        margin-bottom: 10px;
    }
    
    .metric-title {
        font-size: 1rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .metric-value {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--text-color);
        margin-bottom: 5px;
    }
    
    .metric-description {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        margin-bottom: 15px;
    }
    
    .metric-leader {
        font-size: 0.8rem;
        margin-bottom: 10px;
    }
    
    .leader-label {
        color: rgba(255,255,255,0.6);
    }
    
    .leader-value {
        color: var(--text-color);
        font-weight: bold;
    }
    
    .metric-growth {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.8rem;
    }
    
    .growth-arrow {
        color: var(--primary-color);
    }
    
    .growth-value {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .growth-label {
        color: rgba(255,255,255,0.6);
    }
    
    .city-rankings {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 20px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .rankings-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .rankings-header h3 {
        font-size: 1.2rem;
        color: var(--primary-color);
        margin: 0;
        font-family: var(--header-font);
    }
    
    .rankings-controls {
        display: flex;
        gap: 10px;
    }
    
    .ranking-filter {
        background-color: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--text-color);
        padding: 5px 10px;
        font-size: 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .ranking-filter.active {
        background-color: rgba(0,255,157,0.1);
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    
    .rankings-table-container {
        max-height: 300px;
        overflow-y: auto;
    }
    
    .rankings-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .rankings-table th,
    .rankings-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .rankings-table th {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        font-weight: normal;
        position: sticky;
        top: 0;
        background-color: rgba(0,0,0,0.4);
        z-index: 1;
    }
    
    .rankings-table td {
        font-size: 0.9rem;
        color: var(--text-color);
    }
    
    .rank-cell {
        font-weight: bold;
        width: 50px;
    }
    
    .city-cell {
        font-weight: bold;
    }
    
    .score-cell {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .trend-cell {
        text-align: center;
        font-weight: bold;
    }
    
    .trend-up {
        color: var(--primary-color);
    }
    
    .trend-down {
        color: #ff3366;
    }
    
    .trend-stable {
        color: #ffcc00;
    }
    
    .urban-trends {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 20px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    
    .urban-trends h3 {
        font-size: 1.2rem;
        color: var(--primary-color);
        margin: 0 0 15px 0;
        font-family: var(--header-font);
        text-align: center;
    }
    
    .trends-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 15px;
    }
    
    .trend-card {
        background-color: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s ease;
    }
    
    .trend-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border-color: var(--primary-color);
    }
    
    .trend-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .trend-name {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--text-color);
    }
    
    .trend-growth {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .trend-cities {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 10px;
    }
    
    .trend-city {
        font-size: 0.8rem;
        padding: 3px 8px;
        background-color: rgba(0,255,157,0.1);
        border-radius: 12px;
        color: var(--primary-color);
    }
    
    .trend-impact {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        font-style: italic;
    }
    
    @media (max-width: 768px) {
        .metrics-grid {
            grid-template-columns: 1fr;
        }
        
        .rankings-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
        
        .trends-container {
            grid-template-columns: 1fr;
        }
    }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the Spiky City Diagrams widget when the dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if dashboard is already loaded
    if (document.querySelector('.dashboard-grid')) {
        initSpikyCityDiagrams();
    } else {
        // Wait for dashboard to be initialized
        document.addEventListener('dashboard:initialized', initSpikyCityDiagrams);
    }
});

// Also listen for dashboard refresh events to reinitialize if needed
document.addEventListener('dashboard:refresh', () => {
    // Reinitialize only if the widget doesn't exist
    if (!document.getElementById('spiky-city-diagrams')) {
        initSpikyCityDiagrams();
    }
});
