#!/bin/bash

# Script backup tự động

BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backup_$BACKUP_DATE"

echo "Starting backup process..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup content directory
cp -r site/content "$BACKUP_DIR/"

# Backup data directory  
cp -r site/data "$BACKUP_DIR/"

# Create archive
tar -czf "knowledge-hub-backup-$BACKUP_DATE.tar.gz" "$BACKUP_DIR"

# Remove temporary directory
rm -rf "$BACKUP_DIR"

echo "Backup completed: knowledge-hub-backup-$BACKUP_DATE.tar.gz"
