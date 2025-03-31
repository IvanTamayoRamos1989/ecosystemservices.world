// Material Flow Analyzer Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the material flow data
let materialFlowData = {
    globalMaterialUse: 100, // Billion tonnes per year
    circularityRate: 8.6, // Percentage of materials that are recycled and reused
    materialCategories: {
        "Biomass": 24.9,
        "Fossil Fuels": 16.1,
        "Metals": 10.4,
        "Minerals": 48.6
    },
    wasteGeneration: 2.01, // Billion tonnes per year
    wasteDisposition: {
        "Landfill": 37,
        "Incineration": 19,
        "Recycling": 29,
        "Composting": 8,
        "Open Dumping": 7
    },
    materialLifecycles: {
        "Electronics": { lifespan: 4.7, recyclingRate: 17.4 },
        "Vehicles": { lifespan: 16.3, recyclingRate: 59.3 },
        "Packaging": { lifespan: 0.5, recyclingRate: 42.0 },
        "Construction": { lifespan: 35.7, recyclingRate: 35.0 },
        "Textiles": { lifespan: 5.4, recyclingRate: 13.0 },
        "Furniture": { lifespan: 15.1, recyclingRate: 10.5 }
    },
    resourceEfficiency: {
        "2000": 0.8,
        "2010": 0.9,
        "2020": 1.1,
        "Current": 1.2
    },
    circularInnovations: [
        { name: "Modular Design", impact: 8.3, sector: "Manufacturing" },
        { name: "Chemical Recycling", impact: 6.7, sector: "Plastics" },
        { name: "Urban Mining", impact: 7.5, sector: "Electronics" },
        { name: "Sharing Platforms", impact: 5.4, sector: "Consumer Goods" },
        { name: "Biobased Materials", impact: 6.9, sector: "Packaging" }
    ]
};

// Function to initialize the Material Flow Analyzer widget
function initMaterialFlowAnalyzer() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('material-flow-analyzer')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget medium" id="material-flow-analyzer">
                <div class="widget-header">
                    <h4>MATERIAL FLOW ANALYZER</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="material-flow">
                        <div class="material-main">
                            <div class="circularity-meter">
                                <svg viewBox="0 0 200 100" class="meter-svg">
                                    <path d="M20,90 A70,70 0 0,1 180,90" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="12" stroke-linecap="round" />
                                    <path d="M20,90 A70,70 0 0,1 180,90" fill="none" stroke="url(#circularGradient)" stroke-width="12" stroke-linecap="round" stroke-dasharray="226" stroke-dashoffset="${226 - (226 * materialFlowData.circularityRate / 100)}" class="meter-fill" />
                                    <defs>
                                        <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style="stop-color:#ff3366;stop-opacity:1" />
                                            <stop offset="50%" style="stop-color:#ffcc00;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#00ff9d;stop-opacity:1" />
                                        </linearGradient>
                                    </defs>
                                    <text x="100" y="85" text-anchor="middle" class="meter-value">${materialFlowData.circularityRate}%</text>
                                    <text x="100" y="65" text-anchor="middle" class="meter-label">GLOBAL CIRCULARITY</text>
                                </svg>
                            </div>
                            
                            <div class="material-stats">
                                <div class="stat-group">
                                    <div class="stat-value">${materialFlowData.globalMaterialUse}</div>
                                    <div class="stat-label">BILLION TONNES USED ANNUALLY</div>
                                </div>
                                <div class="stat-group">
                                    <div class="stat-value">${materialFlowData.wasteGeneration}</div>
                                    <div class="stat-label">BILLION TONNES WASTE GENERATED</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="material-sankey">
                            <div class="sankey-header">MATERIAL FLOW VISUALIZATION</div>
                            <div class="sankey-diagram">
                                <div class="sankey-column extraction">
                                    <div class="column-header">EXTRACTION</div>
                                    ${generateSankeyColumn('extraction', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-flows extraction-to-processing">
                                    ${generateSankeyFlows('extraction', 'processing', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-column processing">
                                    <div class="column-header">PROCESSING</div>
                                    ${generateSankeyColumn('processing', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-flows processing-to-use">
                                    ${generateSankeyFlows('processing', 'use', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-column use">
                                    <div class="column-header">USE</div>
                                    ${generateSankeyColumn('use', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-flows use-to-waste">
                                    ${generateSankeyFlows('use', 'waste', materialFlowData.materialCategories)}
                                </div>
                                <div class="sankey-column waste">
                                    <div class="column-header">END OF LIFE</div>
                                    ${generateSankeyColumn('waste', materialFlowData.wasteDisposition)}
                                </div>
                                <div class="sankey-recycling">
                                    <div class="recycling-flow"></div>
                                    <div class="recycling-label">RECYCLING LOOP</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="material-lifecycle">
                            <div class="lifecycle-header">PRODUCT LIFECYCLE ANALYSIS</div>
                            <div class="lifecycle-chart">
                                ${generateLifecycleChart()}
                            </div>
                        </div>
                        
                        <div class="material-innovations">
                            <div class="innovations-header">CIRCULAR ECONOMY INNOVATIONS</div>
                            <div class="innovations-list">
                                ${generateInnovationsList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Start the data simulation
        startMaterialFlowSimulation();
    }
}

// Function to generate a Sankey diagram column
function generateSankeyColumn(stage, data) {
    let columnHTML = '';
    const colors = {
        "Biomass": "#66cc00",
        "Fossil Fuels": "#666666",
        "Metals": "#cc99ff",
        "Minerals": "#00ccff",
        "Landfill": "#996633",
        "Incineration": "#ff6600",
        "Recycling": "#00ff9d",
        "Composting": "#99cc00",
        "Open Dumping": "#ff3366"
    };
    
    Object.entries(data).forEach(([category, percentage]) => {
        const height = percentage * 1.5; // Scale the height based on percentage
        const color = colors[category] || "#ffcc00";
        
        columnHTML += `
            <div class="sankey-node ${stage}-${category.toLowerCase().replace(/\s+/g, '-')}" 
                 style="height: ${height}px; background-color: ${color};" 
                 data-category="${category}" 
                 data-percentage="${percentage}">
                <div class="node-label">${category}</div>
                <div class="node-value">${percentage}%</div>
            </div>
        `;
    });
    
    return columnHTML;
}

// Function to generate Sankey flows between columns
function generateSankeyFlows(fromStage, toStage, data) {
    let flowsHTML = '';
    const totalPercentage = Object.values(data).reduce((sum, val) => sum + val, 0);
    
    Object.entries(data).forEach(([category, percentage]) => {
        const height = percentage * 1.5; // Scale the height based on percentage
        const topOffset = getNodeTopOffset(fromStage, category, data);
        
        flowsHTML += `
            <div class="sankey-flow ${fromStage}-to-${toStage}-${category.toLowerCase().replace(/\s+/g, '-')}"
                 style="height: ${height}px; top: ${topOffset}px;"
                 data-category="${category}">
            </div>
        `;
    });
    
    return flowsHTML;
}

// Helper function to calculate the top offset for a flow
function getNodeTopOffset(stage, category, data) {
    let offset = 0;
    let found = false;
    
    Object.entries(data).forEach(([cat, percentage]) => {
        if (cat === category) {
            found = true;
            return;
        }
        
        if (!found) {
            offset += percentage * 1.5;
        }
    });
    
    return offset + 30; // Add header height
}

// Function to generate the lifecycle chart
function generateLifecycleChart() {
    let chartHTML = '';
    
    Object.entries(materialFlowData.materialLifecycles).forEach(([product, data]) => {
        chartHTML += `
            <div class="lifecycle-item">
                <div class="lifecycle-product">${product}</div>
                <div class="lifecycle-bars">
                    <div class="lifespan-bar">
                        <div class="bar-label">Lifespan</div>
                        <div class="bar-container">
                            <div class="bar-fill lifespan" style="width: ${Math.min(100, data.lifespan * 2.5)}%">
                                <span class="bar-value">${data.lifespan} yrs</span>
                            </div>
                        </div>
                    </div>
                    <div class="recycling-bar">
                        <div class="bar-label">Recycling</div>
                        <div class="bar-container">
                            <div class="bar-fill recycling" style="width: ${data.recyclingRate}%">
                                <span class="bar-value">${data.recyclingRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return chartHTML;
}

// Function to generate the innovations list
function generateInnovationsList() {
    let innovationsHTML = '';
    
    materialFlowData.circularInnovations.forEach(innovation => {
        innovationsHTML += `
            <div class="innovation-item">
                <div class="innovation-info">
                    <div class="innovation-name">${innovation.name}</div>
                    <div class="innovation-sector">${innovation.sector}</div>
                </div>
                <div class="innovation-impact">
                    <div class="impact-label">IMPACT</div>
                    <div class="impact-meter">
                        <div class="impact-fill" style="width: ${innovation.impact * 10}%"></div>
                    </div>
                    <div class="impact-value">${innovation.impact}/10</div>
                </div>
            </div>
        `;
    });
    
    return innovationsHTML;
}

// Function to start the material flow simulation
function startMaterialFlowSimulation() {
    // Update the material flow data every 15 seconds
    setInterval(() => {
        // Simulate changes in circularity rate (slowly increasing)
        const circularityChange = (Math.random() * 0.2) - 0.05; // Bias towards increase
        materialFlowData.circularityRate = parseFloat((materialFlowData.circularityRate + circularityChange).toFixed(1));
        if (materialFlowData.circularityRate < 0) materialFlowData.circularityRate = 0;
        if (materialFlowData.circularityRate > 100) materialFlowData.circularityRate = 100;
        
        // Update the circularity meter
        const meterFill = document.querySelector('.meter-fill');
        const meterValue = document.querySelector('.meter-value');
        if (meterFill && meterValue) {
            meterFill.setAttribute('stroke-dashoffset', `${226 - (226 * materialFlowData.circularityRate / 100)}`);
            meterValue.textContent = `${materialFlowData.circularityRate}%`;
        }
        
        // Occasionally update material categories
        if (Math.random() > 0.8) {
            // Slightly adjust material category percentages
            let total = 0;
            Object.keys(materialFlowData.materialCategories).forEach(category => {
                const change = (Math.random() * 0.6) - 0.3;
                materialFlowData.materialCategories[category] = parseFloat((materialFlowData.materialCategories[category] + change).toFixed(1));
                if (materialFlowData.materialCategories[category] < 1) materialFlowData.materialCategories[category] = 1;
                total += materialFlowData.materialCategories[category];
            });
            
            // Normalize to ensure total is 100%
            Object.keys(materialFlowData.materialCategories).forEach(category => {
                materialFlowData.materialCategories[category] = parseFloat(((materialFlowData.materialCategories[category] / total) * 100).toFixed(1));
            });
            
            // Update the Sankey diagram
            updateSankeyDiagram();
        }
        
        // Occasionally update waste disposition
        if (Math.random() > 0.8) {
            // Adjust waste disposition percentages (trend towards more recycling/composting)
            let total = 0;
            Object.keys(materialFlowData.wasteDisposition).forEach(category => {
                let change = (Math.random() * 0.6) - 0.3;
                
                // Bias towards increasing recycling and composting
                if (category === "Recycling" || category === "Composting") {
                    change += 0.1;
                }
                // Bias towards decreasing landfill and open dumping
                if (category === "Landfill" || category === "Open Dumping") {
                    change -= 0.1;
                }
                
                materialFlowData.wasteDisposition[category] = parseFloat((materialFlowData.wasteDisposition[category] + change).toFixed(1));
                if (materialFlowData.wasteDisposition[category] < 1) materialFlowData.wasteDisposition[category] = 1;
                total += materialFlowData.wasteDisposition[category];
            });
            
            // Normalize to ensure total is 100%
            Object.keys(materialFlowData.wasteDisposition).forEach(category => {
                materialFlowData.wasteDisposition[category] = parseFloat(((materialFlowData.wasteDisposition[category] / total) * 100).toFixed(1));
            });
            
            // Update the Sankey diagram
            updateSankeyDiagram();
        }
        
        // Occasionally update lifecycle data
        if (Math.random() > 0.9) {
            Object.keys(materialFlowData.materialLifecycles).forEach(product => {
                // Slightly adjust lifespan (trend towards longer for some products)
                let lifespanChange = (Math.random() * 0.2) - 0.1;
                if (product === "Electronics" || product === "Packaging") {
                    lifespanChange += 0.05; // Bias towards increasing
                }
                materialFlowData.materialLifecycles[product].lifespan = parseFloat((materialFlowData.materialLifecycles[product].lifespan + lifespanChange).toFixed(1));
                if (materialFlowData.materialLifecycles[product].lifespan < 0.1) materialFlowData.materialLifecycles[product].lifespan = 0.1;
                
                // Adjust recycling rate (trend towards increasing)
                const recyclingChange = (Math.random() * 0.4) - 0.1; // Bias towards increasing
                materialFlowData.materialLifecycles[product].recyclingRate = parseFloat((materialFlowData.materialLifecycles[product].recyclingRate + recyclingChange).toFixed(1));
                if (materialFlowData.materialLifecycles[product].recyclingRate < 0) materialFlowData.materialLifecycles[product].recyclingRate = 0;
                if (materialFlowData.materialLifecycles[product].recyclingRate > 100) materialFlowData.materialLifecycles[product].recyclingRate = 100;
            });
            
            // Update the lifecycle chart
            document.querySelector('.lifecycle-chart').innerHTML = generateLifecycleChart();
        }
        
        // Occasionally update innovation impact scores
        if (Math.random() > 0.9) {
            materialFlowData.circularInnovations.forEach(innovation => {
                const impactChange = (Math.random() * 0.3) - 0.1; // Bias towards increasing
                innovation.impact = parseFloat((innovation.impact + impactChange).toFixed(1));
                if (innovation.impact < 1) innovation.impact = 1;
                if (innovation.impact > 10) innovation.impact = 10;
            });
            
            // Sort innovations by impact (highest first)
            materialFlowData.circularInnovations.sort((a, b) => b.impact - a.impact);
            
            // Update the innovations list
            document.querySelector('.innovations-list').innerHTML = generateInnovationsList();
        }
        
    }, 15000);
    
    // Animate the recycling flow continuously
    animateRecyclingFlow();
}

// Function to update the Sankey diagram
function updateSankeyDiagram() {
    // Update extraction column
    const extractionColumn = document.querySelector('.sankey-column.extraction');
    if (extractionColumn) {
        extractionColumn.innerHTML = `<div class="column-header">EXTRACTION</div>${generateSankeyColumn('extraction', materialFlowData.materialCategories)}`;
    }
    
    // Update processing column
    const processingColumn = document.querySelector('.sankey-column.processing');
    if (processingColumn) {
        processingColumn.innerHTML = `<div class="column-header">PROCESSING</div>${generateSankeyColumn('processing', materialFlowData.materialCategories)}`;
    }
    
    // Update use column
    const useColumn = document.querySelector('.sankey-column.use');
    if (useColumn) {
        useColumn.innerHTML = `<div class="column-header">USE</div>${generateSankeyColumn('use', materialFlowData.materialCategories)}`;
    }
    
    // Update waste column
    const wasteColumn = document.querySelector('.sankey-column.waste');
    if (wasteColumn) {
        wasteColumn.innerHTML = `<div class="column-header">END OF LIFE</div>${generateSankeyColumn('waste', materialFlowData.wasteDisposition)}`;
    }
    
    // Update flows
    const extractionToProcessing = document.querySelector('.sankey-flows.extraction-to-processing');
    if (extractionToProcessing) {
        extractionToProcessing.innerHTML = generateSankeyFlows('extraction', 'processing', materialFlowData.materialCategories);
    }
    
    const processingToUse = document.querySelector('.sankey-flows.processing-to-use');
    if (processingToUse) {
        processingToUse.innerHTML = generateSankeyFlows('processing', 'use', materialFlowData.materialCategories);
    }
    
    const useToWaste = document.querySelector('.sankey-flows.use-to-waste');
    if (useToWaste) {
        useToWaste.innerHTML = generateSankeyFlows('use', 'waste', materialFlowData.materialCategories);
    }
}

// Function to animate the recycling flow
function animateRecyclingFlow() {
    const recyclingFlow = document.querySelector('.recycling-flow');
    if (recyclingFlow) {
        // Set up the animation
        recyclingFlow.style.animation = 'flowAnimation 10s linear infinite';
    }
}

// Add CSS for the Material Flow Analyzer widget
function addMaterialFlowStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Material Flow Analyzer Styles */
        .material-flow {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .material-main {
            display: flex;
            margin-bottom: 20px;
        }
        
        .circularity-meter {
            width: 200px;
            flex-shrink: 0;
        }
        
        .meter-svg {
            width: 100%;
            height: auto;
        }
        
        .meter-fill {
            transition: stroke-dashoffset 1s;
        }
        
        .meter-value {
            font-size: 24px;
            fill: var(--text-color);
            font-weight: 700;
        }
        
        .meter-label {
            font-size: 10px;
            fill: rgba(224, 224, 224, 0.6);
        }
        
        .material-stats {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 20px;
        }
        
        .stat-group {
            margin-bottom: 15px;
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
        }
        
        .material-sankey {
            margin-bottom: 20px;
        }
        
        .sankey-header, .lifecycle-header, .innovations-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .sankey-diagram {
            height: 180px;
            display: flex;
            position: relative;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .sankey-column {
            width: 80px;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .column-header {
            font-size: 0.7rem;
            text-align: center;
            margin-bottom: 10px;
            color: rgba(224, 224, 224, 0.8);
            font-weight: 600;
        }
        
        .sankey-node {
            margin: 2px 0;
            border-radius: 2px;
            position: relative;
            transition: height 1s, background-color 1s;
        }
        
        .node-label {
            position: absolute;
            font-size: 0.6rem;
            left: 5px;
            top: 2px;
            white-space: nowrap;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        .node-value {
            position: absolute;
            font-size: 0.6rem;
            right: 5px;
            bottom: 2px;
            font-weight: 600;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        .sankey-flows {
            flex: 1;
            position: relative;
        }
        
        .sankey-flow {
            position: absolute;
            left: 0;
            width: 100%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
            transition: height 1s, top 1s;
        }
        
        .sankey-recycling {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 100%;
            height: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .recycling-flow {
            width: 80%;
            height: 8px;
            background: linear-gradient(90deg, transparent, #00ff9d, transparent);
            border-radius: 4px;
            position: relative;
        }
        
        @keyframes flowAnimation {
            0% {
                background-position: -200px 0;
            }
            100% {
                background-position: 200px 0;
            }
        }
        
        .recycling-label {
            font-size: 0.7rem;
            color: #00ff9d;
            margin-top: 5px;
        }
        
        .material-lifecycle {
            margin-bottom: 20px;
        }
        
        .lifecycle-chart {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .lifecycle-item {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .lifecycle-product {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .lifecycle-bars {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .lifespan-bar, .recycling-bar {
            display: flex;
            align-items: center;
        }
        
        .bar-label {
            width: 70px;
            font-size: 0.8rem;
            white-space: nowrap;
        }
        
        .bar-container {
            flex: 1;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        
        .bar-fill {
            height: 100%;
            position: relative;
            transition: width 1s;
        }
        
        .bar-fill.lifespan {
            background: linear-gradient(90deg, #ffcc00, #ff9900);
            box-shadow: 0 0 5px #ffcc00;
        }
        
        .bar-fill.recycling {
            background: linear-gradient(90deg, #00ff9d, #00ccff);
            box-shadow: 0 0 5px #00ff9d;
        }
        
        .bar-value {
            position: absolute;
            right: 5px;
            top: -7px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        .material-innovations {
            margin-bottom: 10px;
        }
        
        .innovations-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 10px;
        }
        
        .innovation-item {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: space-between;
        }
        
        .innovation-info {
            flex: 1;
        }
        
        .innovation-name {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .innovation-sector {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
        }
        
        .innovation-impact {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 100px;
        }
        
        .impact-label {
            font-size: 0.7rem;
            color: rgba(224, 224, 224, 0.6);
            margin-bottom: 5px;
        }
        
        .impact-meter {
            width: 100%;
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 5px;
        }
        
        .impact-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff9d, #00ccff);
            box-shadow: 0 0 5px #00ff9d;
            transition: width 1s;
        }
        
        .impact-value {
            font-size: 0.8rem;
            font-weight: 600;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addMaterialFlowStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initMaterialFlowAnalyzer, 1000);
});
