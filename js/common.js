// Common JavaScript functionality for REDHOPE application

class CommonManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSidebar();
        this.setupMobileMenu();
        this.setupTheme();
        this.setupNotifications();
    }

    setupSidebar() {
        // Highlight current page in sidebar
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        const sidebarLinks = document.querySelectorAll('aside a');
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        // Mobile menu toggle functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const sidebar = document.querySelector('aside');
        
        if (mobileMenuButton && sidebar) {
            mobileMenuButton.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });
        }
    }

    setupTheme() {
        // Theme management (light/dark mode)
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                this.saveThemePreference();
            });
        }

        // Load saved theme preference
        this.loadThemePreference();
    }

    saveThemePreference() {
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    setupNotifications() {
        // Global notification system
        window.showNotification = (message, type = 'info') => {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-message">${message}</span>
                    <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                        <span class="material-icons">close</span>
                    </button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        };
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // API helper functions
    async apiRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            window.showNotification('An error occurred while processing your request.', 'error');
            throw error;
        }
    }

    // Local storage helpers
    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    getFromLocalStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to get from localStorage:', error);
            return null;
        }
    }

    // Loading states
    showLoading(element) {
        if (element) {
            element.classList.add('loading');
            element.disabled = true;
        }
    }

    hideLoading(element) {
        if (element) {
            element.classList.remove('loading');
            element.disabled = false;
        }
    }

    // Confirmation dialogs
    showConfirmDialog(message, onConfirm, onCancel) {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog-overlay';
        dialog.innerHTML = `
            <div class="confirm-dialog">
                <h3>Confirm Action</h3>
                <p>${message}</p>
                <div class="confirm-dialog-buttons">
                    <button class="btn btn-secondary" onclick="this.closest('.confirm-dialog-overlay').remove(); ${onCancel ? onCancel() : ''}">Cancel</button>
                    <button class="btn btn-primary" onclick="this.closest('.confirm-dialog-overlay').remove(); ${onConfirm}">Confirm</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
    }

    // Debounce function for search inputs
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    window.commonManager = new CommonManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommonManager;
} 