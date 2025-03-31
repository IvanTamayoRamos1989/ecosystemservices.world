// Dashboard Update Script - Ensures all widgets are properly integrated
// This script runs after all individual widget scripts to ensure proper integration

document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard update script running - ensuring all widgets are properly integrated");
    
    // Function to check if a widget exists in the DOM
    function checkWidgetExists(widgetId) {
        return document.getElementById(widgetId) !== null;
    }
    
    // Function to ensure a widget is properly added to the dashboard
    function ensureWidgetExists(widgetId, widgetScript) {
        if (!checkWidgetExists(widgetId)) {
            console.log(`Widget ${widgetId} not found, manually triggering creation`);
            // Create a new script element to re-execute the widget creation
            const script = document.createElement('script');
            script.textContent = `
                // Force re-execution of ${widgetScript}
                const dashboardSection = document.querySelector('.dashboard');
                if (dashboardSection && dashboardSection.querySelector('.dashboard-grid')) {
                    ${widgetScript}();
                } else {
                    console.error("Dashboard section or grid not found");
                }
            `;
            document.body.appendChild(script);
        } else {
            console.log(`Widget ${widgetId} already exists`);
        }
    }
    
    // Wait a short time to ensure all other scripts have had a chance to run
    setTimeout(() => {
        // Check for each critical widget and ensure it exists
        ensureWidgetExists('doomsday-clock-widget', 'initDoomsdayClockWidget');
        ensureWidgetExists('manifesto-widget', 'initManifestoWidget');
        ensureWidgetExists('founder-widget', 'initFounderWidget');
        
        // Define initialization functions if they don't exist
        if (typeof initDoomsdayClockWidget !== 'function') {
            window.initDoomsdayClockWidget = function() {
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
                        </div>
                    </div>
                `;
                
                // Add the widget to the dashboard
                dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
                
                // Initialize the Spiky World threat map
                initThreatMap();
            };
        }
        
        if (typeof initManifestoWidget !== 'function') {
            window.initManifestoWidget = function() {
                // Create the Manifesto widget container
                const dashboardSection = document.querySelector('.dashboard');
                const widgetContainer = document.createElement('div');
                widgetContainer.className = 'widget large';
                widgetContainer.id = 'manifesto-widget';
                
                // Add widget header
                widgetContainer.innerHTML = `
                    <div class="widget-header">
                        <h4>PROJECT MANIFESTO</h4>
                        <div class="widget-controls">
                            <button class="expand-btn">+</button>
                            <button class="info-btn">i</button>
                        </div>
                    </div>
                    <div class="widget-content">
                        <div class="manifesto-container">
                            <div class="manifesto-title">ONE PLANET, ONE SPECIES, ONE FUTURE</div>
                            
                            <div class="manifesto-section">
                                <p>We stand at a pivotal moment in human history. Our technological capabilities have advanced to unprecedented levels, yet our planet faces unprecedented challenges. EcosystemServices.world exists as a bridge between these realities—a cyberpunk-inspired Earth Control Interface that transcends traditional boundaries to reveal the true state of our planetary systems.</p>
                            </div>
                            
                            <div class="manifesto-section">
                                <h5>BEYOND BORDERS</h5>
                                <p>We reject the artificial divisions of nations, languages, and ideologies that fragment our collective consciousness. From space, there are no borders visible on Earth—only the interconnected systems of land, water, atmosphere, and life that sustain us all. We are one planetary species, inextricably linked to the ecosystems that support us.</p>
                            </div>
                            
                            <div class="manifesto-footer">
                                <p>Welcome to EcosystemServices.world. Welcome to planetary consciousness.</p>
                                <div class="manifesto-signature">Created through human-AI collaboration, March 31, 2025</div>
                                <button class="read-full-btn">READ FULL MANIFESTO</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add the widget to the dashboard
                dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
            };
        }
        
        if (typeof initFounderWidget !== 'function') {
            window.initFounderWidget = function() {
                // Create the Founder widget container
                const dashboardSection = document.querySelector('.dashboard');
                const widgetContainer = document.createElement('div');
                widgetContainer.className = 'widget large';
                widgetContainer.id = 'founder-widget';
                
                // Add widget header
                widgetContainer.innerHTML = `
                    <div class="widget-header">
                        <h4>PROJECT FOUNDER</h4>
                        <div class="widget-controls">
                            <button class="expand-btn">+</button>
                            <button class="info-btn">i</button>
                        </div>
                    </div>
                    <div class="widget-content">
                        <div class="founder-container">
                            <div class="founder-header">
                                <div class="founder-avatar"></div>
                                <div class="founder-title">
                                    <h3>IVAN TAMAYO RAMOS</h3>
                                    <div class="founder-headline">International Architecture & Urban Design Consultant | Sustainable & Regenerative Design Expert | AI-Powered Solutions for Ecological Development</div>
                                </div>
                            </div>
                            
                            <div class="founder-bio">
                                <p>Results-driven urban development specialist with a proven track record of providing expert consultation on sustainable strategies, urban planning, and design for international projects. Expertise in integrating cultural heritage, creative economy, and social development components.</p>
                                
                                <div class="bio-section">
                                    <h5>VISION FOR ECOSYSTEMSERVICES.WORLD</h5>
                                    <p>As the founder of EcosystemServices.world, Ivan brings his expertise in sustainable cities design and urban ecology to create a platform that visualizes our planet's vital systems. His vision combines cutting-edge AI technology with ecological principles to foster a new understanding of humanity's relationship with Earth's ecosystems.</p>
                                </div>
                            </div>
                            
                            <div class="founder-footer">
                                <button class="read-full-btn">VIEW FULL BIOGRAPHY</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add the widget to the dashboard
                dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
            };
        }
        
        // Call the initialization functions directly to ensure widgets are created
        if (typeof initDoomsdayClockWidget === 'function') initDoomsdayClockWidget();
        if (typeof initManifestoWidget === 'function') initManifestoWidget();
        if (typeof initFounderWidget === 'function') initFounderWidget();
        
        console.log("Dashboard update complete - all widgets should now be integrated");
    }, 1000);
});
