
import os
import re

# Source Manuscript
MANUSCRIPT_PATH = "/Users/snowman/_SouthOfTheSlot/archive_source_robert/PROJECT_ARNETT_MANUSCRIPT_V2_EXPANDED.md"
OUTPUT_DIR = "/Users/snowman/_SouthOfTheSlot/south-of-the-slot-web/content/biography"

def create_stubs():
    with open(MANUSCRIPT_PATH, 'r') as f:
        content = f.read()

    # Split roughly by Headers
    # We look for "### N. Title"
    sections = re.split(r'\n### (\d+)\. ', content)
    
    # section[0] is intro.
    # section[1] is number "1", section[2] is content of Ch 1.
    # section[3] is number "2", section[4] is content of Ch 2...
    
    current_part = "Part I" # Default
    
    for i in range(1, len(sections), 2):
        chap_num = sections[i]
        chap_content_raw = sections[i+1]
        
        # Extract Title (first line)
        lines = chap_content_raw.split('\n')
        title = lines[0].strip()
        body = '\n'.join(lines[1:])
        
        # Check for Part headers in the body of the *previous* section or this one?
        # Actually Part headers are usually "## Part II..."
        # We need to capture the Part context.
        # Simple heuristic: Scanning the previous chunk for "## Part"
        
        # Clean filename
        slug_title = title.lower().replace(' ', '-').replace('&', 'and').replace(',', '').replace(':', '').replace("'", "")
        filename = f"chapter-{chap_num}-{slug_title}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        # Skip if exists (preserve Ch 1, 2, 3 work)
        if os.path.exists(filepath):
            print(f"Skipping existing: {filename}")
            continue
            
        print(f"Creating Stub: {filename}")
        
        # Create Frontmatter
        frontmatter = f"""---
title: "Chapter {chap_num}: {title}"
series: "The Life and Times of Chuck Arnett"
slug: "chapter-{chap_num}-{slug_title}"
date: 2026-01-26
author: "Robert Arnett"
category: "biography"
status: "draft"
description: "Draft content from the Prager Manuscript."
---

# {title}

> **Note**: This is a draft extracted from the Project V2 Manuscript. It needs to be fleshed out with archive details.

{body}
"""
        with open(filepath, 'w') as out:
            out.write(frontmatter)

if __name__ == "__main__":
    create_stubs()
