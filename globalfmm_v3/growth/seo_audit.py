import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

def audit_site(url):
    """
    Realiza una auditoría SEO básica de una URL dada.
    """
    print(f"Iniciando auditoría para: {url}")
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            title = soup.title.string if soup.title else "No Title"
            meta_desc_tag = soup.find('meta', attrs={'name': 'description'})
            meta_desc = meta_desc_tag['content'] if meta_desc_tag else "No Meta Description"
            h1_tags = [h1.get_text() for h1 in soup.find_all('h1')]
            
            print(f"Title: {title}")
            print(f"Description Length: {len(meta_desc)}")
            print(f"H1 Tags: {h1_tags}")
            
            # Simple check
            if len(meta_desc) < 120:
                print("[WARN] Meta description too short.")
            if len(h1_tags) != 1:
                print("[WARN] Page should have exactly one H1 tag.")
                
            return {
                "url": url,
                "title": title,
                "meta_description": meta_desc,
                "h1_count": len(h1_tags),
                "status": "OK"
            }
        else:
            print(f"Error: Status Code {response.status_code}")
            return {"url": url, "status": "Error"}
            
    except Exception as e:
        print(f"Error accessing {url}: {e}")
        return {"url": url, "status": "Failed"}

if __name__ == "__main__":
    # Example usage for local testing
    target_url = "https://globalfmm.com" 
    # In a real scenario, this would loop through sitemap
    audit_site(target_url)
