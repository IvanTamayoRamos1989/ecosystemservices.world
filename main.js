// Main JavaScript for EcosystemServices.world
// Handles core functionality and initialization

// Update UTC time display
function updateUTCTime() {
    const now = new Date();
    const utcTimeString = now.toUTCString().split(' ')[4];
    const utcDisplay = document.getElementById('utc-time');
    if (utcDisplay) {
        utcDisplay.textContent = utcTimeString + ' UTC';
    }
    
    // Update every second
    setTimeout(updateUTCTime, 1000);
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start UTC time updates
    updateUTCTime();
    
    // Trigger dashboard initialization event
    const dashboardInitEvent = new CustomEvent('dashboard:initialized');
    document.dispatchEvent(dashboardInitEvent);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Earth visualization animation
    const earthViz = document.querySelector('.earth-visualization');
    if (earthViz) {
        // Add random "data points" to the visualization
        for (let i = 0; i < 20; i++) {
            const dataPoint = document.createElement('div');
            dataPoint.className = 'data-point';
            dataPoint.style.left = `${Math.random() * 100}%`;
            dataPoint.style.top = `${Math.random() * 100}%`;
            dataPoint.style.animationDelay = `${Math.random() * 5}s`;
            earthViz.appendChild(dataPoint);
        }
    }
    
    // Add styles for data points
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .data-point {
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: var(--primary-color);
            border-radius: 50%;
            box-shadow: 0 0 5px var(--primary-color);
            animation: pulse 3s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.7;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleElement);
});

// Handle refresh button clicks
document.addEventListener('click', (e) => {
    if (e.target.id === 'refresh-data-btn') {
        // Trigger data refresh event
        const refreshEvent = new CustomEvent('dashboard:refresh');
        document.dispatchEvent(refreshEvent);
        
        // Add visual feedback
        e.target.classList.add('refreshing');
        setTimeout(() => {
            e.target.classList.remove('refreshing');
        }, 2000);
    }
});
