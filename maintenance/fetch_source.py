import json
import sys
import os

def fetch_source(query):
    # Load Archive
    archive_path = os.path.join(os.path.dirname(__file__), '../data/archive.json')
    try:
        with open(archive_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading archive: {e}")
        return

    print(f"Searching for '{query}' in {len(data)} records...\n")
    
    matches = []
    for item in data:
        # Check filename/source_path
        source = item.get('source_path', '') or item.get('title', '')
        if query.lower() in source.lower():
            matches.append(item)
    
    if not matches:
        print("No matches found.")
        return

    # Print the first match's full content (or list matches if many)
    if len(matches) > 1:
        print(f"Found {len(matches)} matches. Showing the first one:")
        for m in matches[:5]:
            print(f" - {m.get('source_path', 'No Path')} | {m.get('title', 'No Title')}")
        print("-" * 50)

    target = matches[0]
    print(f"### SOURCE: {target.get('source_path', 'Unknown')} ({target.get('title', 'Unknown')})")
    print(f"### TYPE: {target.get('source_type', 'Unknown')}")
    print("-" * 50)
    print(target.get('content', '(No Content)'))
    print("-" * 50)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 fetch_source.py <filename_or_title_fragment>")
        sys.exit(1)
    
    fetch_source(sys.argv[1])
