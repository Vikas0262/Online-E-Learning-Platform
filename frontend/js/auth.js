// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Function to get user's first name initial
function getUserInitial() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.name.charAt(0).toUpperCase() : '';
}

// Function to update navbar based on login status
function updateNavbar() {
    const registerBtn = document.querySelector('.register-btn');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (isLoggedIn()) {
        // Create profile icon if it doesn't exist
        if (!document.querySelector('.profile-icon')) {
            const profileIcon = document.createElement('div');
            profileIcon.className = 'profile-icon';
            profileIcon.innerHTML = `
                <div class="profile-circle">
                    <span>${getUserInitial()}</span>
                </div>
                <div class="profile-dropdown">
                    <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            `;
            
            // Replace register button with profile icon
            if (registerBtn) {
                registerBtn.parentNode.replaceChild(profileIcon, registerBtn);
            }
            
            // Add click event for logout
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                // Clear all user-related data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('enrolledCourses');
                window.location.reload();
            });
        }
    } else {
        // Remove profile icon if it exists
        const profileIcon = document.querySelector('.profile-icon');
        if (profileIcon) {
            // Create new register button
            const newRegisterBtn = document.createElement('button');
            newRegisterBtn.className = 'register-btn';
            newRegisterBtn.onclick = () => window.location.href = 'signup.html';
            newRegisterBtn.textContent = 'Register';
            
            // Replace profile icon with register button
            profileIcon.parentNode.replaceChild(newRegisterBtn, profileIcon);
        }
    }
}

// Add styles for profile icon
const style = document.createElement('style');
style.textContent = `
    .profile-icon {
        position: relative;
        cursor: pointer;
        margin-left: 1rem;
    }
    
    .profile-circle {
        width: 40px;
        height: 40px;
        background: #4299e1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .profile-circle:hover {
        transform: scale(1.1);
    }
    
    .profile-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 0.5rem 0;
        min-width: 150px;
        display: none;
        z-index: 1000;
        margin-top: 0.5rem;
    }
    
    .profile-icon:hover .profile-dropdown {
        display: block;
    }
    
    .profile-dropdown a {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: #2d3748;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .profile-dropdown a:hover {
        background: #f7fafc;
        color: #4299e1;
    }
    
    .profile-dropdown i {
        margin-right: 0.75rem;
        width: 20px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .profile-icon {
            margin-left: 0.5rem;
        }
        
        .profile-circle {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar); 