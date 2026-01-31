import json
import os
import glob
import re

def normalize(text):
    # Lowercase, remove punctuation, collapse whitespace
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text.split()

def get_shingles(words, n=6):
    # Return set of n-gram tuples
    return set(tuple(words[i:i+n]) for i in range(len(words)-n+1))

def calculate_coverage():
    # 1. Load Archive (Ground Truth)
    archive_path = os.path.join(os.path.dirname(__file__), '../data/archive.json')
    print("Loading archive...")
    with open(archive_path, 'r') as f:
        data = json.load(f)
    
    archive_shingles = set()
    for item in data:
        content = item.get('content', '')
        if content:
            words = normalize(content)
            archive_shingles.update(get_shingles(words))
    
    print(f"Archive loaded. {len(archive_shingles)} unique phrases indexed.")

    # 2. Check Chapters
    bio_dir = os.path.join(os.path.dirname(__file__), '../content/biography')
    chapter_files = sorted(glob.glob(os.path.join(bio_dir, 'chapter-*.md')))
    
    total_words_all = 0
    matched_words_all = 0
    
    print(f"\n{'CHAPTER':<60} | {'WORDS':<8} | {'VERBATIM %':<10}")
    print("-" * 85)
    
    for string_filename in chapter_files:
        with open(string_filename, 'r') as f:
            raw = f.read()
        
        # Remove frontmatter
        if raw.startswith('---'):
            parts = raw.split('---', 2)
            if len(parts) > 2:
                content = parts[2]
            else:
                content = raw
        else:
            content = raw
            
        words = normalize(content)
        total_words = len(words)
        if total_words == 0: continue
        
        # Check matches
        # We want to know how many *words* are part of a matching shingle.
        # Create a boolean array for words
        is_covered = [False] * total_words
        
        shingles = get_shingles(words)
        
        for i, shingle in enumerate(zip(*[words[j:] for j in range(6)])): # Re-generate for index
             if shingle in archive_shingles:
                 # Mark these 6 words as covered
                 for k in range(6):
                     if i+k < total_words:
                         is_covered[i+k] = True
                         
        matched_count = sum(is_covered)
        pct = (matched_count / total_words) * 100
        
        total_words_all += total_words
        matched_words_all += matched_count
        
        print(f"{os.path.basename(string_filename):<60} | {total_words:<8} | {pct:>9.1f}%")
        
    print("-" * 85)
    global_pct = (matched_words_all / total_words_all) * 100 if total_words_all else 0
    print(f"{'TOTAL':<60} | {total_words_all:<8} | {global_pct:>9.1f}%")

if __name__ == "__main__":
    calculate_coverage()
