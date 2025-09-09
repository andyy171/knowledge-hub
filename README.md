# Knowledge-Hub

## Overview 

Everything Notes

## Repo Structure
```
knowledge-hub/                    # Root repository
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Main deployment workflow
│       └── sync-content.yml     # Optional: Auto-sync from old repos
├── site/                        # Hugo site source
│   ├── content/                 # ALL markdown content
│   │   ├── linux/
│   │   │   ├── _index.md       # Linux topic overview
│   │   │   ├── file-system.md
│   │   │   └── permissions.md
│   │   ├── kubernetes/
│   │   │   ├── _index.md
│   │   │   ├── pods.md
│   │   │   └── services.md
│   │   ├── programming/
│   │   │   └── _index.md
│   │   └── networking/
│   │       └── _index.md
│   ├── data/                    # Navigation & config data
│   │   └── navigation.yaml
│   ├── layouts/                 # Hugo templates
│   │   ├── _default/
│   │   │   ├── baseof.html
│   │   │   ├── single.html
│   │   │   └── list.html
│   │   ├── partials/
│   │   │   ├── header.html
│   │   │   ├── footer.html
│   │   │   ├── search.html
│   │   │   └── rating.html
│   │   └── index.html
│   ├── static/                  # Static assets
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   ├── search.js
│   │   │   └── rating.js
│   │   └── images/
│   ├── assets/                  # Source assets (SCSS, etc.)
│   │   └── scss/
│   │       └── main.scss
│   └── hugo.toml               # Hugo configuration
├── scripts/                     # Utility scripts
│   ├── sync-from-repos.sh      # Sync from old repositories
│   ├── backup-content.sh       # Backup automation
│   └── local-setup.sh          # Local environment setup
└── README.md                   # Complete documentation
```