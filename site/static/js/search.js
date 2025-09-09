class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchIndex = null;
        
        this.init();
    }
    
    async init() {
        if (!this.searchInput) return;
        
        // Load search index
        try {
            const response = await fetch('/index.json');
            this.searchIndex = await response.json();
        } catch (error) {
            console.error('Failed to load search index:', error);
            return;
        }
        
        // Setup event listeners
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('focus', this.handleFocus.bind(this));
        document.addEventListener('click', this.handleClickOutside.bind(this));
    }
    
    handleSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            this.hideResults();
            return;
        }
        
        const results = this.search(query);
        this.displayResults(results.slice(0, 10)); // Show max 10 results
    }
    
    search(query) {
        if (!this.searchIndex) return [];
        
        return this.searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            const tagsMatch = item.tags && item.tags.some(tag => 
                tag.toLowerCase().includes(query)
            );
            
            return titleMatch || contentMatch || tagsMatch;
        }).sort((a, b) => {
            // Sort by relevance (title matches first)
            const aTitle = a.title.toLowerCase().includes(query);
            const bTitle = b.title.toLowerCase().includes(query);
            
            if (aTitle && !bTitle) return -1;
            if (!aTitle && bTitle) return 1;
            return 0;
        });
    }
    
    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result">Không tìm thấy kết quả</div>';
        } else {
            this.searchResults.innerHTML = results.map(result => `
                <div class="search-result" onclick="window.location.href='${result.permalink}'">
                    <h4>${this.highlightText(result.title)}</h4>
                    <p>${this.highlightText(this.truncateText(result.content, 100))}</p>
                </div>
            `).join('');
        }
        
        this.showResults();
    }
    
    highlightText(text) {
        const query = this.searchInput.value.trim();
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    showResults() {
        this.searchResults.style.display = 'block';
    }
    
    hideResults() {
        this.searchResults.style.display = 'none';
    }
    
    handleFocus() {
        if (this.searchResults.innerHTML && this.searchInput.value.trim().length >= 2) {
            this.showResults();
        }
    }
    
    handleClickOutside(event) {
        if (!this.searchInput.contains(event.target) && !this.searchResults.contains(event.target)) {
            this.hideResults();
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchEngine();
});