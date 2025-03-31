// Doomsday Clock Widget - Based on Richard Florida's "Spiky World" visualization style
// This widget shows how close humanity is to global catastrophe using the Bulletin of Atomic Scientists' Doomsday Clock

// Initialize the widget when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the Doomsday Clock widget container
    const dashboardSection = document.querySelector('.dashboard');
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'widget large';
    widgetContainer.id = 'doomsday-clock-widget';
    
    // Add widget header
    widgetContainer.innerHTML = `
        <div class="widget-header">
            <h4>DOOMSDAY CLOCK</h4>
            <div class="widget-controls">
                <button class="expand-btn">+</button>
                <button class="info-btn">i</button>
            </div>
        </div>
        <div class="widget-content">
            <div class="doomsday-clock">
                <div class="clock-container">
                    <div class="clock-face">
                        <div class="clock-center"></div>
                        <div class="minute-hand"></div>
                        <div class="hour-hand"></div>
                        <div class="second-hand"></div>
                        <div class="midnight-marker"></div>
                    </div>
                    <div class="clock-time">
                        <span class="value" id="doomsday-time">90</span>
                        <span class="unit">SECONDS TO MIDNIGHT</span>
                    </div>
                </div>
                <div class="metric-description">BULLETIN OF THE ATOMIC SCIENTISTS</div>
                
                <div class="global-threats-map">
                    <h5>GLOBAL THREAT DISTRIBUTION</h5>
                    <div class="spiky-world-container">
                        <canvas id="threatMapCanvas" width="600" height="300"></canvas>
                    </div>
                </div>
                
                <div class="threat-categories">
                    <div class="threat-category">
                        <div class="threat-label">NUCLEAR</div>
                        <div class="threat-meter">
                            <div class="threat-level" style="width: 85%;"></div>
                        </div>
                    </div>
                    <div class="threat-category">
                        <div class="threat-label">CLIMATE</div>
                        <div class="threat-meter">
                            <div class="threat-level" style="width: 78%;"></div>
                        </div>
                    </div>
                    <div class="threat-category">
                        <div class="threat-label">BIOTECH</div>
                        <div class="threat-meter">
                            <div class="threat-level" style="width: 62%;"></div>
                        </div>
                    </div>
                    <div class="threat-category">
                        <div class="threat-label">DISRUPTIVE TECH</div>
                        <div class="threat-meter">
                            <div class="threat-level" style="width: 70%;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="historical-timeline">
                    <h5>HISTORICAL TIMELINE</h5>
                    <div class="timeline-container">
                        <div class="timeline-marker" style="left: 10%;">
                            <div class="year">1953</div>
                            <div class="time">2 MIN</div>
                        </div>
                        <div class="timeline-marker" style="left: 30%;">
                            <div class="year">1991</div>
                            <div class="time">17 MIN</div>
                        </div>
                        <div class="timeline-marker" style="left: 60%;">
                            <div class="year">2018</div>
                            <div class="time">2 MIN</div>
                        </div>
                        <div class="timeline-marker current" style="left: 90%;">
                            <div class="year">2025</div>
                            <div class="time">90 SEC</div>
                        </div>
                        <div class="timeline-line"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add the widget to the dashboard
    dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
    
    // Initialize the Spiky World threat map
    initThreatMap();
    
    // Animate the clock
    animateDoomsdayClock();
});

// Initialize the Spiky World threat map using canvas
function initThreatMap() {
    const canvas = document.getElementById('threatMapCanvas');
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
    
    // Define threat hotspots (x, y, height, color)
    const hotspots = [
        // North America
        {x: 150, y: 120, height: 80, color: '#ff3860'},
        // Europe
        {x: 300, y: 100, height: 90, color: '#ff3860'},
        // Russia
        {x: 380, y: 90, height: 100, color: '#ff3860'},
        // Middle East
        {x: 330, y: 150, height: 70, color: '#ff3860'},
        // East Asia
        {x: 450, y: 130, height: 85, color: '#ff3860'},
        // South Asia
        {x: 400, y: 170, height: 60, color: '#ff3860'},
        // Africa
        {x: 300, y: 180, height: 40, color: '#ff9d00'},
        // South America
        {x: 200, y: 200, height: 35, color: '#ff9d00'},
        // Australia
        {x: 480, y: 220, height: 30, color: '#ff9d00'},
        // Various smaller hotspots
        {x: 170, y: 140, height: 25, color: '#ff9d00'},
        {x: 350, y: 120, height: 45, color: '#ff3860'},
        {x: 420, y: 150, height: 55, color: '#ff3860'},
        {x: 250, y: 160, height: 30, color: '#ff9d00'},
        {x: 280, y: 130, height: 50, color: '#ff3860'},
        {x: 230, y: 110, height: 40, color: '#ff3860'}
    ];
    
    // Draw the spikes for each hotspot
    hotspots.forEach(spot => {
        // Draw the spike
        const gradient = ctx.createLinearGradient(spot.x, spot.y, spot.x, spot.y - spot.height);
        gradient.addColorStop(0, spot.color);
        gradient.addColorStop(1, 'rgba(255, 0, 100, 0)');
        
        ctx.fillStyle = gradient;
        
        // Draw a spike shape
        ctx.beginPath();
        ctx.moveTo(spot.x - 5, spot.y);
        ctx.lineTo(spot.x, spot.y - spot.height);
        ctx.lineTo(spot.x + 5, spot.y);
        ctx.closePath();
        ctx.fill();
        
        // Add a glow effect
        ctx.shadowColor = spot.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

// Animate the Doomsday Clock
function animateDoomsdayClock() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    
    // Set initial positions (90 seconds to midnight)
    hourHand.style.transform = 'rotate(354deg)';  // Almost at 12
    minuteHand.style.transform = 'rotate(354deg)'; // Almost at 12
    
    // Animate the second hand
    let seconds = 0;
    setInterval(() => {
        seconds = (seconds + 1) % 60;
        secondHand.style.transform = `rotate(${seconds * 6 + 354}deg)`;
        
        // Randomly adjust the minute hand slightly to create tension
        if (seconds % 10 === 0) {
            const randomOffset = (Math.random() - 0.5) * 0.5;
            minuteHand.style.transform = `rotate(${354 + randomOffset}deg)`;
        }
        
        // Randomly update the doomsday time (between 89-91 seconds)
        if (seconds % 15 === 0) {
            const randomTime = 90 + Math.floor(Math.random() * 3) - 1;
            document.getElementById('doomsday-time').textContent = randomTime;
        }
    }, 1000);
}

// Add CSS for the Doomsday Clock widget
const doomsdayClockStyles = document.createElement('style');
doomsdayClockStyles.textContent = `
    .doomsday-clock {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--text-color);
    }
    
    .clock-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 15px;
    }
    
    .clock-face {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #111;
        border: 2px solid #ff3860;
        box-shadow: 0 0 15px rgba(255, 56, 96, 0.7);
    }
    
    .clock-center {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background: #ff3860;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    
    .hour-hand, .minute-hand, .second-hand {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: left center;
        z-index: 5;
    }
    
    .hour-hand {
        width: 35px;
        height: 4px;
        background: #ff3860;
        transform: rotate(354deg);
    }
    
    .minute-hand {
        width: 45px;
        height: 3px;
        background: #ff3860;
        transform: rotate(354deg);
    }
    
    .second-hand {
        width: 50px;
        height: 2px;
        background: #ff9d00;
        transform: rotate(0deg);
        z-index: 6;
    }
    
    .midnight-marker {
        position: absolute;
        top: 10px;
        left: 50%;
        width: 4px;
        height: 10px;
        background: #ff3860;
        transform: translateX(-50%);
    }
    
    .clock-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .clock-time .value {
        font-size: 3rem;
        font-weight: bold;
        color: #ff3860;
        text-shadow: 0 0 10px rgba(255, 56, 96, 0.7);
    }
    
    .clock-time .unit {
        font-size: 0.8rem;
        color: #ff3860;
    }
    
    .metric-description {
        text-align: center;
        font-size: 0.8rem;
        margin-bottom: 15px;
        color: #888;
    }
    
    .global-threats-map {
        margin-bottom: 15px;
    }
    
    .global-threats-map h5 {
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
    
    .threat-categories {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    
    .threat-category {
        width: 48%;
        margin-bottom: 10px;
    }
    
    .threat-label {
        font-size: 0.8rem;
        margin-bottom: 3px;
    }
    
    .threat-meter {
        height: 8px;
        background: #333;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .threat-level {
        height: 100%;
        background: linear-gradient(to right, #ff9d00, #ff3860);
    }
    
    .historical-timeline {
        margin-top: 10px;
    }
    
    .historical-timeline h5 {
        font-size: 0.9rem;
        margin-bottom: 5px;
        color: #ccc;
    }
    
    .timeline-container {
        position: relative;
        height: 40px;
        margin-top: 20px;
    }
    
    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background: #333;
        transform: translateY(-50%);
    }
    
    .timeline-marker {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        text-align: center;
    }
    
    .timeline-marker .year {
        font-size: 0.7rem;
        margin-bottom: 2px;
    }
    
    .timeline-marker .time {
        font-size: 0.7rem;
        color: #ff9d00;
    }
    
    .timeline-marker.current .year,
    .timeline-marker.current .time {
        color: #ff3860;
        font-weight: bold;
    }
    
    .timeline-marker::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 50%;
        width: 2px;
        height: 10px;
        background: #666;
        transform: translateX(-50%);
    }
    
    .timeline-marker.current::after {
        background: #ff3860;
    }
`;

document.head.appendChild(doomsdayClockStyles);
