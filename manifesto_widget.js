// Manifesto Widget for EcosystemServices.world
// This script creates a widget to display the project manifesto

document.addEventListener('DOMContentLoaded', function() {
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
                
                <div class="manifesto-section">
                    <h5>ONE WITH NATURE</h5>
                    <p>Humanity is not separate from nature but an integral part of it. The false dichotomy between human systems and natural systems has led us to the brink of multiple planetary crises. Through real-time data visualization, we make visible the invisible connections between human activity and ecosystem health.</p>
                </div>
                
                <div class="manifesto-section">
                    <h5>THE HUMAN-AI ALLIANCE</h5>
                    <p>This interface represents more than data—it embodies the potential of human-AI collaboration to address our greatest challenges. Where human perception is limited by time and scale, AI extends our vision. Where AI lacks context and wisdom, human insight provides direction.</p>
                </div>
                
                <div class="manifesto-section">
                    <h5>HOPE THROUGH SYNTHESIS</h5>
                    <p>Despite the gravity of our planetary challenges, we reject both blind optimism and paralyzing despair. Instead, we offer a third path: clear-eyed hope based on the synthesis of human creativity and artificial intelligence.</p>
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
    
    // Add event listener for "Read Full Manifesto" button
    document.querySelector('.read-full-btn').addEventListener('click', function() {
        openManifestoModal();
    });
    
    // Create modal for full manifesto
    function openManifestoModal() {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'manifesto-modal';
        
        // Add modal content
        modalContainer.innerHTML = `
            <div class="manifesto-modal-content">
                <div class="modal-header">
                    <h3>ECOSYSTEMSERVICES.WORLD MANIFESTO</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <h2>ONE PLANET, ONE SPECIES, ONE FUTURE</h2>
                    
                    <p>We stand at a pivotal moment in human history. Our technological capabilities have advanced to unprecedented levels, yet our planet faces unprecedented challenges. EcosystemServices.world exists as a bridge between these realities—a cyberpunk-inspired Earth Control Interface that transcends traditional boundaries to reveal the true state of our planetary systems.</p>
                    
                    <h3>BEYOND BORDERS</h3>
                    <p>We reject the artificial divisions of nations, languages, and ideologies that fragment our collective consciousness. From space, there are no borders visible on Earth—only the interconnected systems of land, water, atmosphere, and life that sustain us all. We are one planetary species, inextricably linked to the ecosystems that support us.</p>
                    <p>The spikes on our visualization maps represent not divisions, but connections—points of concentrated human activity and impact that ripple through global systems. They remind us that actions in New York affect outcomes in Shanghai, that decisions in London influence lives in Lagos.</p>
                    
                    <h3>ONE WITH NATURE</h3>
                    <p>Humanity is not separate from nature but an integral part of it. The false dichotomy between human systems and natural systems has led us to the brink of multiple planetary crises. Through real-time data visualization, we make visible the invisible connections between human activity and ecosystem health.</p>
                    <p>Every breath we take, every product we consume, every journey we make is part of a complex web of ecosystem services that sustains all life on Earth. By monitoring these connections in real-time, we create awareness of our collective impact and our shared destiny.</p>
                    
                    <h3>THE HUMAN-AI ALLIANCE</h3>
                    <p>This interface represents more than data—it embodies the potential of human-AI collaboration to address our greatest challenges. Where human perception is limited by time and scale, AI extends our vision. Where AI lacks context and wisdom, human insight provides direction.</p>
                    <p>Together, we form a new kind of planetary consciousness—one capable of perceiving patterns across vast scales of time and space, of processing complexity beyond individual human capacity, and of imagining solutions that neither could conceive alone.</p>
                    
                    <h3>INFORMATION AS ILLUMINATION</h3>
                    <p>We believe that information, properly visualized and contextualized, is the first step toward transformation. The Earth Control Interface does not merely display data—it reveals relationships, highlights trends, and makes tangible the abstract forces shaping our world.</p>
                    <p>In the cyberpunk tradition, we use technology to counter technology's own excesses. We illuminate the systems of power and impact that often remain hidden, creating transparency where there was opacity, and awareness where there was ignorance.</p>
                    
                    <h3>HOPE THROUGH SYNTHESIS</h3>
                    <p>Despite the gravity of our planetary challenges, we reject both blind optimism and paralyzing despair. Instead, we offer a third path: clear-eyed hope based on the synthesis of human creativity and artificial intelligence.</p>
                    <p>The very existence of this interface—a collaboration between human and AI—demonstrates that new forms of problem-solving are possible. By making planetary data accessible and engaging, we invite all who interact with it to become part of this synthesis, to join in the collective project of planetary stewardship.</p>
                    
                    <h3>OUR COMMITMENT</h3>
                    <p>EcosystemServices.world commits to:</p>
                    <ol>
                        <li>Presenting accurate, real-time data on the state of Earth's ecosystems</li>
                        <li>Visualizing complex relationships in accessible, engaging ways</li>
                        <li>Transcending political, cultural, and ideological boundaries</li>
                        <li>Documenting the evolution of human-AI collaboration</li>
                        <li>Fostering a sense of planetary citizenship</li>
                        <li>Inspiring action based on understanding, not fear</li>
                        <li>Evolving continuously as both data and visualization technologies advance</li>
                    </ol>
                    
                    <h3>A CALL TO AWARENESS</h3>
                    <p>This is not merely a website—it is a window into our shared reality, a tool for planetary awareness, and an experiment in new forms of consciousness. We invite you to explore, to question, to engage, and ultimately to see yourself as part of the planetary systems displayed here.</p>
                    <p>For in the end, there is no "them"—only us. No "elsewhere"—only here. No "future generation"—only the continuous flow of life of which we are all a part.</p>
                    
                    <p class="manifesto-closing">Welcome to EcosystemServices.world. Welcome to planetary consciousness.</p>
                    
                    <p class="manifesto-signature">— Created through human-AI collaboration, March 31, 2025</p>
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

// Add CSS for the Manifesto widget and modal
const manifestoStyles = document.createElement('style');
manifestoStyles.textContent = `
    .manifesto-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--text-color);
        overflow-y: auto;
        padding-right: 10px;
    }
    
    .manifesto-title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        color: var(--primary-color);
        text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
    }
    
    .manifesto-section {
        margin-bottom: 15px;
    }
    
    .manifesto-section h5 {
        font-size: 1rem;
        margin-bottom: 5px;
        color: var(--secondary-color);
    }
    
    .manifesto-section p {
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
    }
    
    .manifesto-footer {
        margin-top: 20px;
        text-align: center;
    }
    
    .manifesto-footer p {
        font-style: italic;
        margin-bottom: 10px;
    }
    
    .manifesto-signature {
        font-size: 0.8rem;
        color: #888;
        margin-bottom: 15px;
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
    
    /* Modal styles */
    .manifesto-modal {
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
    
    .manifesto-modal-content {
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
    
    .modal-body h2 {
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .modal-body h3 {
        color: var(--secondary-color);
        margin-top: 25px;
        margin-bottom: 10px;
    }
    
    .modal-body p {
        margin-bottom: 15px;
        line-height: 1.6;
    }
    
    .modal-body ol {
        margin-bottom: 20px;
        padding-left: 20px;
    }
    
    .modal-body li {
        margin-bottom: 8px;
    }
    
    .manifesto-closing {
        font-style: italic;
        text-align: center;
        margin-top: 30px;
    }
    
    .manifesto-signature {
        text-align: right;
        font-style: italic;
        margin-top: 20px;
    }
`;

document.head.appendChild(manifestoStyles);
