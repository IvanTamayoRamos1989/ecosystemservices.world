# agent-2-scraper/main.py (ENHANCED MULTI-SOURCE VERSION)
import os
import sys
import logging
import requests
from flask import Flask, request, jsonify
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from googlesearch import search
import time

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Configuration
MAX_SOURCES_PER_TYPE = 3  # Maximum number of sources to scrape per type
TIMEOUT = 30000  # 30 seconds per page

def clean_html_to_text(html_content):
    """Extract clean text from HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove useless tags
    for element in soup(["script", "style", "nav", "footer", "header", "aside", "iframe"]):
        element.decompose()
    
    clean_text = soup.get_text(separator=' ', strip=True)
    clean_text = ' '.join(clean_text.split())
    return clean_text

def scrape_url_with_playwright(url, timeout=TIMEOUT):
    """Scrape a single URL using Playwright"""
    try:
        logging.info(f"Scraping: {url}")
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
            page = browser.new_page()
            
            # Set user agent to avoid blocks
            page.set_extra_http_headers({
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            })
            
            page.goto(url, timeout=timeout, wait_until='domcontentloaded')
            page.wait_for_load_state('networkidle', timeout=15000)
            
            html_content = page.content()
            browser.close()
            
            clean_text = clean_html_to_text(html_content)
            return clean_text
    except Exception as e:
        logging.error(f"Error scraping {url}: {e}")
        return None

def search_google(query, num_results=5):
    """Search Google and return URLs"""
    try:
        logging.info(f"Searching Google for: {query}")
        results = []
        for url in search(query, num_results=num_results, lang='en', sleep_interval=2):
            results.append(url)
            if len(results) >= num_results:
                break
        return results
    except Exception as e:
        logging.error(f"Error searching Google: {e}")
        return []

def search_company_sources(company_name):
    """Search for multiple sources about a company"""
    sources = {
        "official_website": [],
        "annual_reports": [],
        "news_articles": [],
        "academic_papers": [],
        "sustainability_reports": []
    }
    
    try:
        # 1. Official website sustainability page
        query = f"{company_name} sustainability ESG official site"
        sources["official_website"] = search_google(query, num_results=2)[:1]
        time.sleep(1)
        
        # 2. Annual reports and sustainability reports
        query = f"{company_name} annual report sustainability report PDF"
        sources["annual_reports"] = search_google(query, num_results=3)[:MAX_SOURCES_PER_TYPE]
        time.sleep(1)
        
        # 3. News articles
        query = f"{company_name} infrastructure sustainability news"
        sources["news_articles"] = search_google(query, num_results=3)[:MAX_SOURCES_PER_TYPE]
        time.sleep(1)
        
        # 4. Academic/industry papers
        query = f"{company_name} infrastructure case study research"
        sources["academic_papers"] = search_google(query, num_results=2)[:2]
        
    except Exception as e:
        logging.error(f"Error searching for {company_name}: {e}")
    
    return sources

def scrape_multiple_sources(sources_dict, company_name):
    """Scrape content from all found sources"""
    all_content = []
    total_sources = 0
    
    for source_type, urls in sources_dict.items():
        logging.info(f"Scraping {len(urls)} {source_type} for {company_name}")
        
        for url in urls:
            # Skip PDFs for now (would need additional handling)
            if url.lower().endswith('.pdf'):
                logging.info(f"Skipping PDF: {url}")
                continue
            
            content = scrape_url_with_playwright(url, timeout=TIMEOUT)
            
            if content and len(content) > 200:  # Minimum content length
                all_content.append({
                    "source_type": source_type,
                    "url": url,
                    "content": content[:50000],  # Limit to 50k chars per source
                    "length": len(content)
                })
                total_sources += 1
                logging.info(f"✓ Scraped {len(content)} chars from {url}")
            else:
                logging.warning(f"✗ Insufficient content from {url}")
            
            # Rate limiting
            time.sleep(2)
    
    return all_content, total_sources

def combine_content(scraped_data, company_name):
    """Combine all scraped content into a structured format"""
    combined = f"# COMPREHENSIVE DATA FOR: {company_name}\n\n"
    combined += f"Total sources scraped: {len(scraped_data)}\n\n"
    combined += "=" * 80 + "\n\n"
    
    for idx, data in enumerate(scraped_data, 1):
        combined += f"## SOURCE {idx}: {data['source_type'].upper()}\n"
        combined += f"**URL:** {data['url']}\n"
        combined += f"**Content Length:** {data['length']} characters\n\n"
        combined += f"{data['content']}\n\n"
        combined += "=" * 80 + "\n\n"
    
    return combined

@app.route('/', methods=['POST'])
def scrape_endpoint():
    """
    Enhanced endpoint that accepts either:
    1. {"name": "...", "url": "..."} - Single URL mode (backward compatible)
    2. {"name": "...", "multi_source": true} - Multi-source intelligent mode
    """
    try:
        data = request.get_json()
        
        if not data or 'name' not in data:
            return jsonify({"error": "Missing 'name' in request"}), 400
        
        company_name = data['name']
        multi_source = data.get('multi_source', False)
        
        # MODE 1: Single URL (backward compatible)
        if not multi_source and 'url' in data:
            url_to_scrape = data['url']
            logging.info(f"[SINGLE URL MODE] Scraping {company_name} from {url_to_scrape}")
            
            scraped_text = scrape_url_with_playwright(url_to_scrape)
            
            if not scraped_text:
                return jsonify({"error": "Failed to scrape URL"}), 500
            
            return jsonify({
                "company_name": company_name,
                "scraped_text": scraped_text,
                "source_count": 1,
                "mode": "single_url"
            }), 200
        
        # MODE 2: Multi-source intelligent scraping
        elif multi_source:
            logging.info(f"[MULTI-SOURCE MODE] Searching and scraping multiple sources for {company_name}")
            
            # Search for sources
            sources = search_company_sources(company_name)
            logging.info(f"Found sources: {sum(len(urls) for urls in sources.values())} URLs")
            
            # Scrape all sources
            scraped_data, total_sources = scrape_multiple_sources(sources, company_name)
            
            if total_sources == 0:
                return jsonify({
                    "error": "No sources could be scraped",
                    "company_name": company_name
                }), 500
            
            # Combine all content
            combined_text = combine_content(scraped_data, company_name)
            
            logging.info(f"✓ Successfully scraped {total_sources} sources for {company_name}")
            logging.info(f"Total content length: {len(combined_text)} characters")
            
            return jsonify({
                "company_name": company_name,
                "scraped_text": combined_text,
                "source_count": total_sources,
                "sources_by_type": {k: len(v) for k, v in sources.items()},
                "mode": "multi_source"
            }), 200
        
        else:
            return jsonify({"error": "Must provide either 'url' or set 'multi_source': true"}), 400
    
    except Exception as e:
        logging.error(f"Error in scrape_endpoint: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
