// Project Manifesto Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Function to initialize the Project Manifesto widget
function initProjectManifesto() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('project-manifesto')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
        <div class="widget large" id="project-manifesto">
            <div class="widget-header">
                <h4>PROJECT MANIFESTO</h4>
                <div class="widget-controls">
                    <button class="expand-btn">+</button>
                    <button class="info-btn">i</button>
                </div>
            </div>
            <div class="widget-content">
                <div class="manifesto-container">
                    <div class="manifesto-title">ONE PLANET, ONE SPECIES</div>
                    
                    <div class="manifesto-section">
                        <h3>BEYOND BORDERS</h3>
                        <p>We are a single planetary species, transcending artificial boundaries of nations, languages, and ideologies. Our collective consciousness must evolve to recognize that the challenges we face are global in nature and require global solutions.</p>
                    </div>
                    
                    <div class="manifesto-section">
                        <h3>HUMAN-NATURE UNITY</h3>
                        <p>Humanity is not separate from nature but an integral part of Earth's complex systems. Our resources, economies, and societies are fundamentally intertwined with the health of our planet's ecosystems. This unity demands a new perspective on how we measure progress and success.</p>
                    </div>
                    
                    <div class="manifesto-section">
                        <h3>PLANETARY CONSCIOUSNESS</h3>
                        <p>We must cultivate a planetary consciousness that recognizes our shared destiny and responsibility. The health of our ecosystems directly impacts our survival and prosperity as a species. This interface serves as a window into the vital signs of our shared home.</p>
                    </div>
                    
                    <div class="manifesto-section">
                        <h3>HUMAN-AI COLLABORATION</h3>
                        <p>The partnership between human creativity and artificial intelligence offers unprecedented opportunities to solve our most pressing challenges. Together, we can process, analyze, and visualize complex planetary data to inform better decision-making at all levels.</p>
                    </div>
                    
                    <div class="manifesto-section">
                        <h3>INFORMATION AS EMPOWERMENT</h3>
                        <p>Access to accurate, real-time information about our planet's health is a fundamental right. By democratizing this knowledge, we empower individuals, communities, and organizations to make informed choices that contribute to a sustainable future.</p>
                    </div>
                    
                    <div class="manifesto-section">
                        <h3>CALL TO ACTION</h3>
                        <p>EcosystemServices.world is more than a monitoring platform—it's a call to action. Through awareness comes responsibility, and through responsibility comes change. Join us in this mission to inform, inspire, and transform our relationship with our planet.</p>
                    </div>
                    
                    <div class="manifesto-footer">
                        <div class="pulse-circle"></div>
                        <p>A living document, evolving with our understanding of Earth's systems and humanity's role within them.</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Add manifesto-specific styles
        addManifestoStyles();
    }
}

// Function to add manifesto-specific styles
function addManifestoStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Project Manifesto Styles */
    .manifesto-container {
        padding: 20px;
        color: var(--text-color);
        font-family: var(--body-font);
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
        border-radius: 8px;
    }
    
    .manifesto-title {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 30px;
        color: var(--primary-color);
        font-family: var(--header-font);
        letter-spacing: 3px;
        text-shadow: 0 0 15px var(--primary-color);
        position: relative;
    }
    
    .manifesto-title:after {
        content: '';
        display: block;
        width: 100px;
        height: 3px;
        background: var(--primary-color);
        margin: 15px auto;
        box-shadow: 0 0 10px var(--primary-color);
    }
    
    .manifesto-section {
        margin-bottom: 30px;
        padding: 20px;
        background: rgba(0,0,0,0.2);
        border-radius: 8px;
        border-left: 3px solid var(--primary-color);
        transition: all 0.3s ease;
    }
    
    .manifesto-section:hover {
        background: rgba(0,255,157,0.05);
        transform: translateX(5px);
    }
    
    .manifesto-section h3 {
        font-size: 1.4rem;
        margin-bottom: 15px;
        color: var(--primary-color);
        font-family: var(--header-font);
    }
    
    .manifesto-section p {
        font-size: 1rem;
        line-height: 1.6;
        color: rgba(255,255,255,0.9);
    }
    
    .manifesto-footer {
        text-align: center;
        margin-top: 40px;
        padding: 20px;
        border-top: 1px solid rgba(255,255,255,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    
    .manifesto-footer p {
        font-style: italic;
        color: rgba(255,255,255,0.7);
    }
    
    .pulse-circle {
        width: 20px;
        height: 20px;
        background-color: var(--primary-color);
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 10px var(--primary-color);
    }
    
    .pulse-circle:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--primary-color);
        opacity: 0.7;
        animation: pulse 2s infinite;
        top: 0;
        left: 0;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 0.7;
        }
        70% {
            transform: scale(2);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .manifesto-title {
            font-size: 2rem;
        }
        
        .manifesto-section h3 {
            font-size: 1.2rem;
        }
    }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the Project Manifesto widget when the dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if dashboard is already loaded
    if (document.querySelector('.dashboard-grid')) {
        initProjectManifesto();
    } else {
        // Wait for dashboard to be initialized
        document.addEventListener('dashboard:initialized', initProjectManifesto);
    }
});

// Also listen for dashboard refresh events to reinitialize if needed
document.addEventListener('dashboard:refresh', () => {
    // Reinitialize only if the widget doesn't exist
    if (!document.getElementById('project-manifesto')) {
        initProjectManifesto();
    }
});
