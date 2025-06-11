document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.content-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId + '-section');
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Fetch and display messages
    fetchMessages();

    // Add event listener for status filter
    document.getElementById('statusFilter').addEventListener('change', fetchMessages);
});

const API_BASE_URL = 'https://online-e-learning-platform.onrender.com';

async function fetchMessages() {
    try {
        const statusFilter = document.getElementById('statusFilter').value;
        const response = await fetch(`${API_BASE_URL}/api/contact${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`);
        const messages = await response.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function displayMessages(messages) {
    const tableBody = document.getElementById('messagesTableBody');
    tableBody.innerHTML = '';

    messages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(message.createdAt).toLocaleDateString()}</td>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.message.substring(0, 50)}${message.message.length > 50 ? '...' : ''}</td>
            <td>
                <span class="status-badge status-${message.status}">
                    ${message.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewMessage('${message._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteMessage('${message._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function viewMessage(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'read' })
        });
        if (response.ok) {
            fetchMessages();
        }
    } catch (error) {
        console.error('Error updating message status:', error);
    }
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchMessages();
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
} 