// Layout Adjustment Script
// Part of the enhanced Earth Control Interface for EcosystemServices.world

// Function to adjust widget layout to use full width
function adjustWidgetLayout() {
    // Add layout adjustment styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Full Width Layout Adjustments */
    .dashboard-grid {
        grid-template-columns: 1fr !important;
        max-width: 100% !important;
        padding: 0 20px !important;
    }
    
    .widget {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 500px !important;
    }
    
    .widget.medium, .widget.large {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
    }
    
    .widget-content {
        padding: 20px !important;
        max-height: none !important;
    }
    
    /* Expanded content areas */
    .manifesto-container,
    .founder-container,
    .spiky-city-container,
    .doomsday-container {
        max-width: 100% !important;
        padding: 30px !important;
    }
    
    /* Improved spacing for better readability */
    .manifesto-section,
    .bio-section,
    .metrics-container,
    .city-rankings,
    .urban-trends,
    .threat-factors,
    .clock-timeline,
    .key-events {
        margin-bottom: 30px !important;
    }
    
    /* Enhanced grid layouts for better use of space */
    .metrics-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 30px !important;
    }
    
    .factors-container {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
        gap: 20px !important;
    }
    
    .trends-container {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
        gap: 20px !important;
    }
    
    /* Responsive adjustments */
    @media (max-width: 1200px) {
        .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    
    @media (max-width: 768px) {
        .metrics-grid {
            grid-template-columns: 1fr !important;
        }
        
        .widget-content {
            padding: 15px !important;
        }
        
        .manifesto-container,
        .founder-container,
        .spiky-city-container,
        .doomsday-container {
            padding: 15px !important;
        }
    }
    
    /* Enhanced visual elements */
    .widget {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        margin-bottom: 40px !important;
        border: 1px solid rgba(0, 255, 157, 0.2) !important;
    }
    
    .widget-header {
        padding: 20px !important;
        background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,255,157,0.1) 100%) !important;
    }
    
    .widget-header h4 {
        font-size: 1.4rem !important;
        letter-spacing: 2px !important;
        text-shadow: 0 0 10px var(--primary-color) !important;
    }
    
    /* Pre-expanded widgets */
    .widget-content {
        display: block !important;
        height: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
    `;
    
    document.head.appendChild(styleElement);
    
    // Add event listener to ensure layout adjustments are maintained
    window.addEventListener('resize', () => {
        // Force grid layout to maintain full width
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid) {
            dashboardGrid.style.gridTemplateColumns = '1fr';
        }
    });
    
    console.log('Widget layout adjusted to use full width');
}

// Initialize layout adjustments when the dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if dashboard is already loaded
    if (document.querySelector('.dashboard-grid')) {
        adjustWidgetLayout();
    } else {
        // Wait for dashboard to be initialized
        document.addEventListener('dashboard:initialized', adjustWidgetLayout);
    }
});

// Also listen for dashboard refresh events to reapply layout adjustments if needed
document.addEventListener('dashboard:refresh', adjustWidgetLayout);
