// Navigation Index for EcosystemServices.world
// This script creates an organized index to help users navigate through all widgets and content

document.addEventListener('DOMContentLoaded', function() {
    // Create the navigation index container
    const mainContent = document.querySelector('main');
    const heroSection = document.querySelector('.hero');
    
    // Create navigation index section
    const navIndexSection = document.createElement('section');
    navIndexSection.className = 'navigation-index';
    navIndexSection.id = 'navigation-index';
    
    // Add navigation index content
    navIndexSection.innerHTML = `
        <div class="index-header">
            <h3>EARTH CONTROL INTERFACE - NAVIGATION INDEX</h3>
            <div class="index-description">Access all monitoring systems and data feeds</div>
        </div>
        
        <div class="index-grid">
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon planetary"></div>
                    <h4>PLANETARY VITALS</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#carbon-pulse" class="index-link" data-widget="carbon-pulse">CARBON PULSE</a></li>
                    <li><a href="#forest-watch" class="index-link" data-widget="forest-watch">FOREST WATCH</a></li>
                    <li><a href="#ocean-health" class="index-link" data-widget="ocean-health">OCEAN HEALTH</a></li>
                    <li><a href="#water-resources" class="index-link" data-widget="water-resources">WATER RESOURCES</a></li>
                    <li><a href="#doomsday-clock" class="index-link" data-widget="doomsday-clock">DOOMSDAY CLOCK</a></li>
                </ul>
            </div>
            
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon biodiversity"></div>
                    <h4>BIODIVERSITY METRICS</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#biodiversity" class="index-link" data-widget="biodiversity">BIODIVERSITY INDEX</a></li>
                    <li><a href="#species-extinction" class="index-link" data-widget="species-extinction">SPECIES EXTINCTION</a></li>
                    <li><a href="#ecosystem-health" class="index-link" data-widget="ecosystem-health">ECOSYSTEM HEALTH</a></li>
                </ul>
            </div>
            
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon economic"></div>
                    <h4>ECONOMIC INDICATORS</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#carbon-market" class="index-link" data-widget="carbon-market">CARBON MARKET</a></li>
                    <li><a href="#global-market" class="index-link" data-widget="global-market">GLOBAL MARKET</a></li>
                    <li><a href="#natural-capital" class="index-link" data-widget="natural-capital">NATURAL CAPITAL</a></li>
                </ul>
            </div>
            
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon human"></div>
                    <h4>HUMAN SYSTEMS</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#climate-migration" class="index-link" data-widget="climate-migration">CLIMATE MIGRATION</a></li>
                    <li><a href="#flight-tracker" class="index-link" data-widget="flight-tracker">FLIGHT TRACKER</a></li>
                    <li><a href="#urban-density" class="index-link" data-widget="urban-density">URBAN DENSITY</a></li>
                </ul>
            </div>
            
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon energy"></div>
                    <h4>ENERGY & RESOURCES</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#energy-mix" class="index-link" data-widget="energy-mix">ENERGY MIX</a></li>
                    <li><a href="#data-center" class="index-link" data-widget="data-center">DATA CENTER FOOTPRINT</a></li>
                    <li><a href="#material-flow" class="index-link" data-widget="material-flow">MATERIAL FLOW</a></li>
                </ul>
            </div>
            
            <div class="index-category">
                <div class="category-header">
                    <div class="category-icon archive"></div>
                    <h4>PROJECT ARCHIVE</h4>
                </div>
                <ul class="category-links">
                    <li><a href="#manifesto" class="index-link" data-widget="manifesto">MANIFESTO</a></li>
                    <li><a href="#archive" class="index-link" data-widget="archive">CONVERSATION ARCHIVE</a></li>
                    <li><a href="#methodology" class="index-link" data-widget="methodology">METHODOLOGY</a></li>
                </ul>
            </div>
        </div>
        
        <div class="index-search">
            <input type="text" placeholder="SEARCH EARTH CONTROL INTERFACE..." id="index-search-input">
            <button class="search-btn">SEARCH</button>
        </div>
        
        <div class="index-footer">
            <div class="system-status">
                <div class="status-indicator online"></div>
                <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div class="last-updated">
                LAST UPDATED: <span id="last-updated-time">MAR 31, 2025 13:00 UTC</span>
            </div>
        </div>
    `;
    
    // Insert the navigation index after the hero section
    heroSection.after(navIndexSection);
    
    // Add event listeners for index links
    document.querySelectorAll('.index-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target widget
            const targetWidget = this.getAttribute('data-widget');
            
            // Find the widget in the dashboard
            const widget = document.querySelector(`[data-widget="${targetWidget}"]`) || 
                          document.getElementById(targetWidget + '-widget');
            
            if (widget) {
                // Scroll to the widget
                widget.scrollIntoView({ behavior: 'smooth' });
                
                // Add highlight effect
                widget.classList.add('highlight-widget');
                setTimeout(() => {
                    widget.classList.remove('highlight-widget');
                }, 2000);
            } else {
                // Scroll to dashboard if widget not found
                document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add search functionality
    const searchInput = document.getElementById('index-search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length < 2) return;
        
        // Reset all links
        document.querySelectorAll('.index-link').forEach(link => {
            link.classList.remove('search-match');
            link.parentElement.style.display = 'list-item';
        });
        
        // Hide categories initially
        document.querySelectorAll('.index-category').forEach(category => {
            category.classList.remove('search-active');
        });
        
        if (searchTerm.length >= 2) {
            // Filter links based on search term
            let hasMatches = false;
            
            document.querySelectorAll('.index-link').forEach(link => {
                const linkText = link.textContent.toLowerCase();
                if (linkText.includes(searchTerm)) {
                    link.classList.add('search-match');
                    link.parentElement.style.display = 'list-item';
                    link.closest('.index-category').classList.add('search-active');
                    hasMatches = true;
                } else {
                    link.parentElement.style.display = 'none';
                }
            });
            
            // If no matches, show all
            if (!hasMatches) {
                document.querySelectorAll('.index-link').forEach(link => {
                    link.parentElement.style.display = 'list-item';
                });
                document.querySelectorAll('.index-category').forEach(category => {
                    category.classList.remove('search-active');
                });
            }
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Update the last updated time
    function updateLastUpdatedTime() {
        const now = new Date();
        const options = { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const formattedDate = now.toLocaleDateString('en-US', options).toUpperCase().replace(',', '');
        document.getElementById('last-updated-time').textContent = formattedDate + ' UTC';
    }
    
    updateLastUpdatedTime();
    setInterval(updateLastUpdatedTime, 60000); // Update every minute
});

// Add CSS for the Navigation Index
const navigationIndexStyles = document.createElement('style');
navigationIndexStyles.textContent = `
    .navigation-index {
        padding: 30px 0;
        background: rgba(10, 10, 20, 0.7);
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        margin-bottom: 30px;
    }
    
    .index-header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .index-header h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: var(--primary-color);
        text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
    }
    
    .index-description {
        font-size: 0.9rem;
        color: #888;
    }
    
    .index-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .index-category {
        background: rgba(20, 20, 35, 0.7);
        border: 1px solid #333;
        border-radius: 5px;
        padding: 15px;
        transition: all 0.3s ease;
    }
    
    .index-category:hover {
        background: rgba(30, 30, 45, 0.7);
        box-shadow: 0 0 15px rgba(0, 255, 157, 0.2);
    }
    
    .category-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #333;
    }
    
    .category-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .category-icon.planetary {
        background: linear-gradient(135deg, #00ff9d, #00a86b);
    }
    
    .category-icon.biodiversity {
        background: linear-gradient(135deg, #ffcc00, #ff9d00);
    }
    
    .category-icon.economic {
        background: linear-gradient(135deg, #00bfff, #0080ff);
    }
    
    .category-icon.human {
        background: linear-gradient(135deg, #ff3860, #ff0040);
    }
    
    .category-icon.energy {
        background: linear-gradient(135deg, #9d00ff, #6a00ff);
    }
    
    .category-icon.archive {
        background: linear-gradient(135deg, #ff9d00, #ff6a00);
    }
    
    .category-header h4 {
        font-size: 1rem;
        margin: 0;
        color: #fff;
    }
    
    .category-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .category-links li {
        margin-bottom: 8px;
    }
    
    .index-link {
        display: block;
        padding: 8px 10px;
        font-size: 0.8rem;
        color: #ccc;
        text-decoration: none;
        border-left: 3px solid transparent;
        transition: all 0.2s ease;
    }
    
    .index-link:hover {
        background: rgba(40, 40, 60, 0.7);
        color: var(--primary-color);
        border-left-color: var(--primary-color);
    }
    
    .index-link.search-match {
        background: rgba(0, 255, 157, 0.1);
        color: var(--primary-color);
        border-left-color: var(--primary-color);
        font-weight: bold;
    }
    
    .index-category.search-active {
        box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    }
    
    .index-search {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    
    #index-search-input {
        width: 60%;
        max-width: 500px;
        padding: 10px 15px;
        background: rgba(30, 30, 45, 0.7);
        border: 1px solid #444;
        border-radius: 5px 0 0 5px;
        color: #fff;
        font-size: 0.9rem;
    }
    
    #index-search-input:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .search-btn {
        padding: 10px 20px;
        background: var(--primary-color);
        border: none;
        border-radius: 0 5px 5px 0;
        color: #111;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .search-btn:hover {
        background: #00cc7d;
    }
    
    .index-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        border-top: 1px solid #333;
    }
    
    .system-status {
        display: flex;
        align-items: center;
    }
    
    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }
    
    .status-indicator.online {
        background: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-color);
    }
    
    .last-updated {
        font-size: 0.8rem;
        color: #888;
    }
    
    /* Widget highlight effect */
    @keyframes widget-highlight {
        0% { box-shadow: 0 0 0 rgba(0, 255, 157, 0); }
        50% { box-shadow: 0 0 30px rgba(0, 255, 157, 0.7); }
        100% { box-shadow: 0 0 0 rgba(0, 255, 157, 0); }
    }
    
    .highlight-widget {
        animation: widget-highlight 2s ease;
    }
    
    /* Responsive adjustments */
    @media (max-width: 1200px) {
        .index-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    @media (max-width: 768px) {
        .index-grid {
            grid-template-columns: 1fr;
        }
        
        #index-search-input {
            width: 70%;
        }
    }
`;

document.head.appendChild(navigationIndexStyles);
