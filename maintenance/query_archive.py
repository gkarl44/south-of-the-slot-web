import json
import sys
import os

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 query_archive.py <term1> [term2...]")
        return
    
    terms = sys.argv[1:]
    # Calculate path relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, '../data/archive.json')
    
    print(f"Loading {data_path}...")
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading data: {e}")
        return

    print(f"Scanning {len(data)} items for: {terms}")
    
    gmail_hits = []
    binder_hits = []
    
    for item in data:
        content = item.get('content', '')
        if not content: continue
        
        # Check if ANY term is in content
        found_term = None
        for t in terms:
            if t.lower() in content.lower():
                found_term = t
                break
        
        if found_term:
            # snippet
            idx = content.lower().find(found_term.lower())
            start = max(0, idx - 100)
            end = min(len(content), idx + 200)
            snippet = content[start:end].replace('\n', ' ').strip()
            
            hit = {
                'term': found_term,
                'source': item.get('source_type', 'unknown'),
                'file': item.get('filename', 'unknown'),
                'binder': item.get('binder', ''),
                'snippet': snippet
            }
            
            if 'gmail' in hit['source'].lower():
                gmail_hits.append(hit)
            else:
                binder_hits.append(hit)
                
    print(f"\n=== GMAIL HITS: {len(gmail_hits)} ===")
    for h in gmail_hits[:10]:
        print(f"[{h['file']}] ({h['term']}): ...{h['snippet']}...")
        
    print(f"\n=== BINDER HITS: {len(binder_hits)} ===")
    for h in binder_hits[:5]:
        print(f"[{h['binder']}/{h['file']}] ({h['term']}): ...{h['snippet']}...")
        
if __name__ == '__main__':
    main()
