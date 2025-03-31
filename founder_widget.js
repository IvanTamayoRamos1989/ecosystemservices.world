// Founder Widget for EcosystemServices.world
// This script creates a widget to display the founder's biography

document.addEventListener('DOMContentLoaded', function() {
    // Create the Founder widget container
    const dashboardSection = document.querySelector('.dashboard');
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'widget large';
    widgetContainer.id = 'founder-widget';
    widgetContainer.setAttribute('data-category', 'archive');
    
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
                    
                    <div class="bio-section">
                        <h5>EXPERTISE</h5>
                        <div class="expertise-grid">
                            <div class="expertise-item">
                                <div class="expertise-icon sustainable"></div>
                                <div class="expertise-label">Sustainable Design</div>
                            </div>
                            <div class="expertise-item">
                                <div class="expertise-icon urban"></div>
                                <div class="expertise-label">Urban Planning</div>
                            </div>
                            <div class="expertise-item">
                                <div class="expertise-icon ai"></div>
                                <div class="expertise-label">AI Solutions</div>
                            </div>
                            <div class="expertise-item">
                                <div class="expertise-icon cultural"></div>
                                <div class="expertise-label">Cultural Heritage</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bio-section">
                        <h5>CURRENT WORK</h5>
                        <p>Currently a Fellow at the Norman Foster Institute in Madrid, Spain, focusing on innovative architecture and urban design practices dedicated to creating sustainable, resilient, and regenerative environments. Specializes in the harmonious integration of ecological principles and urban design to foster thriving communities and restore natural systems.</p>
                    </div>
                </div>
                
                <div class="founder-footer">
                    <button class="read-full-btn">VIEW FULL BIOGRAPHY</button>
                    <div class="founder-connect">
                        <a href="https://www.linkedin.com/in/ivan-tamayo-ramos-099a3255/" target="_blank" class="social-link linkedin">LinkedIn</a>
                        <a href="https://www.tamayoramos.com/" target="_blank" class="social-link website">Website</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add the widget to the dashboard
    dashboardSection.querySelector('.dashboard-grid').appendChild(widgetContainer);
    
    // Add event listener for "View Full Biography" button
    document.querySelector('.read-full-btn').addEventListener('click', function() {
        openFounderModal();
    });
    
    // Create modal for full biography
    function openFounderModal() {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'founder-modal';
        
        // Add modal content
        modalContainer.innerHTML = `
            <div class="founder-modal-content">
                <div class="modal-header">
                    <h3>IVAN TAMAYO RAMOS</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="founder-full-header">
                        <div class="founder-avatar large"></div>
                        <div class="founder-details">
                            <div class="founder-headline">International Architecture & Urban Design Consultant | Sustainable & Regenerative Design Expert | AI-Powered Solutions for Ecological Development</div>
                            <div class="founder-contact">
                                <div class="contact-item">
                                    <span class="label">Email:</span>
                                    <span class="value">ivantamayoramos@gmail.com</span>
                                </div>
                                <div class="contact-item">
                                    <span class="label">LinkedIn:</span>
                                    <a href="https://www.linkedin.com/in/ivan-tamayo-ramos-099a3255/" target="_blank" class="value">ivan-tamayo-ramos-099a3255</a>
                                </div>
                                <div class="contact-item">
                                    <span class="label">Website:</span>
                                    <a href="https://www.tamayoramos.com/" target="_blank" class="value">www.tamayoramos.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>PROFESSIONAL SUMMARY</h4>
                        <p>Results-driven urban development specialist with a proven track record of providing expert consultation on sustainable strategies, urban planning, and design for international projects. Expertise in integrating cultural heritage, creative economy, and social development components. Experienced in leading cross-functional teams, engaging stakeholders, and offering technical advice across diverse sectors to achieve impactful and sustainable urban solutions.</p>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>CORE COMPETENCIES</h4>
                        <ul class="competencies-list">
                            <li>Urban Planning and Sustainable Design</li>
                            <li>Cultural Heritage Integration</li>
                            <li>Creative Economy Development</li>
                            <li>Project Management and Leadership</li>
                            <li>Stakeholder Engagement and Communication</li>
                            <li>Sustainable Development Strategies</li>
                        </ul>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>PROFESSIONAL EXPERIENCE</h4>
                        
                        <div class="experience-item">
                            <div class="experience-header">
                                <div class="position">Fellow | Norman Foster Institute</div>
                                <div class="location-date">Madrid, Spain | January 2025 – Present</div>
                            </div>
                            <div class="experience-description">
                                <p>Innovative architecture and urban design practice dedicated to creating sustainable, resilient, and regenerative environments, specializing in the harmonious integration of ecological principles and urban design to foster thriving communities and restore natural systems.</p>
                                <ul>
                                    <li>Currently providing consultation to a land developer in Mexico, analyzing the recently updated Urban Development Plan, Zoning, and Land Use documents to advise on the best development strategy.</li>
                                    <li>Leading a design team on the rehabilitation and expansion of a modernist house in Mexico, transforming it into a cultural center with a botanical garden and an amphitheater.</li>
                                    <li>Designing a sustainable beach house in Baja California Sur for commercial use.</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="experience-item">
                            <div class="experience-header">
                                <div class="position">Urban Consultant | GC1: MAPASIN and Parques Alegres</div>
                                <div class="location-date">Remote - Mexico | January 2024 - December 2024</div>
                            </div>
                            <div class="experience-description">
                                <ul>
                                    <li>Led urban regeneration project in Culiacan's historic center, Mexico, integrating heritage preservation with modern urban planning techniques.</li>
                                    <li>Designed adaptive reuse of social housing ruins for cultural and commercial activities.</li>
                                    <li>Facilitated collaboration between MAPASIN and the Bloomberg Road Initiative.</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="experience-item">
                            <div class="experience-header">
                                <div class="position">Fellow | Norman Foster Institute</div>
                                <div class="location-date">Madrid, Spain | January 2024 - November 2024</div>
                            </div>
                            <div class="experience-description">
                                <ul>
                                    <li>Developed a conservation and sustainable development plan for the Republic of San Marino.</li>
                                    <li>Collaborated in urban consulting projects, integrating cultural and heritage aspects.</li>
                                    <li>Provided technical advice on sustainable city development strategies.</li>
                                    <li>Worked in an international multidisciplinary team in developing innovative urban solutions.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>EDUCATION</h4>
                        <ul class="education-list">
                            <li>
                                <div class="degree">URBAN AI</div>
                                <div class="institution-date">Paris, France | March 2025 – April 2025</div>
                                <div class="description">Professional program on urban artificial intelligence, exploring the transformative potential of AI through interconnected modules. Expertise in leveraging AI for urban insights, generative design, and scenario planning.</div>
                            </li>
                            <li>
                                <div class="degree">Sustainable Cities Leadership Program</div>
                                <div class="institution-date">Norman Foster Institute, Madrid | June 2024 - November 2024</div>
                            </li>
                            <li>
                                <div class="degree">Master's in Architecture and Urbanism</div>
                                <div class="institution-date">Architectural Institute in Prague | September 2018 - June 2020</div>
                            </li>
                            <li>
                                <div class="degree">Bachelor's in Architecture and Urbanism</div>
                                <div class="institution-date">Architectural Institute in Prague | September 2011 - June 2014</div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>KEY PROJECTS AND ACHIEVEMENTS</h4>
                        <ul>
                            <li>Developed a conservation and sustainable development plan for San Marino (2023-2024), incorporating sustainable practices and preserving cultural heritage.</li>
                            <li>Led urban regeneration project in Culiacan's historic center (2022-2023), revitalizing the area and promoting economic growth.</li>
                            <li>Established philanthropic foundation at Costa Palmas, generating capital and resources for social development projects (2015-2021).</li>
                            <li>Designed and constructed social housing and community centers using sustainable techniques, improving living conditions for agricultural workers (2015-2021).</li>
                        </ul>
                    </div>
                    
                    <div class="bio-full-section">
                        <h4>VISION FOR ECOSYSTEMSERVICES.WORLD</h4>
                        <p>As the founder of EcosystemServices.world, Ivan combines his expertise in sustainable urban design with cutting-edge AI technology to create a platform that visualizes our planet's vital systems. His vision is to foster a new understanding of humanity's relationship with Earth's ecosystems, transcending borders and ideologies to promote a unified planetary consciousness.</p>
                        <p>Drawing on his experience with the Norman Foster Institute and his training in Urban AI, Ivan has created the Earth Control Interface as a tool for monitoring and understanding the complex interrelationships between human activities and natural systems. This project represents the culmination of his work in sustainable development, cultural heritage preservation, and technological innovation.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modalContainer);
        
        // Add event listener for close button
        modalContainer.querySelector('.close-modal-btn').addEventListener('click', function() {
            document.body.removeChild(modalContainer);
        });
        
        // Close modal when clicking outside content
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                document.body.removeChild(modalContainer);
            }
        });
    }
});

// Add CSS for the Founder widget and modal
const founderStyles = document.createElement('style');
founderStyles.textContent = `
    .founder-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--text-color);
        overflow-y: auto;
        padding-right: 10px;
    }
    
    .founder-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .founder-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #333;
        margin-right: 15px;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid var(--primary-color);
        box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    }
    
    .founder-title {
        flex: 1;
    }
    
    .founder-title h3 {
        font-size: 1.2rem;
        margin: 0 0 5px 0;
        color: var(--primary-color);
    }
    
    .founder-headline {
        font-size: 0.8rem;
        color: #ccc;
        line-height: 1.4;
    }
    
    .founder-bio {
        margin-bottom: 20px;
    }
    
    .founder-bio p {
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 15px;
    }
    
    .bio-section {
        margin-bottom: 15px;
    }
    
    .bio-section h5 {
        font-size: 0.9rem;
        margin-bottom: 8px;
        color: var(--secondary-color);
    }
    
    .expertise-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    
    .expertise-item {
        display: flex;
        align-items: center;
    }
    
    .expertise-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 8px;
    }
    
    .expertise-icon.sustainable {
        background: linear-gradient(135deg, #00ff9d, #00a86b);
    }
    
    .expertise-icon.urban {
        background: linear-gradient(135deg, #00bfff, #0080ff);
    }
    
    .expertise-icon.ai {
        background: linear-gradient(135deg, #ff00a0, #cc0080);
    }
    
    .expertise-icon.cultural {
        background: linear-gradient(135deg, #ffcc00, #ff9d00);
    }
    
    .expertise-label {
        font-size: 0.8rem;
    }
    
    .founder-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .read-full-btn {
        background: var(--primary-color);
        color: #111;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .read-full-btn:hover {
        background: #00cc7d;
    }
    
    .founder-connect {
        display: flex;
    }
    
    .social-link {
        margin-left: 10px;
        color: #ccc;
        text-decoration: none;
        font-size: 0.8rem;
        transition: color 0.2s ease;
    }
    
    .social-link:hover {
        color: var(--primary-color);
    }
    
    /* Modal styles */
    .founder-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .founder-modal-content {
        background: #111;
        width: 80%;
        max-width: 800px;
        max-height: 90vh;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
        overflow: hidden;
        animation: modal-appear 0.3s ease;
    }
    
    @keyframes modal-appear {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: #1a1a2e;
        border-bottom: 1px solid #333;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--primary-color);
    }
    
    .close-modal-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    .close-modal-btn:hover {
        color: var(--primary-color);
    }
    
    .modal-body {
        padding: 20px;
        overflow-y: auto;
        max-height: calc(90vh - 60px);
    }
    
    .founder-full-header {
        display: flex;
        margin-bottom: 30px;
    }
    
    .founder-avatar.large {
        width: 120px;
        height: 120px;
        margin-right: 20px;
    }
    
    .founder-details {
        flex: 1;
    }
    
    .founder-contact {
        margin-top: 15px;
    }
    
    .contact-item {
        margin-bottom: 5px;
        font-size: 0.9rem;
    }
    
    .contact-item .label {
        color: #888;
        margin-right: 5px;
    }
    
    .contact-item .value {
        color: #ccc;
    }
    
    .contact-item a.value {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .contact-item a.value:hover {
        text-decoration: underline;
    }
    
    .bio-full-section {
        margin-bottom: 25px;
    }
    
    .bio-full-section h4 {
        color: var(--secondary-color);
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #333;
    }
    
    .bio-full-section p {
        margin-bottom: 10px;
        line-height: 1.6;
    }
    
    .bio-full-section ul {
        padding-left: 20px;
        margin-bottom: 10px;
    }
    
    .bio-full-section li {
        margin-bottom: 8px;
        line-height: 1.4;
    }
    
    .competencies-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding-left: 0;
        list-style: none;
    }
    
    .competencies-list li {
        position: relative;
        padding-left: 20px;
    }
    
    .competencies-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
    }
    
    .experience-item {
        margin-bottom: 20px;
    }
    
    .experience-header {
        margin-bottom: 10px;
    }
    
    .position {
        font-weight: bold;
        color: #fff;
    }
    
    .location-date {
        font-size: 0.9rem;
        color: #888;
    }
    
    .experience-description ul {
        padding-left: 20px;
    }
    
    .education-list {
        list-style: none;
        padding-left: 0;
    }
    
    .education-list li {
        margin-bottom: 15px;
    }
    
    .degree {
        font-weight: bold;
        color: #fff;
    }
    
    .institution-date {
        font-size: 0.9rem;
        color: #888;
        margin-bottom: 5px;
    }
    
    .description {
        font-size: 0.9rem;
        line-height: 1.4;
    }
`;

document.head.appendChild(founderStyles);
