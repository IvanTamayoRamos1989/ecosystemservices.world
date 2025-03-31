// Founder Biography Widget
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Function to initialize the Founder Biography widget
function initFounderBiography() {
    // Create the widget container if it doesn't exist
    if (!document.getElementById('founder-biography')) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        
        const widgetHTML = `
        <div class="widget medium" id="founder-biography">
            <div class="widget-header">
                <h4>FOUNDER PROFILE</h4>
                <div class="widget-controls">
                    <button class="expand-btn">+</button>
                    <button class="info-btn">i</button>
                </div>
            </div>
            <div class="widget-content">
                <div class="founder-container">
                    <div class="founder-header">
                        <div class="founder-avatar">
                            <div class="avatar-placeholder">
                                <div class="avatar-initials">ES</div>
                            </div>
                        </div>
                        <div class="founder-title">
                            <h2>FOUNDER & VISIONARY</h2>
                            <div class="founder-status">
                                <span class="status-indicator"></span>
                                <span class="status-text">Active Contributor</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="founder-bio">
                        <div class="bio-section">
                            <h3>MISSION STATEMENT</h3>
                            <p>Dedicated to advancing our understanding of Earth's complex systems and promoting a unified approach to global sustainability challenges through innovative data visualization and analysis.</p>
                        </div>
                        
                        <div class="bio-section">
                            <h3>PROFESSIONAL BACKGROUND</h3>
                            <p>With extensive experience in environmental science, data analytics, and sustainable development, I've led initiatives that bridge the gap between scientific research and practical applications. My work focuses on translating complex ecological data into actionable insights for policymakers, businesses, and communities.</p>
                        </div>
                        
                        <div class="bio-section">
                            <h3>VISION FOR ECOSYSTEMSERVICES.WORLD</h3>
                            <p>EcosystemServices.world represents a new paradigm in environmental monitoring and awareness. By creating this platform, I aim to democratize access to critical planetary data, foster global collaboration, and inspire a new generation of environmental stewards equipped with the tools to make informed decisions.</p>
                        </div>
                        
                        <div class="bio-section">
                            <h3>COLLABORATIVE APPROACH</h3>
                            <p>I believe in the power of human-AI collaboration to solve our most pressing environmental challenges. This platform exemplifies how advanced technology can amplify human creativity and insight, enabling us to process and visualize complex data in ways that reveal new patterns and possibilities.</p>
                        </div>
                    </div>
                    
                    <div class="founder-credentials">
                        <div class="credential">
                            <div class="credential-icon">🎓</div>
                            <div class="credential-details">
                                <div class="credential-title">EDUCATION</div>
                                <div class="credential-description">Advanced degrees in Environmental Science and Data Analytics</div>
                            </div>
                        </div>
                        
                        <div class="credential">
                            <div class="credential-icon">🔬</div>
                            <div class="credential-details">
                                <div class="credential-title">RESEARCH</div>
                                <div class="credential-description">Published work on ecosystem services valuation and planetary boundaries</div>
                            </div>
                        </div>
                        
                        <div class="credential">
                            <div class="credential-icon">🌐</div>
                            <div class="credential-details">
                                <div class="credential-title">GLOBAL IMPACT</div>
                                <div class="credential-description">Advisor to international organizations on sustainability metrics</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="founder-connect">
                        <div class="connect-header">CONNECT & COLLABORATE</div>
                        <div class="connect-links">
                            <a href="#" class="connect-link">
                                <span class="link-icon">📧</span>
                                <span class="link-text">Contact</span>
                            </a>
                            <a href="#" class="connect-link">
                                <span class="link-icon">📚</span>
                                <span class="link-text">Publications</span>
                            </a>
                            <a href="#" class="connect-link">
                                <span class="link-icon">🔗</span>
                                <span class="link-text">Network</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Add the widget to the dashboard
        dashboardGrid.insertAdjacentHTML('afterbegin', widgetHTML);
        
        // Add biography-specific styles
        addBiographyStyles();
    }
}

// Function to add biography-specific styles
function addBiographyStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Founder Biography Styles */
    .founder-container {
        padding: 20px;
        color: var(--text-color);
        font-family: var(--body-font);
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .founder-header {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .founder-avatar {
        flex-shrink: 0;
    }
    
    .avatar-placeholder {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color) 0%, rgba(0,255,157,0.3) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 15px rgba(0,255,157,0.5);
    }
    
    .avatar-initials {
        font-size: 2rem;
        font-weight: bold;
        color: rgba(0,0,0,0.7);
    }
    
    .founder-title {
        flex-grow: 1;
    }
    
    .founder-title h2 {
        font-size: 1.5rem;
        margin: 0 0 10px 0;
        color: var(--primary-color);
        font-family: var(--header-font);
        letter-spacing: 1px;
    }
    
    .founder-status {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--primary-color);
        animation: pulse 2s infinite;
    }
    
    .status-text {
        font-size: 0.9rem;
        color: rgba(255,255,255,0.7);
    }
    
    .founder-bio {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .bio-section {
        padding: 15px;
        background: rgba(0,0,0,0.2);
        border-radius: 8px;
        border-left: 2px solid var(--primary-color);
    }
    
    .bio-section h3 {
        font-size: 1rem;
        margin: 0 0 10px 0;
        color: var(--primary-color);
        font-family: var(--header-font);
    }
    
    .bio-section p {
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
        color: rgba(255,255,255,0.9);
    }
    
    .founder-credentials {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
    }
    
    .credential {
        flex: 1 1 calc(33.333% - 10px);
        min-width: 200px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: rgba(0,0,0,0.2);
        border-radius: 8px;
    }
    
    .credential-icon {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,255,157,0.1);
        border-radius: 50%;
    }
    
    .credential-details {
        flex-grow: 1;
    }
    
    .credential-title {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 5px;
    }
    
    .credential-description {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.8);
    }
    
    .founder-connect {
        margin-top: 10px;
        padding: 15px;
        background: rgba(0,255,157,0.05);
        border-radius: 8px;
    }
    
    .connect-header {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 10px;
        text-align: center;
    }
    
    .connect-links {
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    .connect-link {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 8px 15px;
        background: rgba(0,0,0,0.3);
        border-radius: 20px;
        text-decoration: none;
        color: var(--text-color);
        transition: all 0.3s;
    }
    
    .connect-link:hover {
        background: rgba(0,255,157,0.2);
        transform: translateY(-2px);
    }
    
    .link-icon {
        font-size: 1rem;
    }
    
    .link-text {
        font-size: 0.8rem;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0,255,157,0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(0,255,157,0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0,255,157,0);
        }
    }
    
    @media (max-width: 768px) {
        .founder-header {
            flex-direction: column;
            text-align: center;
        }
        
        .founder-credentials {
            flex-direction: column;
        }
        
        .credential {
            width: 100%;
        }
        
        .connect-links {
            flex-direction: column;
            align-items: center;
        }
    }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize the Founder Biography widget when the dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if dashboard is already loaded
    if (document.querySelector('.dashboard-grid')) {
        initFounderBiography();
    } else {
        // Wait for dashboard to be initialized
        document.addEventListener('dashboard:initialized', initFounderBiography);
    }
});

// Also listen for dashboard refresh events to reinitialize if needed
document.addEventListener('dashboard:refresh', () => {
    // Reinitialize only if the widget doesn't exist
    if (!document.getElementById('founder-biography')) {
        initFounderBiography();
    }
});
