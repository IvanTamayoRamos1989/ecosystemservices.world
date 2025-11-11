import os
import logging
from flask import Flask, request, jsonify
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

app = Flask(__name__)

# Configura un logging básico
logging.basicConfig(level=logging.INFO)

@app.route('/', methods=['POST'])  # Changed from '/scrape' to '/'
def scrape_url():
    """
    Recibe un JSON {"name": "...", "url": "..."} y devuelve {"company_name": "...", "scraped_text": "..."}
    """
    data = request.get_json()
    if not data or 'url' not in data:
        logging.error("No se proporcionó URL en la solicitud")
        return jsonify({"error": "No se proporcionó URL"}), 400

    url_to_scrape = data['url']
    company_name = data.get('name', 'Unknown Company')  # Get company name from request
    logging.info(f"Iniciando scraping para: {company_name} - {url_to_scrape}")

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
            page = browser.new_page()
            
            # Ir a la URL con un tiempo de espera
            page.goto(url_to_scrape, timeout=30000, wait_until='domcontentloaded')
            
            # Espera a que la red esté inactiva (buen indicador de que el JS ha terminado)
            page.wait_for_load_state('networkidle', timeout=15000)

            # Obtiene el contenido HTML de la página renderizada
            html_content = page.content()
            browser.close()

            # Usa BeautifulSoup para limpiar el HTML
            soup = BeautifulSoup(html_content, 'html.parser')

            # Elimina etiquetas inútiles como scripts, estilos, menús, etc.
            for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
                element.decompose()

            # Obtiene el texto. ' ' como separador es mejor que nada.
            clean_text = soup.get_text(separator=' ', strip=True)
            
            # Reduce espacios en blanco múltiples a uno solo
            clean_text = ' '.join(clean_text.split())

            logging.info(f"Scraping exitoso para {company_name}. Longitud del texto: {len(clean_text)} caracteres")
            
            # Return format that matches workflow expectations
            return jsonify({
                "company_name": company_name,
                "scraped_text": clean_text
            })

    except Exception as e:
        logging.error(f"Error durante el scraping de {url_to_scrape}: {str(e)}")
        return jsonify({"error": f"Fallo el scraping: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
