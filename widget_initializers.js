// Navigation Index Widget Implementation
function initializeNavigationIndex() {
  const navigationIndexHTML = `
    <div class="navigation-index">
      <div class="index-header">
        <h3>Earth Control Interface Navigation</h3>
        <p>Access all monitoring systems and data feeds from this central navigation hub</p>
      </div>
      <div class="index-categories">
        <div class="index-category">
          <h4>Ecosystem Metrics</h4>
          <ul class="index-links">
            <li><a href="#carbon-market">Carbon Market Tracker</a></li>
            <li><a href="#climate-migration">Climate Migration Patterns</a></li>
            <li><a href="#energy-mix">Energy Mix Monitor</a></li>
            <li><a href="#species-extinction">Species Extinction Countdown</a></li>
            <li><a href="#data-center">Data Center Footprint</a></li>
            <li><a href="#material-flow">Material Flow Analyzer</a></li>
          </ul>
        </div>
        <div class="index-category">
          <h4>Global Monitoring</h4>
          <ul class="index-links">
            <li><a href="#doomsday-clock">Doomsday Clock</a></li>
            <li><a href="#global-market">Global Market Monitor</a></li>
            <li><a href="#flight-tracker">Flight Tracker</a></li>
            <li><a href="#ocean-health">Ocean Health Index</a></li>
            <li><a href="#forest-cover">Forest Cover Change</a></li>
            <li><a href="#air-quality">Air Quality Index</a></li>
          </ul>
        </div>
        <div class="index-category">
          <h4>Project Information</h4>
          <ul class="index-links">
            <li><a href="#manifesto">Project Manifesto</a></li>
            <li><a href="#founder">Founder Biography</a></li>
            <li><a href="#archive">Conversation Archive</a></li>
            <li><a href="#methodology">Data Methodology</a></li>
            <li><a href="#about">About the Project</a></li>
            <li><a href="#contact">Contact Information</a></li>
          </ul>
        </div>
        <div class="index-category">
          <h4>Data Feeds</h4>
          <ul class="index-links">
            <li><a href="#news">Ecosystem News</a></li>
            <li><a href="#research">Latest Research</a></li>
            <li><a href="#events">Environmental Events</a></li>
            <li><a href="#policy">Policy Updates</a></li>
            <li><a href="#innovations">Sustainability Innovations</a></li>
            <li><a href="#alerts">Critical Alerts</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Create navigation index widget
  const navigationIndexWidget = document.createElement('div');
  navigationIndexWidget.className = 'widget';
  navigationIndexWidget.id = 'navigation-index-widget';
  navigationIndexWidget.innerHTML = `
    <div class="widget-header">
      <h4>Navigation Index</h4>
      <div class="widget-controls">
        <button class="refresh-btn" title="Refresh"><i class="fas fa-sync-alt"></i></button>
        <button class="expand-btn" title="Expand"><i class="fas fa-expand-alt"></i></button>
      </div>
    </div>
    <div class="widget-content">
      ${navigationIndexHTML}
    </div>
  `;

  // Insert at the beginning of the dashboard
  const dashboard = document.querySelector('.dashboard-grid');
  dashboard.insertBefore(navigationIndexWidget, dashboard.firstChild);

  // Add event listeners
  const refreshBtn = navigationIndexWidget.querySelector('.refresh-btn');
  refreshBtn.addEventListener('click', () => {
    console.log('Refreshing Navigation Index');
    // Animation for refresh
    refreshBtn.classList.add('rotating');
    setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
  });
}

// Doomsday Clock Widget Implementation
function initializeDoomsdayClock() {
  const doomsdayClockHTML = `
    <div class="doomsday-clock">
      <div class="clock-container">
        <div class="clock-face">
          <div class="midnight-marker"></div>
          <div class="hour-hand"></div>
          <div class="minute-hand"></div>
          <div class="clock-center"></div>
        </div>
        <div class="clock-time">
          <span class="value">100</span>
          <span class="unit">seconds to midnight</span>
        </div>
      </div>
      
      <div class="global-threats-map">
        <h5>Global Threat Distribution</h5>
        <div class="spiky-world-container" id="spiky-world-map">
          <!-- Spiky World visualization will be rendered here -->
        </div>
        
        <div class="threat-categories">
          <div class="threat-category">
            <div class="threat-label">Nuclear Risk</div>
            <div class="threat-meter">
              <div class="threat-level" style="width: 75%;"></div>
            </div>
          </div>
          <div class="threat-category">
            <div class="threat-label">Climate Change</div>
            <div class="threat-meter">
              <div class="threat-level" style="width: 85%;"></div>
            </div>
          </div>
          <div class="threat-category">
            <div class="threat-label">Disruptive Technologies</div>
            <div class="threat-meter">
              <div class="threat-level" style="width: 70%;"></div>
            </div>
          </div>
          <div class="threat-category">
            <div class="threat-label">Biological Threats</div>
            <div class="threat-meter">
              <div class="threat-level" style="width: 65%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Create doomsday clock widget
  const doomsdayClockWidget = document.createElement('div');
  doomsdayClockWidget.className = 'widget';
  doomsdayClockWidget.id = 'doomsday-clock-widget';
  doomsdayClockWidget.innerHTML = `
    <div class="widget-header">
      <h4>Doomsday Clock</h4>
      <div class="widget-controls">
        <button class="refresh-btn" title="Refresh"><i class="fas fa-sync-alt"></i></button>
        <button class="expand-btn" title="Expand"><i class="fas fa-expand-alt"></i></button>
      </div>
    </div>
    <div class="widget-content">
      ${doomsdayClockHTML}
    </div>
  `;

  // Insert after the navigation index
  const navigationIndexWidget = document.getElementById('navigation-index-widget');
  navigationIndexWidget.parentNode.insertBefore(doomsdayClockWidget, navigationIndexWidget.nextSibling);

  // Render Spiky World visualization
  renderSpikyWorldMap();

  // Add event listeners
  const refreshBtn = doomsdayClockWidget.querySelector('.refresh-btn');
  refreshBtn.addEventListener('click', () => {
    console.log('Refreshing Doomsday Clock');
    // Animation for refresh
    refreshBtn.classList.add('rotating');
    setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
    
    // Animate clock hands
    const minuteHand = doomsdayClockWidget.querySelector('.minute-hand');
    const hourHand = doomsdayClockWidget.querySelector('.hour-hand');
    
    minuteHand.style.transition = 'transform 1s ease-in-out';
    hourHand.style.transition = 'transform 1s ease-in-out';
    
    minuteHand.style.transform = 'translate(-50%, -100%) rotate(10deg)';
    hourHand.style.transform = 'translate(-50%, -100%) rotate(340deg)';
    
    setTimeout(() => {
      minuteHand.style.transform = 'translate(-50%, -100%) rotate(0deg)';
      hourHand.style.transform = 'translate(-50%, -100%) rotate(330deg)';
    }, 1000);
  });
}

// Function to render Spiky World Map
function renderSpikyWorldMap() {
  // This would normally use D3.js or another visualization library
  // For now, we'll create a simplified version with HTML/CSS
  
  const spikyWorldContainer = document.getElementById('spiky-world-map');
  
  // Create a basic world map outline
  const worldMapHTML = `
    <div class="world-map-container">
      <div class="world-map-outline"></div>
      <div class="threat-spike" style="top: 30%; left: 25%; height: 80px;"></div>
      <div class="threat-spike" style="top: 35%; left: 48%; height: 100px;"></div>
      <div class="threat-spike" style="top: 40%; left: 75%; height: 90px;"></div>
      <div class="threat-spike" style="top: 60%; left: 30%; height: 60px;"></div>
      <div class="threat-spike" style="top: 25%; left: 80%; height: 70px;"></div>
      <div class="threat-spike" style="top: 50%; left: 60%; height: 85px;"></div>
      <div class="threat-label" style="top: 20%; left: 25%;">North America</div>
      <div class="threat-label" style="top: 25%; left: 48%;">Europe</div>
      <div class="threat-label" style="top: 30%; left: 75%;">Asia</div>
      <div class="threat-label" style="top: 50%; left: 30%;">South America</div>
      <div class="threat-label" style="top: 15%; left: 80%;">Russia</div>
      <div class="threat-label" style="top: 40%; left: 60%;">Middle East</div>
    </div>
  `;
  
  spikyWorldContainer.innerHTML = worldMapHTML;
  
  // Add CSS for the Spiky World Map
  const style = document.createElement('style');
  style.textContent = `
    .world-map-container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
    }
    
    .world-map-outline {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 60%;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }
    
    .threat-spike {
      position: absolute;
      width: 20px;
      background: linear-gradient(to top, rgba(255, 0, 160, 0.7) 0%, rgba(255, 0, 160, 0) 100%);
      border-radius: 10px;
      transform-origin: bottom center;
      animation: pulse-threat 3s infinite alternate;
    }
    
    .threat-label {
      position: absolute;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    @keyframes pulse-threat {
      0% {
        opacity: 0.7;
        height: 100%;
      }
      100% {
        opacity: 1;
        height: 110%;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Project Manifesto Widget Implementation
function initializeProjectManifesto() {
  const manifestoHTML = `
    <div class="manifesto-container">
      <h3 class="manifesto-title">EARTH CONTROL INTERFACE MANIFESTO</h3>
      
      <div class="manifesto-section">
        <h5>One Planetary Species</h5>
        <p>We stand at a critical moment in Earth's history, where humanity must recognize itself as a single planetary species. Beyond borders, languages, and ideologies, we share one home—a finite planet with interconnected systems that sustain all life. This interface exists to visualize our collective impact and inspire unified action.</p>
      </div>
      
      <div class="manifesto-section">
        <h5>Our Intrinsic Connection</h5>
        <p>Humans are not separate from nature but integral to it. The resources we depend on—air, water, soil, energy—are part of complex ecosystems that have evolved over billions of years. By monitoring these systems in real-time, we make visible the invisible connections that bind us to our planet and to each other.</p>
      </div>
      
      <div class="manifesto-section">
        <h5>Beyond Artificial Divisions</h5>
        <p>The challenges we face transcend the artificial boundaries we've created. Climate change, biodiversity loss, and resource depletion affect all humanity regardless of nationality, wealth, or belief. This interface presents a unified view of our world, free from the constraints of geopolitical divisions.</p>
      </div>
      
      <div class="manifesto-footer">
        <p>Through the synergy of human creativity and artificial intelligence, we can visualize, understand, and ultimately heal our planetary systems.</p>
        <div class="manifesto-signature">— Ivan Tamayo Ramos, Founder</div>
        <button class="read-full-btn" id="read-full-manifesto">Read Full Manifesto</button>
      </div>
    </div>
  `;

  // Create manifesto widget
  const manifestoWidget = document.createElement('div');
  manifestoWidget.className = 'widget';
  manifestoWidget.id = 'manifesto-widget';
  manifestoWidget.innerHTML = `
    <div class="widget-header">
      <h4>Project Manifesto</h4>
      <div class="widget-controls">
        <button class="refresh-btn" title="Refresh"><i class="fas fa-sync-alt"></i></button>
        <button class="expand-btn" title="Expand"><i class="fas fa-expand-alt"></i></button>
      </div>
    </div>
    <div class="widget-content">
      ${manifestoHTML}
    </div>
  `;

  // Insert after the doomsday clock
  const doomsdayClockWidget = document.getElementById('doomsday-clock-widget');
  doomsdayClockWidget.parentNode.insertBefore(manifestoWidget, doomsdayClockWidget.nextSibling);

  // Add event listeners
  const readFullBtn = manifestoWidget.querySelector('#read-full-manifesto');
  readFullBtn.addEventListener('click', () => {
    console.log('Opening full manifesto');
    showManifestoModal();
  });
  
  const refreshBtn = manifestoWidget.querySelector('.refresh-btn');
  refreshBtn.addEventListener('click', () => {
    console.log('Refreshing Manifesto');
    // Animation for refresh
    refreshBtn.classList.add('rotating');
    setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
  });
}

// Function to show full manifesto modal
function showManifestoModal() {
  const modalHTML = `
    <div class="manifesto-modal">
      <div class="manifesto-modal-content">
        <div class="modal-header">
          <h3>EcosystemServices.world Manifesto</h3>
          <button class="close-modal-btn">&times;</button>
        </div>
        <div class="modal-body">
          <h2>EARTH CONTROL INTERFACE MANIFESTO</h2>
          
          <h3>One Planetary Species</h3>
          <p>We stand at a critical moment in Earth's history, where humanity must recognize itself as a single planetary species. Beyond borders, languages, and ideologies, we share one home—a finite planet with interconnected systems that sustain all life. This interface exists to visualize our collective impact and inspire unified action.</p>
          
          <h3>Our Intrinsic Connection</h3>
          <p>Humans are not separate from nature but integral to it. The resources we depend on—air, water, soil, energy—are part of complex ecosystems that have evolved over billions of years. By monitoring these systems in real-time, we make visible the invisible connections that bind us to our planet and to each other.</p>
          
          <h3>Beyond Artificial Divisions</h3>
          <p>The challenges we face transcend the artificial boundaries we've created. Climate change, biodiversity loss, and resource depletion affect all humanity regardless of nationality, wealth, or belief. This interface presents a unified view of our world, free from the constraints of geopolitical divisions.</p>
          
          <h3>The Power of Human-AI Collaboration</h3>
          <p>The complexity of Earth's systems exceeds human comprehension alone. Through collaboration between human creativity and artificial intelligence, we can process, visualize, and understand the vast amounts of data needed to make informed decisions about our planetary future.</p>
          
          <h3>Information as Empowerment</h3>
          <p>Access to real-time, accurate information about our planet's health is not a luxury—it is a necessity for informed action. This interface democratizes environmental data, making it accessible and understandable to all, regardless of technical expertise.</p>
          
          <h3>Hope Through Synergy</h3>
          <p>We reject both blind optimism and paralyzing despair. Instead, we embrace a pragmatic hope based on the synergy between human ingenuity and technological capability. Together, humans and AI can solve the complex challenges facing our world, but only if we act with purpose and urgency.</p>
          
          <div class="manifesto-closing">Through the synergy of human creativity and artificial intelligence, we can visualize, understand, and ultimately heal our planetary systems.</div>
          
          <div class="manifesto-signature">— Ivan Tamayo Ramos, Founder of EcosystemServices.world</div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to the document
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstChild);
  
  // Add event listener to close button
  const closeBtn = document.querySelector('.close-modal-btn');
  closeBtn.addEventListener('click', () => {
    document.querySelector('.manifesto-modal').remove();
  });
  
  // Close modal when clicking outside content
  const modal = document.querySelector('.manifesto-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Founder Biography Widget Implementation
function initializeFounderBiography() {
  const founderHTML = `
    <div class="founder-container">
      <div class="founder-header">
        <div class="founder-avatar"></div>
        <div class="founder-title">
          <h3>Ivan Tamayo Ramos</h3>
          <div class="founder-headline">International Architecture & Urban Design Consultant with expertise in sustainable and regenerative design</div>
        </div>
      </div>
      
      <div class="founder-bio">
        <p>Ivan Tamayo Ramos is the visionary founder of EcosystemServices.world, combining his expertise in architecture, urban design, and sustainability to create a platform that visualizes our planet's health in real-time. With a background spanning multiple disciplines and international experience, Ivan brings a unique perspective to environmental monitoring and planetary awareness.</p>
        
        <div class="bio-section">
          <h5>Areas of Expertise</h5>
          <div class="expertise-grid">
            <div class="expertise-item">
              <div class="expertise-icon">🏙️</div>
              <div class="expertise-label">Urban Design</div>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">🌱</div>
              <div class="expertise-label">Sustainable Architecture</div>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">🔄</div>
              <div class="expertise-label">Regenerative Design</div>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">🌍</div>
              <div class="expertise-label">Environmental Systems</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="founder-footer">
        <button class="read-full-btn" id="read-full-bio">View Complete Biography</button>
        <div class="founder-connect">
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">Website</a>
        </div>
      </div>
    </div>
  `;

  // Create founder biography widget
  const founderWidget = document.createElement('div');
  founderWidget.className = 'widget';
  founderWidget.id = 'founder-widget';
  founderWidget.innerHTML = `
    <div class="widget-header">
      <h4>Founder Biography</h4>
      <div class="widget-controls">
        <button class="refresh-btn" title="Refresh"><i class="fas fa-sync-alt"></i></button>
        <button class="expand-btn" title="Expand"><i class="fas fa-expand-alt"></i></button>
      </div>
    </div>
    <div class="widget-content">
      ${founderHTML}
    </div>
  `;

  // Insert after the manifesto widget
  const manifestoWidget = document.getElementById('manifesto-widget');
  manifestoWidget.parentNode.insertBefore(founderWidget, manifestoWidget.nextSibling);

  // Add event listeners
  const readFullBtn = founderWidget.querySelector('#read-full-bio');
  readFullBtn.addEventListener('click', () => {
    console.log('Opening full biography');
    showFounderModal();
  });
  
  const refreshBtn = founderWidget.querySelector('.refresh-btn');
  refreshBtn.addEventListener('click', () => {
    console.log('Refreshing Founder Biography');
    // Animation for refresh
    refreshBtn.classList.add('rotating');
    setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
  });
}

// Function to show full founder biography modal
function showFounderModal() {
  const modalHTML = `
    <div class="founder-modal">
      <div class="founder-modal-content">
        <div class="modal-header">
          <h3>Founder Biography</h3>
          <button class="close-modal-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="founder-full-header">
            <div class="founder-avatar large"></div>
            <div class="founder-details">
              <h2>Ivan Tamayo Ramos</h2>
              <p class="founder-headline">International Architecture & Urban Design Consultant</p>
              <div class="founder-contact">
                <div class="contact-item">
                  <span class="label">Email:</span>
                  <a href="mailto:contact@ecosystemservices.world">contact@ecosystemservices.world</a>
                </div>
                <div class="contact-item">
                  <span class="label">Location:</span>
                  <span>Global</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bio-full-section">
            <h4>Professional Summary</h4>
            <p>Ivan Tamayo Ramos is an accomplished International Architecture & Urban Design Consultant with extensive expertise in sustainable and regenerative design. As the founder of EcosystemServices.world, he has pioneered a new approach to environmental monitoring that combines cyberpunk aesthetics with real-time data visualization to create awareness about our planet's health.</p>
            <p>With a vision of humanity as one planetary species beyond borders, languages, and ideologies, Ivan has dedicated his career to creating solutions that bridge the gap between human development and environmental sustainability. His interdisciplinary background allows him to approach complex problems with innovative perspectives.</p>
          </div>
          
          <div class="bio-full-section">
            <h4>Core Competencies</h4>
            <ul class="competencies-list">
              <li>Sustainable Architecture</li>
              <li>Urban Planning & Design</li>
              <li>Regenerative Design Systems</li>
              <li>Environmental Impact Assessment</li>
              <li>Data Visualization</li>
              <li>Human-Computer Interaction</li>
              <li>Ecosystem Services Valuation</li>
              <li>Climate Adaptation Strategies</li>
              <li>Circular Economy Implementation</li>
              <li>Interdisciplinary Collaboration</li>
              <li>Project Management</li>
              <li>International Consulting</li>
            </ul>
          </div>
          
          <div class="bio-full-section">
            <h4>Professional Experience</h4>
            <div class="experience-item">
              <div class="experience-header">
                <div class="position">Founder & Director</div>
                <div class="location-date">EcosystemServices.world | 2023 - Present</div>
              </div>
              <div class="experience-description">
                <p>Created and developed the Earth Control Interface, a cyberpunk-inspired platform for visualizing ecosystem services data and environmental metrics in real-time. The platform aims to create awareness about our planet's health through human-AI collaboration.</p>
                <ul>
                  <li>Conceptualized and implemented the innovative "Earth Control Interface" design</li>
                  <li>Developed a comprehensive framework for human-AI interaction in environmental monitoring</li>
                  <li>Integrated multiple data sources to provide real-time ecosystem services metrics</li>
                  <li>Created a manifesto expressing the vision of humanity as one planetary species</li>
                </ul>
              </div>
            </div>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="position">International Architecture & Urban Design Consultant</div>
                <div class="location-date">Global | 2015 - Present</div>
              </div>
              <div class="experience-description">
                <p>Provide expert consultation on sustainable and regenerative design for architectural and urban development projects worldwide. Specialize in integrating ecosystem services into the built environment.</p>
                <ul>
                  <li>Consulted on major urban development projects across multiple continents</li>
                  <li>Developed innovative approaches to incorporating natural systems into urban design</li>
                  <li>Created assessment frameworks for measuring ecosystem services in urban environments</li>
                  <li>Advised on climate adaptation strategies for vulnerable urban areas</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bio-full-section">
            <h4>Education</h4>
            <div class="experience-item">
              <div class="experience-header">
                <div class="position">Master's Degree in Sustainable Urban Design</div>
                <div class="location-date">Leading University | 2013</div>
              </div>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <div class="position">Bachelor's Degree in Architecture</div>
                <div class="location-date">Prestigious Institute | 2010</div>
              </div>
            </div>
          </div>
          
          <div class="bio-full-section">
            <h4>Vision for EcosystemServices.world</h4>
            <p>Ivan envisions EcosystemServices.world as more than just a data visualization platform—it's a movement toward planetary consciousness. By combining cutting-edge technology with environmental science and cyberpunk aesthetics, the project aims to make complex ecological data accessible and engaging to a global audience.</p>
            <p>The ultimate goal is to foster a sense of planetary citizenship, where individuals recognize their role in Earth's interconnected systems and are empowered to make informed decisions that benefit both humanity and the natural world. Through the synergy of human creativity and artificial intelligence, Ivan believes we can solve our most pressing environmental challenges.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to the document
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstChild);
  
  // Add event listener to close button
  const closeBtn = document.querySelector('.close-modal-btn');
  closeBtn.addEventListener('click', () => {
    document.querySelector('.founder-modal').remove();
  });
  
  // Close modal when clicking outside content
  const modal = document.querySelector('.founder-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Global Market Widget Implementation
function initializeGlobalMarket() {
  const globalMarketHTML = `
    <div class="global-market">
      <div class="market-overview">
        <div class="market-metric">
          <div class="market-metric-value">$38.7T</div>
          <div class="market-metric-label">Global ESG Assets</div>
        </div>
        <div class="market-metric">
          <div class="market-metric-value">+12.3%</div>
          <div class="market-metric-label">Annual Growth Rate</div>
        </div>
        <div class="market-metric">
          <div class="market-metric-value">$287B</div>
          <div class="market-metric-label">Green Bond Issuance</div>
        </div>
        <div class="market-metric">
          <div class="market-metric-value">1,842</div>
          <div class="market-metric-label">Sustainability Funds</div>
        </div>
      </div>
      
      <div class="market-chart-container" id="global-market-chart">
        <!-- Spiky World market visualization will be rendered here -->
      </div>
      
      <div class="market-indices">
        <h5>Sustainability Indices</h5>
        <div class="indices-grid">
          <div class="index-item">
            <div class="index-name">MSCI World ESG</div>
            <div class="index-value">3,247.82</div>
            <div class="index-change positive">+1.2%</div>
          </div>
          <div class="index-item">
            <div class="index-name">S&P Global Clean Energy</div>
            <div class="index-value">892.37</div>
            <div class="index-change positive">+2.8%</div>
          </div>
          <div class="index-item">
            <div class="index-name">FTSE4Good Global</div>
            <div class="index-value">7,124.56</div>
            <div class="index-change positive">+0.7%</div>
          </div>
          <div class="index-item">
            <div class="index-name">Dow Jones Sustainability</div>
            <div class="index-value">1,532.19</div>
            <div class="index-change negative">-0.3%</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Create global market widget
  const globalMarketWidget = document.createElement('div');
  globalMarketWidget.className = 'widget';
  globalMarketWidget.id = 'global-market-widget';
  globalMarketWidget.innerHTML = `
    <div class="widget-header">
      <h4>Global Market Monitor</h4>
      <div class="widget-controls">
        <button class="refresh-btn" title="Refresh"><i class="fas fa-sync-alt"></i></button>
        <button class="expand-btn" title="Expand"><i class="fas fa-expand-alt"></i></button>
      </div>
    </div>
    <div class="widget-content">
      ${globalMarketHTML}
    </div>
  `;

  // Insert after the founder widget
  const founderWidget = document.getElementById('founder-widget');
  founderWidget.parentNode.insertBefore(globalMarketWidget, founderWidget.nextSibling);

  // Render Global Market chart
  renderGlobalMarketChart();

  // Add event listeners
  const refreshBtn = globalMarketWidget.querySelector('.refresh-btn');
  refreshBtn.addEventListener('click', () => {
    console.log('Refreshing Global Market Monitor');
    // Animation for refresh
    refreshBtn.classList.add('rotating');
    setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
    
    // Update market values with slight changes
    const marketValues = globalMarketWidget.querySelectorAll('.market-metric-value');
    marketValues.forEach(value => {
      if (value.textContent.includes('$')) {
        const numValue = parseFloat(value.textContent.replace('$', '').replace('T', '').replace('B', ''));
        const change = (Math.random() * 0.1 - 0.05) * numValue;
        let newValue = numValue + change;
        
        if (value.textContent.includes('T')) {
          newValue = '$' + newValue.toFixed(1) + 'T';
        } else if (value.textContent.includes('B')) {
          newValue = '$' + newValue.toFixed(1) + 'B';
        }
        
        value.textContent = newValue;
      } else if (value.textContent.includes('%')) {
        const numValue = parseFloat(value.textContent.replace('%', '').replace('+', ''));
        const change = (Math.random() * 0.5 - 0.25);
        const newValue = '+' + (numValue + change).toFixed(1) + '%';
        value.textContent = newValue;
      } else {
        const numValue = parseInt(value.textContent);
        const change = Math.floor((Math.random() * 20 - 10));
        value.textContent = (numValue + change).toString();
      }
    });
    
    // Update index values
    const indexValues = globalMarketWidget.querySelectorAll('.index-value');
    const indexChanges = globalMarketWidget.querySelectorAll('.index-change');
    
    indexValues.forEach((value, i) => {
      const numValue = parseFloat(value.textContent.replace(',', ''));
      const change = (Math.random() * 0.02 - 0.01) * numValue;
      const newValue = (numValue + change).toFixed(2);
      value.textContent = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      const changeValue = (change / numValue * 100).toFixed(1);
      const changeElement = indexChanges[i];
      
      if (changeValue > 0) {
        changeElement.textContent = '+' + changeValue + '%';
        changeElement.className = 'index-change positive';
      } else {
        changeElement.textContent = changeValue + '%';
        changeElement.className = 'index-change negative';
      }
    });
  });
}

// Function to render Global Market chart
function renderGlobalMarketChart() {
  // This would normally use D3.js or another visualization library
  // For now, we'll create a simplified version with HTML/CSS
  
  const chartContainer = document.getElementById('global-market-chart');
  
  // Create a basic market activity visualization
  const marketChartHTML = `
    <div class="market-map-container">
      <div class="market-map-outline"></div>
      <div class="market-spike" style="top: 30%; left: 25%; height: 100px;"></div>
      <div class="market-spike" style="top: 35%; left: 48%; height: 120px;"></div>
      <div class="market-spike" style="top: 40%; left: 75%; height: 90px;"></div>
      <div class="market-spike" style="top: 60%; left: 30%; height: 40px;"></div>
      <div class="market-spike" style="top: 25%; left: 80%; height: 60px;"></div>
      <div class="market-spike" style="top: 50%; left: 60%; height: 70px;"></div>
      <div class="market-label" style="top: 20%; left: 25%;">North America</div>
      <div class="market-label" style="top: 25%; left: 48%;">Europe</div>
      <div class="market-label" style="top: 30%; left: 75%;">Asia</div>
      <div class="market-label" style="top: 50%; left: 30%;">South America</div>
      <div class="market-label" style="top: 15%; left: 80%;">Russia</div>
      <div class="market-label" style="top: 40%; left: 60%;">Middle East</div>
      <div class="market-legend">
        <div class="legend-item">
          <div class="legend-color" style="background-color: var(--primary-color);"></div>
          <div class="legend-text">ESG Investment Activity</div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: var(--accent-color);"></div>
          <div class="legend-text">Market Volume</div>
        </div>
      </div>
    </div>
  `;
  
  chartContainer.innerHTML = marketChartHTML;
  
  // Add CSS for the Market Chart
  const style = document.createElement('style');
  style.textContent = `
    .market-map-container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
    }
    
    .market-map-outline {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 60%;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }
    
    .market-spike {
      position: absolute;
      width: 30px;
      background: linear-gradient(to top, var(--primary-color) 0%, rgba(0, 255, 157, 0) 100%);
      border-radius: 15px;
      transform-origin: bottom center;
      animation: pulse-market 5s infinite alternate;
    }
    
    .market-label {
      position: absolute;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .market-legend {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .legend-color {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .legend-text {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    @keyframes pulse-market {
      0% {
        opacity: 0.7;
        height: 100%;
      }
      100% {
        opacity: 1;
        height: 110%;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize all widgets
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS for widget animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .rotating {
      animation: rotating 1s linear;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize widgets
  initializeNavigationIndex();
  initializeDoomsdayClock();
  initializeProjectManifesto();
  initializeFounderBiography();
  initializeGlobalMarket();
});
