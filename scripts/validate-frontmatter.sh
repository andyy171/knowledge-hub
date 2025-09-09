#!/bin/bash

file="$1"

if [[ ! -f "$file" || ! "$file" == *.md ]]; then
    exit 0
fi

# Check if file already has frontmatter
if head -n 1 "$file" | grep -q "^---"; then
    echo "File $file already has frontmatter"
    exit 0
fi

# Get filename without extension for title
filename=$(basename "$file" .md)
title=$(echo "$filename" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')

# Get current date
current_date=$(date -u +"%Y-%m-%dT%H:%M:%S+07:00")

# Determine category based on directory
dir=$(dirname "$file" | xargs basename)
category="$dir"

# Create temporary file with frontmatter
cat > "$file.tmp" << EOF
---
title: "$title"
date: $current_date
lastmod: $current_date
draft: false
authors: ["Your Name"]
categories: ["$category"]
tags: []
summary: "Tóm tắt nội dung cho $title"
---

EOF

# Append original content
cat "$file" >> "$file.tmp"

# Replace original file
mv "$file.tmp" "$file"

echo "Added frontmatter to $file"