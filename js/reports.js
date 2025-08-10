// Reports Page JavaScript
class ReportsManager {
    constructor() {
        this.reportsData = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadReportsData();
        this.setupEventListeners();
        this.updateStatistics();
    }

    // Sample data - in a real app, this would come from an API
    loadReportsData() {
        this.reportsData = [
            {
                id: 1,
                date: '2024-06-01',
                type: 'Blood (A+)',
                recipient: 'City General Hospital',
                status: 'delivered',
                driver: 'Alex Johnson',
                details: 'Emergency blood delivery for surgery'
            },
            {
                id: 2,
                date: '2024-06-01',
                type: 'Organ (Kidney)',
                recipient: "St. Luke's Medical",
                status: 'delivered',
                driver: 'Maria Rodriguez',
                details: 'Organ transplant delivery'
            },
            {
                id: 3,
                date: '2024-05-31',
                type: 'Blood (O-)',
                recipient: 'Community Health Clinic',
                status: 'pending',
                driver: 'David Lee',
                details: 'Regular blood supply delivery'
            },
            {
                id: 4,
                date: '2024-05-30',
                type: 'Plasma',
                recipient: 'Red Cross Center',
                status: 'cancelled',
                driver: 'Sarah Chen',
                details: 'Plasma delivery cancelled due to weather'
            },
            {
                id: 5,
                date: '2024-05-29',
                type: 'Blood (B+)',
                recipient: 'Regional Medical Center',
                status: 'in-transit',
                driver: 'Mike Wilson',
                details: 'Blood delivery in progress'
            }
        ];
    }

    setupEventListeners() {
        // Add event listeners for filtering
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterReports(filter);
            });
        });

        // Add event listeners for view actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-link')) {
                e.preventDefault();
                const reportId = e.target.dataset.reportId;
                this.viewReportDetails(reportId);
            }
        });

        // Add search functionality
        const searchInput = document.getElementById('search-reports');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchReports(e.target.value);
            });
        }
    }

    updateStatistics() {
        const stats = this.calculateStatistics();
        
        // Update the statistics cards
        const totalElement = document.getElementById('total-deliveries');
        const completedElement = document.getElementById('completed-deliveries');
        const pendingElement = document.getElementById('pending-deliveries');
        const cancelledElement = document.getElementById('cancelled-deliveries');

        if (totalElement) totalElement.textContent = stats.total;
        if (completedElement) completedElement.textContent = stats.completed;
        if (pendingElement) pendingElement.textContent = stats.pending;
        if (cancelledElement) cancelledElement.textContent = stats.cancelled;
    }

    calculateStatistics() {
        const stats = {
            total: this.reportsData.length,
            completed: 0,
            pending: 0,
            cancelled: 0,
            inTransit: 0
        };

        this.reportsData.forEach(report => {
            switch (report.status) {
                case 'delivered':
                    stats.completed++;
                    break;
                case 'pending':
                    stats.pending++;
                    break;
                case 'cancelled':
                    stats.cancelled++;
                    break;
                case 'in-transit':
                    stats.inTransit++;
                    break;
            }
        });

        return stats;
    }

    filterReports(status) {
        this.currentFilter = status;
        const filteredData = status === 'all' 
            ? this.reportsData 
            : this.reportsData.filter(report => report.status === status);
        
        this.renderReportsTable(filteredData);
    }

    searchReports(query) {
        const filteredData = this.reportsData.filter(report => {
            const searchTerm = query.toLowerCase();
            return (
                report.type.toLowerCase().includes(searchTerm) ||
                report.recipient.toLowerCase().includes(searchTerm) ||
                report.driver.toLowerCase().includes(searchTerm) ||
                report.date.includes(searchTerm)
            );
        });
        
        this.renderReportsTable(filteredData);
    }

    renderReportsTable(data) {
        const tbody = document.querySelector('.table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        data.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.date}</td>
                <td>${report.type}</td>
                <td>${report.recipient}</td>
                <td><span class="status-badge status-${report.status}">${this.capitalizeFirst(report.status)}</span></td>
                <td>${report.driver}</td>
                <td><a class="action-link" href="#" data-report-id="${report.id}">View</a></td>
            `;
            tbody.appendChild(row);
        });
    }

    viewReportDetails(reportId) {
        const report = this.reportsData.find(r => r.id == reportId);
        if (!report) return;

        // Create modal or navigate to detail page
        this.showReportModal(report);
    }

    showReportModal(report) {
        // Create modal HTML
        const modalHTML = `
            <div id="report-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-primary">Report Details</h3>
                        <button onclick="this.closest('#report-modal').remove()" class="text-gray-500 hover:text-gray-700">
                            <span class="material-icons">close</span>
                        </button>
                    </div>
                    <div class="space-y-3">
                        <div><strong>Date:</strong> ${report.date}</div>
                        <div><strong>Type:</strong> ${report.type}</div>
                        <div><strong>Recipient:</strong> ${report.recipient}</div>
                        <div><strong>Status:</strong> <span class="status-badge status-${report.status}">${this.capitalizeFirst(report.status)}</span></div>
                        <div><strong>Driver:</strong> ${report.driver}</div>
                        <div><strong>Details:</strong> ${report.details}</div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('report-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Export data functionality
    exportToCSV() {
        const headers = ['Date', 'Type', 'Recipient', 'Status', 'Driver'];
        const csvContent = [
            headers.join(','),
            ...this.reportsData.map(report => [
                report.date,
                report.type,
                report.recipient,
                report.status,
                report.driver
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reportsManager = new ReportsManager();
});

// Global functions for HTML onclick handlers
function exportReports() {
    if (window.reportsManager) {
        window.reportsManager.exportToCSV();
    }
}

function filterReports(status) {
    if (window.reportsManager) {
        window.reportsManager.filterReports(status);
    }
} 