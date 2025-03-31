// Main Dashboard Integration Script
// Integrates all widgets for the enhanced Earth Control Interface for EcosystemServices.world

// Function to initialize the enhanced dashboard
function initEnhancedDashboard() {
  // Add the dashboard container if it doesn't exist
  if (!document.getElementById('enhanced-dashboard')) {
    // Create dashboard container
    const dashboardHTML = `
      <div id="enhanced-dashboard" class="dashboard-container">
        <div class="dashboard-header">
          <h2>EARTH SYSTEM MONITORING</h2>
          <div class="dashboard-controls">
            <button id="refresh-data-btn" class="control-btn">REFRESH DATA</button>
            <div class="view-controls">
              <button id="grid-view-btn" class="view-btn active">GRID</button>
              <button id="list-view-btn" class="view-btn">LIST</button>
            </div>
          </div>
        </div>
        <div class="dashboard-grid">
          <!-- Widgets will be dynamically inserted here -->
        </div>
      </div>
    `;
    
    // Insert the dashboard into the page
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.innerHTML = dashboardHTML;
      
      // Initialize dashboard controls
      initDashboardControls();
      
      // Load all widget scripts
      loadWidgetScripts();
    }
  }
}

// Function to initialize dashboard controls
function initDashboardControls() {
  // Refresh data button
  const refreshBtn = document.getElementById('refresh-data-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('refreshing');
      setTimeout(() => {
        refreshBtn.classList.remove('refreshing');
      }, 2000);
      
      // Trigger data refresh event
      const refreshEvent = new CustomEvent('dashboard:refresh');
      document.dispatchEvent(refreshEvent);
    });
  }
  
  // View toggle buttons
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');
  const dashboardGrid = document.querySelector('.dashboard-grid');
  
  if (gridBtn && listBtn && dashboardGrid) {
    gridBtn.addEventListener('click', () => {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      dashboardGrid.classList.remove('list-view');
    });
    
    listBtn.addEventListener('click', () => {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      dashboardGrid.classList.add('list-view');
    });
  }
}

// Function to load all widget scripts
function loadWidgetScripts() {
  const widgetScripts = [
    'economic_widget.js',
    'climate_migration_widget.js',
    'energy_mix_widget.js',
    'species_extinction_widget.js',
    'data_center_widget.js',
    'material_flow_widget.js'
  ];
  
  widgetScripts.forEach(script => {
    const scriptElement = document.createElement('script');
    scriptElement.src = script;
    document.body.appendChild(scriptElement);
  });
}

// Add enhanced dashboard styles
function addEnhancedDashboardStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Enhanced Dashboard Styles */
    .dashboard-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }
    
    .dashboard-header h2 {
      font-size: 1.8rem;
      color: var(--primary-color);
      margin: 0;
      font-family: var(--header-font);
      text-shadow: 0 0 10px var(--primary-color);
    }
    
    .dashboard-controls {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .control-btn {
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      padding: 8px 15px;
      font-size: 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      font-family: var(--header-font);
      position: relative;
      overflow: hidden;
    }
    
    .control-btn:hover {
      background-color: rgba(0, 255, 157, 0.1);
      box-shadow: 0 0 10px var(--primary-color);
    }
    
    .control-btn.refreshing::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.2), transparent);
      animation: refreshSweep 2s linear;
    }
    
    @keyframes refreshSweep {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    .view-controls {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .view-btn {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      color: var(--text-color);
      padding: 8px 15px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s;
      font-family: var(--header-font);
    }
    
    .view-btn.active {
      background-color: rgba(0, 255, 157, 0.1);
      color: var(--primary-color);
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      transition: all 0.5s;
    }
    
    .dashboard-grid.list-view {
      grid-template-columns: 1fr;
    }
    
    .widget {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s;
      height: 400px;
      display: flex;
      flex-direction: column;
    }
    
    .widget:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
      border-color: rgba(0, 255, 157, 0.3);
    }
    
    .widget.large {
      grid-column: span 2;
      grid-row: span 2;
      height: 820px;
    }
    
    .widget.medium {
      grid-column: span 2;
      height: 400px;
    }
    
    .dashboard-grid.list-view .widget {
      height: auto;
      min-height: 400px;
    }
    
    .dashboard-grid.list-view .widget.large,
    .dashboard-grid.list-view .widget.medium {
      grid-column: span 1;
      grid-row: span 1;
    }
    
    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      background-color: rgba(0, 0, 0, 0.2);
    }
    
    .widget-header h4 {
      margin: 0;
      font-size: 1rem;
      color: var(--text-color);
      font-family: var(--header-font);
    }
    
    .widget-controls {
      display: flex;
      gap: 10px;
    }
    
    .widget-controls button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.3);
      color: var(--text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.8rem;
      padding: 0;
    }
    
    .widget-controls button:hover {
      background-color: rgba(0, 255, 157, 0.1);
      border-color: var(--primary-color);
    }
    
    .widget-content {
      flex: 1;
      padding: 15px;
      overflow: auto;
      position: relative;
    }
    
    /* Scrollbar styling */
    .widget-content::-webkit-scrollbar {
      width: 5px;
    }
    
    .widget-content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
    
    .widget-content::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 157, 0.3);
      border-radius: 3px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .widget.large, .widget.medium {
        grid-column: span 1;
        grid-row: span 1;
        height: auto;
        min-height: 400px;
      }
      
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      
      .dashboard-controls {
        width: 100%;
        justify-content: space-between;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}

// Initialize the enhanced dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
  addEnhancedDashboardStyles();
  initEnhancedDashboard();
});
