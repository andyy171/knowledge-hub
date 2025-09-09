class PersonalRating {
    constructor() {
        this.currentArticle = null;
        this.ratings = this.loadRatings();
        
        this.init();
    }
    
    init() {
        this.currentArticle = this.getCurrentArticle();
        if (!this.currentArticle) return;
        
        this.setupRatingStars();
        this.setupPersonalNotes();
        this.loadCurrentRating();
        this.loadCurrentNotes();
    }
    
    getCurrentArticle() {
        const ratingElement = document.querySelector('[data-article]');
        return ratingElement ? ratingElement.dataset.article : null;
    }
    
    setupRatingStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => this.setRating(index + 1));
            star.addEventListener('mouseover', () => this.highlightStars(index + 1));
            star.addEventListener('mouseout', () => this.loadCurrentRating());
        });
    }
    
    setupPersonalNotes() {
        const notesTextarea = document.getElementById('personal-notes');
        if (notesTextarea) {
            notesTextarea.addEventListener('blur', () => this.saveNotes());
        }
    }
    
    setRating(rating) {
        if (!this.currentArticle) return;
        
        if (!this.ratings[this.currentArticle]) {
            this.ratings[this.currentArticle] = {};
        }
        
        this.ratings[this.currentArticle].rating = rating;
        this.saveRatings();
        this.loadCurrentRating();
        this.showToast('Đánh giá đã được lưu');
    }
    
    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    loadCurrentRating() {
        const rating = this.ratings[this.currentArticle]?.rating || 0;
        
        // Update interactive stars
        this.highlightStars(rating);
        
        // Update display stars
        const displayStars = document.querySelectorAll('.star-display');
        displayStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    saveNotes() {
        if (!this.currentArticle) return;
        
        const notesTextarea = document.getElementById('personal-notes');
        if (!notesTextarea) return;
        
        const notes = notesTextarea.value.trim();
        
        if (!this.ratings[this.currentArticle]) {
            this.ratings[this.currentArticle] = {};
        }
        
        this.ratings[this.currentArticle].notes = notes;
        this.saveRatings();
        
        if (notes) {
            this.showToast('Ghi chú đã được lưu');
        }
    }
    
    loadCurrentNotes() {
        const notes = this.ratings[this.currentArticle]?.notes || '';
        const notesTextarea = document.getElementById('personal-notes');
        if (notesTextarea) {
            notesTextarea.value = notes;
        }
    }
    
    loadRatings() {
        try {
            const saved = localStorage.getItem('personal-ratings');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading ratings:', error);
            return {};
        }
    }
    
    saveRatings() {
        try {
            localStorage.setItem('personal-ratings', JSON.stringify(this.ratings));
        } catch (error) {
            console.error('Error saving ratings:', error);
        }
    }
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-size: 14px;
            font-weight: 500;
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
}

// Global function for save button
function saveRating() {
    if (window.personalRating) {
        window.personalRating.saveNotes();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.personalRating = new PersonalRating();
});