// Global Market Monitor Widget - Based on Richard Florida's "Spiky World" visualization style
// This widget shows world stock market data with sustainability indices and ESG investments

// Initialize the widget when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the Global Market Monitor widget container
    const dashboardSection = document.querySelector('.dashboard');
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'widget large';
    widgetContainer.id = 'global-market-widget';
    
    // Add widget header
    widgetContainer.innerHTML = `
        <div class="widget-header">
            <h4>GLOBAL MARKET MONITOR</h4>
            <div class="widget-controls">
                <button class="expand-btn">+</button>
                <button class="info-btn">i</button>
            </div>
        </div>
        <div class="widget-content">
            <div class="global-market">
                <div class="market-overview">
                    <div class="market-metrics">
                        <div class="metric">
                            <div class="metric-label">ESG GLOBAL INDEX</div>
                            <div class="metric-value up">
                                <span id="esg-index">1,247.38</span>
                                <span class="change">+2.4%</span>
                            </div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">SUSTAINABILITY FUND FLOWS</div>
                            <div class="metric-value up">
                                <span id="sustainability-flows">$8.7B</span>
                                <span class="change">+1.2%</span>
                            </div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">CARBON CREDIT PRICE</div>
                            <div class="metric-value up">
                                <span id="carbon-price">$87.25</span>
                                <span class="change">+3.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="market-visualization">
                    <h5>GLOBAL MARKET ACTIVITY</h5>
                    <div class="spiky-world-container">
                        <canvas id="marketMapCanvas" width="600" height="300"></canvas>
                    </div>
                </div>
                
                <div class="market-indices">
                    <div class="indices-header">
                        <div class="index-name">INDEX</div>
                        <div class="index-value">VALUE</div>
                        <div class="index-change">CHANGE</div>
                        <div class="index-esg">ESG RATING</div>
                    </div>
                    <div class="indices-list" id="indices-list">
                        <!-- Indices will be dynamically populated -->
                    </div>
                </div>
                
                <div class="market-trends">
                    <h5>SUSTAINABILITY INVESTMENT TRENDS</h5>
                    <div class="trends-container">
                        <div class="trend-item">
                            <div class="trend-icon renewable"></div>
                            <div class="trend-info">
                                <div class="trend-name">RENEWABLE ENERGY</div>
                                <div class="trend-value up">+18.7%</div>
                            </div>
                        </div>
                        <div class="trend-item">
                            <div class="trend-icon circular"></div>
                            <div class="trend-info">
                                <div class="trend-name">CIRCULAR ECONOMY</div>
                                <div class="trend-value up">+12.3%</div>
                            </div>
                        </div>
                        <div class="trend-item">
                            <div class="trend-icon water"></div>
                            <div class="trend-info">
                                <div class="trend-name">WATER MANAGEMENT</div>
                                <div class="trend-value up">+9.5%</div>
                            </div>
                        </div>
                        <div class="trend-item">
                            <div class="trend-icon biodiversity"></div>
                            <div class="trend-info">
                                <div class="trend-name">BIODIVERSITY</div>
                                <div class="trend-value up">+7.2%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add the widget to the dashboard
    dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
    
    // Initialize the Spiky World market map
    initMarketMap();
    
    // Populate market indices
    populateMarketIndices();
    
    // Start updating market data
    updateMarketData();
});

// Initialize the Spiky World market map using canvas
function initMarketMap() {
    const canvas = document.getElementById('marketMapCanvas');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    
    // Draw world map background (simplified)
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#2a2a4a';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Define market activity hotspots (x, y, height, color, pulse)
    const hotspots = [
        // New York
        {x: 150, y: 120, height: 100, color: '#00ff9d', pulse: true},
        // London
        {x: 280, y: 100, height: 90, color: '#00ff9d', pulse: true},
        // Tokyo
        {x: 500, y: 130, height: 85, color: '#00ff9d', pulse: true},
        // Shanghai
        {x: 480, y: 150, height: 80, color: '#00ff9d', pulse: true},
        // Frankfurt
        {x: 300, y: 110, height: 70, color: '#00ff9d', pulse: false},
        // Hong Kong
        {x: 470, y: 160, height: 75, color: '#00ff9d', pulse: false},
        // Mumbai
        {x: 400, y: 170, height: 60, color: '#00ff9d', pulse: false},
        // Sydney
        {x: 520, y: 220, height: 50, color: '#00ff9d', pulse: false},
        // São Paulo
        {x: 200, y: 200, height: 55, color: '#00ff9d', pulse: false},
        // Toronto
        {x: 170, y: 110, height: 45, color: '#00ff9d', pulse: false},
        // Singapore
        {x: 450, y: 180, height: 65, color: '#00ff9d', pulse: false},
        // Dubai
        {x: 360, y: 160, height: 40, color: '#00ff9d', pulse: false},
        // Johannesburg
        {x: 320, y: 210, height: 35, color: '#00ff9d', pulse: false}
    ];
    
    // Draw the spikes for each hotspot
    hotspots.forEach(spot => {
        // Draw the spike
        const gradient = ctx.createLinearGradient(spot.x, spot.y, spot.x, spot.y - spot.height);
        gradient.addColorStop(0, spot.color);
        gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
        
        ctx.fillStyle = gradient;
        
        // Draw a spike shape
        ctx.beginPath();
        ctx.moveTo(spot.x - 5, spot.y);
        ctx.lineTo(spot.x, spot.y - spot.height);
        ctx.lineTo(spot.x + 5, spot.y);
        ctx.closePath();
        ctx.fill();
        
        // Add a glow effect
        if (spot.pulse) {
            ctx.shadowColor = spot.color;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(spot.x, spot.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            ctx.beginPath();
            ctx.arc(spot.x, spot.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    // Add pulsing effect to major financial centers
    animatePulsingCenters(ctx, hotspots.filter(spot => spot.pulse));
}

// Animate pulsing effect for major financial centers
function animatePulsingCenters(ctx, pulsingSpots) {
    let pulseSize = 0;
    let growing = true;
    
    setInterval(() => {
        // Clear previous pulse rings
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Redraw the map (simplified version)
        initMarketMap();
        
        // Draw pulse rings around major centers
        pulsingSpots.forEach(spot => {
            ctx.strokeStyle = spot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(spot.x, spot.y, 5 + pulseSize, 0, Math.PI * 2);
            ctx.stroke();
            
            if (pulseSize > 0) {
                ctx.strokeStyle = `rgba(0, 255, 157, ${0.7 - pulseSize/20})`;
                ctx.beginPath();
                ctx.arc(spot.x, spot.y, 5 + pulseSize * 1.5, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        
        // Update pulse size
        if (growing) {
            pulseSize += 0.5;
            if (pulseSize >= 10) growing = false;
        } else {
            pulseSize -= 0.5;
            if (pulseSize <= 0) growing = true;
        }
    }, 100);
}

// Populate market indices data
function populateMarketIndices() {
    const indices = [
        {name: 'S&P ESG INDEX', value: '4,892.37', change: '+1.2%', esg: 'AAA'},
        {name: 'MSCI WORLD SRI', value: '3,127.85', change: '+0.8%', esg: 'AA'},
        {name: 'FTSE4GOOD GLOBAL', value: '7,245.19', change: '+1.5%', esg: 'AAA'},
        {name: 'DOW JONES SUST.', value: '32,781.45', change: '+0.6%', esg: 'A'},
        {name: 'NASDAQ GREEN ECON.', value: '15,872.63', change: '+2.1%', esg: 'AA'}
    ];
    
    const indicesList = document.getElementById('indices-list');
    
    indices.forEach(index => {
        const isUp = index.change.startsWith('+');
        const indexItem = document.createElement('div');
        indexItem.className = 'index-item';
        indexItem.innerHTML = `
            <div class="index-name">${index.name}</div>
            <div class="index-value">${index.value}</div>
            <div class="index-change ${isUp ? 'up' : 'down'}">${index.change}</div>
            <div class="index-esg">${index.esg}</div>
        `;
        indicesList.appendChild(indexItem);
    });
}

// Update market data with random fluctuations
function updateMarketData() {
    // Helper function to generate random fluctuation
    function randomFluctuation(base, range) {
        return (Math.random() * range * 2 - range) + base;
    }
    
    // Update ESG index
    let esgValue = 1247.38;
    setInterval(() => {
        esgValue += randomFluctuation(0, 0.5);
        document.getElementById('esg-index').textContent = esgValue.toFixed(2);
    }, 5000);
    
    // Update sustainability flows
    let flowsValue = 8.7;
    setInterval(() => {
        flowsValue += randomFluctuation(0, 0.1);
        document.getElementById('sustainability-flows').textContent = `$${flowsValue.toFixed(1)}B`;
    }, 7000);
    
    // Update carbon price
    let carbonPrice = 87.25;
    setInterval(() => {
        carbonPrice += randomFluctuation(0, 0.3);
        document.getElementById('carbon-price').textContent = `$${carbonPrice.toFixed(2)}`;
    }, 3000);
}

// Add CSS for the Global Market Monitor widget
const globalMarketStyles = document.createElement('style');
globalMarketStyles.textContent = `
    .global-market {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--text-color);
    }
    
    .market-overview {
        margin-bottom: 15px;
    }
    
    .market-metrics {
        display: flex;
        justify-content: space-between;
    }
    
    .metric {
        text-align: center;
        width: 30%;
    }
    
    .metric-label {
        font-size: 0.7rem;
        color: #888;
        margin-bottom: 5px;
    }
    
    .metric-value {
        font-size: 1.2rem;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .metric-value.up {
        color: #00ff9d;
    }
    
    .metric-value.down {
        color: #ff3860;
    }
    
    .change {
        font-size: 0.8rem;
        font-weight: normal;
    }
    
    .market-visualization {
        margin-bottom: 15px;
    }
    
    .market-visualization h5 {
        font-size: 0.9rem;
        margin-bottom: 5px;
        color: #ccc;
    }
    
    .spiky-world-container {
        width: 100%;
        height: 150px;
        overflow: hidden;
        border: 1px solid #333;
    }
    
    .market-indices {
        margin-bottom: 15px;
    }
    
    .indices-header {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        border-bottom: 1px solid #333;
        font-size: 0.7rem;
        color: #888;
    }
    
    .index-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #222;
        font-size: 0.8rem;
    }
    
    .index-name {
        width: 35%;
        font-weight: bold;
    }
    
    .index-value {
        width: 25%;
        text-align: right;
    }
    
    .index-change {
        width: 20%;
        text-align: right;
    }
    
    .index-change.up {
        color: #00ff9d;
    }
    
    .index-change.down {
        color: #ff3860;
    }
    
    .index-esg {
        width: 15%;
        text-align: center;
        font-weight: bold;
        color: #00ff9d;
    }
    
    .market-trends {
        margin-top: 10px;
    }
    
    .market-trends h5 {
        font-size: 0.9rem;
        margin-bottom: 10px;
        color: #ccc;
    }
    
    .trends-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    
    .trend-item {
        width: 48%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .trend-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .trend-icon.renewable {
        background: linear-gradient(135deg, #00ff9d, #00a86b);
    }
    
    .trend-icon.circular {
        background: linear-gradient(135deg, #00bfff, #0080ff);
    }
    
    .trend-icon.water {
        background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    }
    
    .trend-icon.biodiversity {
        background: linear-gradient(135deg, #ffcc00, #ff9d00);
    }
    
    .trend-info {
        flex: 1;
    }
    
    .trend-name {
        font-size: 0.7rem;
        margin-bottom: 2px;
    }
    
    .trend-value {
        font-size: 0.9rem;
        font-weight: bold;
    }
    
    .trend-value.up {
        color: #00ff9d;
    }
    
    .trend-value.down {
        color: #ff3860;
    }
`;

document.head.appendChild(globalMarketStyles);
