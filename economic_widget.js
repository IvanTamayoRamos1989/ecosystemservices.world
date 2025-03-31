// Carbon Market Tracker Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Initialize the carbon market data
let carbonMarketData = {
    price: 85.42,
    volume: 1243789,
    dailyChange: 2.3,
    weeklyTrend: 5.7,
    topRegions: [
        { name: "European Union", volume: 456000, price: 87.20 },
        { name: "North America", volume: 325000, price: 83.15 },
        { name: "China", volume: 287000, price: 79.50 },
        { name: "Japan", volume: 98000, price: 84.75 },
        { name: "Australia", volume: 77789, price: 82.30 }
    ],
    historicalPrices: [
        78.25, 79.10, 80.45, 79.95, 81.20, 82.15, 81.75, 
        82.90, 83.45, 82.75, 83.90, 84.25, 85.42
    ],
    sentiment: "bullish" // can be "bullish", "bearish", or "neutral"
};

// Function to initialize the Carbon Market Tracker widget
function initCarbonMarketTracker() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('carbon-market-tracker')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
            <div class="widget large" id="carbon-market-tracker">
                <div class="widget-header">
                    <h4>CARBON MARKET TRACKER</h4>
                    <div class="widget-controls">
                        <button class="expand-btn">+</button>
                        <button class="info-btn">i</button>
                    </div>
                </div>
                <div class="widget-content">
                    <div class="carbon-market">
                        <div class="market-main">
                            <div class="price-display">
                                <div class="current-price">
                                    <span class="value" id="carbon-price">${carbonMarketData.price}</span>
                                    <span class="unit">USD/tCO₂e</span>
                                </div>
                                <div class="price-change ${carbonMarketData.dailyChange >= 0 ? 'positive' : 'negative'}">
                                    <span id="price-change">${carbonMarketData.dailyChange >= 0 ? '+' : ''}${carbonMarketData.dailyChange}%</span>
                                    <span class="timeframe">24H</span>
                                </div>
                            </div>
                            <div class="volume-display">
                                <div class="volume-label">TRADING VOLUME</div>
                                <div class="volume-value" id="trading-volume">${formatNumber(carbonMarketData.volume)}</div>
                                <div class="volume-unit">tCO₂e</div>
                            </div>
                        </div>
                        
                        <div class="market-chart">
                            <canvas id="carbonMarketChart"></canvas>
                        </div>
                        
                        <div class="market-regions">
                            <div class="regions-header">TOP TRADING REGIONS</div>
                            <div class="regions-list" id="regions-list">
                                ${generateRegionsList()}
                            </div>
                        </div>
                        
                        <div class="market-sentiment">
                            <div class="sentiment-label">MARKET SENTIMENT</div>
                            <div class="sentiment-indicator ${carbonMarketData.sentiment}">
                                <div class="sentiment-value">${carbonMarketData.sentiment.toUpperCase()}</div>
                                <div class="sentiment-meter">
                                    <div class="meter-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Initialize the chart
        initCarbonMarketChart();
        
        // Start the data simulation
        startCarbonMarketSimulation();
    }
}

// Function to generate the regions list HTML
function generateRegionsList() {
    return carbonMarketData.topRegions.map((region, index) => `
        <div class="region-item">
            <div class="region-rank">${index + 1}</div>
            <div class="region-name">${region.name}</div>
            <div class="region-volume">${formatNumber(region.volume)} tCO₂e</div>
            <div class="region-price">${region.price} USD</div>
        </div>
    `).join('');
}

// Function to initialize the carbon market chart
function initCarbonMarketChart() {
    const ctx = document.getElementById('carbonMarketChart').getContext('2d');
    
    const carbonMarketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Today'],
            datasets: [{
                label: 'Carbon Price (USD/tCO₂e)',
                data: carbonMarketData.historicalPrices,
                borderColor: '#00ff9d',
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#00ff9d',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#00ff9d',
                    bodyColor: '#ffffff',
                    borderColor: '#00ff9d',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Price: ${context.raw} USD/tCO₂e`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    return carbonMarketChart;
}

// Function to start the carbon market data simulation
function startCarbonMarketSimulation() {
    // Update the carbon market data every 5 seconds
    setInterval(() => {
        // Simulate price changes
        const priceChange = (Math.random() * 0.6) - 0.3; // Random change between -0.3 and +0.3
        carbonMarketData.price = parseFloat((carbonMarketData.price + priceChange).toFixed(2));
        
        // Update daily change
        carbonMarketData.dailyChange = parseFloat((carbonMarketData.dailyChange + (priceChange * 0.5)).toFixed(1));
        if (carbonMarketData.dailyChange > 10) carbonMarketData.dailyChange = 10;
        if (carbonMarketData.dailyChange < -10) carbonMarketData.dailyChange = -10;
        
        // Simulate volume changes
        const volumeChange = Math.floor(Math.random() * 10000) - 5000;
        carbonMarketData.volume = Math.max(1000000, carbonMarketData.volume + volumeChange);
        
        // Update sentiment based on price trend
        if (carbonMarketData.dailyChange > 2) {
            carbonMarketData.sentiment = "bullish";
        } else if (carbonMarketData.dailyChange < -2) {
            carbonMarketData.sentiment = "bearish";
        } else {
            carbonMarketData.sentiment = "neutral";
        }
        
        // Update the UI
        updateCarbonMarketUI();
        
    }, 5000);
}

// Function to update the carbon market UI
function updateCarbonMarketUI() {
    // Update price display
    document.getElementById('carbon-price').textContent = carbonMarketData.price;
    
    // Update price change
    const priceChangeElement = document.getElementById('price-change');
    priceChangeElement.textContent = `${carbonMarketData.dailyChange >= 0 ? '+' : ''}${carbonMarketData.dailyChange}%`;
    priceChangeElement.parentElement.className = `price-change ${carbonMarketData.dailyChange >= 0 ? 'positive' : 'negative'}`;
    
    // Update trading volume
    document.getElementById('trading-volume').textContent = formatNumber(carbonMarketData.volume);
    
    // Update sentiment indicator
    const sentimentIndicator = document.querySelector('.sentiment-indicator');
    sentimentIndicator.className = `sentiment-indicator ${carbonMarketData.sentiment}`;
    sentimentIndicator.querySelector('.sentiment-value').textContent = carbonMarketData.sentiment.toUpperCase();
    
    // Update chart (would need to reference the chart instance)
    // This is simplified - in a real implementation you would update the chart data
    
    // Occasionally update the regions list (not on every update to reduce visual noise)
    if (Math.random() > 0.7) {
        // Simulate changes in regional data
        carbonMarketData.topRegions.forEach(region => {
            region.volume = Math.max(10000, region.volume + (Math.random() * 10000) - 5000);
            region.price = parseFloat((region.price + (Math.random() * 0.4) - 0.2).toFixed(2));
        });
        
        // Sort regions by volume
        carbonMarketData.topRegions.sort((a, b) => b.volume - a.volume);
        
        // Update the regions list
        document.getElementById('regions-list').innerHTML = generateRegionsList();
    }
}

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

// Add CSS for the Carbon Market Tracker widget
function addCarbonMarketStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Carbon Market Tracker Styles */
        .carbon-market {
            display: flex;
            flex-direction: column;
            height: 100%;
            color: var(--text-color);
        }
        
        .market-main {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .price-display {
            display: flex;
            flex-direction: column;
        }
        
        .current-price {
            display: flex;
            align-items: baseline;
        }
        
        .current-price .value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-color);
            font-family: var(--header-font);
        }
        
        .current-price .unit {
            font-size: 1rem;
            margin-left: 8px;
            color: rgba(224, 224, 224, 0.7);
        }
        
        .price-change {
            font-size: 1.2rem;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .price-change.positive {
            color: #00ff9d;
        }
        
        .price-change.negative {
            color: #ff5555;
        }
        
        .price-change .timeframe {
            font-size: 0.8rem;
            margin-left: 5px;
            color: rgba(224, 224, 224, 0.6);
        }
        
        .volume-display {
            text-align: right;
        }
        
        .volume-label {
            font-size: 0.8rem;
            color: rgba(224, 224, 224, 0.6);
            margin-bottom: 5px;
        }
        
        .volume-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--accent-color);
        }
        
        .volume-unit {
            font-size: 0.9rem;
            color: rgba(224, 224, 224, 0.7);
        }
        
        .market-chart {
            flex: 1;
            min-height: 200px;
            margin-bottom: 20px;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .market-regions {
            margin-bottom: 20px;
        }
        
        .regions-header {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .regions-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 10px;
        }
        
        .region-item {
            display: flex;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .region-rank {
            width: 20px;
            height: 20px;
            background-color: var(--primary-color);
            color: var(--darker-bg);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
            font-weight: 700;
            margin-right: 10px;
        }
        
        .region-name {
            flex: 1;
            font-size: 0.9rem;
        }
        
        .region-volume {
            font-size: 0.8rem;
            color: var(--accent-color);
            margin-right: 10px;
        }
        
        .region-price {
            font-size: 0.8rem;
            color: var(--primary-color);
        }
        
        .market-sentiment {
            display: flex;
            flex-direction: column;
        }
        
        .sentiment-label {
            font-size: 0.9rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .sentiment-indicator {
            display: flex;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 12px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .sentiment-value {
            font-size: 1.2rem;
            font-weight: 700;
            margin-right: 20px;
            min-width: 100px;
        }
        
        .sentiment-indicator.bullish .sentiment-value {
            color: #00ff9d;
        }
        
        .sentiment-indicator.bearish .sentiment-value {
            color: #ff5555;
        }
        
        .sentiment-indicator.neutral .sentiment-value {
            color: #ffcc00;
        }
        
        .sentiment-meter {
            flex: 1;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        
        .meter-bar {
            height: 100%;
            position: absolute;
            transition: width 1s, background-color 1s;
        }
        
        .sentiment-indicator.bullish .meter-bar {
            width: 80%;
            background-color: #00ff9d;
        }
        
        .sentiment-indicator.bearish .meter-bar {
            width: 30%;
            background-color: #ff5555;
        }
        
        .sentiment-indicator.neutral .meter-bar {
            width: 50%;
            background-color: #ffcc00;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addCarbonMarketStyles();
    // Wait a bit to ensure the dashboard is loaded
    setTimeout(initCarbonMarketTracker, 1000);
});
