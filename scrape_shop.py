import urllib.request
import re
import json

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def main():
    shop_html = fetch('https://www.byondbeleaf.net/shop')
    
    # Find product links
    product_links = re.findall(r'href="(https://www.byondbeleaf.net/product-page/[^"&]+)"', shop_html)
    product_links = list(set(product_links))
    
    products = []
    
    for link in product_links:
        print(f"Scraping {link}")
        page_html = fetch(link)
        
        # Name: <meta property="og:title" content="Name | ByondBeLeaf">
        name_match = re.search(r'property="og:title" content="([^|]+)', page_html)
        name = name_match.group(1).strip() if name_match else link.split('/')[-1].replace('-', ' ').title()
        
        # Image: <meta property="og:image" content="...">
        img_match = re.search(r'property="og:image" content="(https://static.wixstatic.com/media/[^"]+)"', page_html)
        img = img_match.group(1) if img_match else "assets/placeholder.png"
        
        # Description: <meta property="og:description" content="...">
        desc_match = re.search(r'property="og:description" content="([^"]+)"', page_html)
        desc = desc_match.group(1) if desc_match else "Premium natural healing formula."
        
        products.append({
            "name": name,
            "image": img,
            "description": desc,
            "price": "$15.00" # Defaulting price based on teas, will refine if possible, or just string
        })
    
    with open('C:\\Projects\\BeyondBeleaf\\scraped_products.json', 'w') as f:
        json.dump(products, f, indent=2)
    print("Scraping complete. Saved to scraped_products.json.")

if __name__ == "__main__":
    main()
