// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Function to get user's first name initial
function getUserInitial() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.name.charAt(0).toUpperCase() : '';
}

// Function to create profile icon HTML
function createProfileIcon() {
    return `
        <div class="profile-circle">
            <span>${getUserInitial()}</span>
        </div>
        <div class="profile-dropdown">
            <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    `;
}

// Function to update navbar based on login status
function updateNavbar() {
    const registerBtn = document.querySelector('.register-btn');
    const navButtons = document.querySelector('.nav-buttons');
    const mobileProfileContainer = document.querySelector('.mobile-profile-icon');

    if (isLoggedIn()) {
        // Hide register button if it exists
        if (registerBtn) {
            registerBtn.style.display = 'none';
        }

        // Update desktop profile icon
        const desktopProfileIcon = document.querySelector('.nav-buttons .profile-icon');
        if (!desktopProfileIcon) {
            const profileIcon = document.createElement('div');
            profileIcon.className = 'profile-icon';
            profileIcon.innerHTML = createProfileIcon();

            // Insert profile icon in nav-buttons
            if (navButtons) {
                navButtons.appendChild(profileIcon);
            }
        } else {
            desktopProfileIcon.innerHTML = createProfileIcon();
        }

        // Update mobile profile icon
        if (mobileProfileContainer) {
            mobileProfileContainer.innerHTML = createProfileIcon();
            mobileProfileContainer.classList.add('logged-in');
        }
    } else {
        // Remove profile icons if they exist
        const profileIcons = document.querySelectorAll('.profile-icon');
        profileIcons.forEach(icon => icon.remove());

        // Show register button if it was hidden
        const registerBtns = document.querySelectorAll('.register-btn');
        registerBtns.forEach(btn => {
            btn.style.display = 'block';
        });

        // Update mobile profile icon to show register icon when not logged in
        const mobileProfileContainer = document.querySelector('.mobile-profile-icon');
        if (mobileProfileContainer) {
            mobileProfileContainer.innerHTML = `
                <a href="signup.html" class="mobile-register-icon">
                    <i class="fas fa-user-plus"></i>
                </a>
            `;
            mobileProfileContainer.classList.remove('logged-in');
        }
    }
}

// Add styles for profile icon
const style = document.createElement('style');
style.textContent = `
    .profile-icon {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        pointer-events: auto;
    }
    .profile-icon * {
        pointer-events: auto;
    }
    .profile-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #4CAF50;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
    }
    .profile-dropdown {
        display: none;
        position: absolute;
        right: 0;
        top: 50px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        min-width: 200px;
        z-index: 1000;
    }
    .profile-icon:hover .profile-dropdown {
        display: block;
    }
    .mobile-menu .profile-icon .profile-dropdown {
        right: 0;
        top: 40px;
    }
    .profile-dropdown a {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        color: #333;
        text-decoration: none;
        transition: background-color 0.2s;
    }
    .profile-dropdown a:hover {
        background-color: #f5f5f5;
    }
    .profile-dropdown i {
        margin-right: 10px;
        width: 20px;
        text-align: center;
    }
    /* Mobile styles */
    .hamburger .mobile-profile-icon {
        margin-right: 15px;
        display: flex;
        align-items: center;
    }
    .mobile-register-icon {
        color: #333;
        font-size: 1.2rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    .mobile-register-icon:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
    .hamburger .mobile-profile-icon .profile-dropdown {
        right: -10px;
        top: 40px;
    }
    @media (max-width: 768px) {
        .nav-buttons .profile-icon {
            display: none;
        }
        .hamburger .mobile-profile-icon {
            display: block;
        }
    }
    @media (min-width: 769px) {
        .hamburger .mobile-profile-icon {
            display: none;
        }
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

// Handle profile icon and logout functionality
document.addEventListener('click', function (e) {
    // Handle logout button click
    if (e.target.classList.contains('logout-btn') || e.target.closest('.logout-btn')) {
        e.preventDefault();
        e.stopPropagation();
        // Clear all user-related data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('enrolledCourses');
        window.location.href = 'index.html';
        return; // Stop further execution
    }

    // Check if click is on profile icon or its children (both desktop and mobile)
    const profileIcon = e.target.closest('.profile-icon');
    const profileCircle = e.target.closest('.profile-circle');
    const mobileProfileContainer = e.target.closest('.mobile-profile-icon');

    // Handle profile icon or profile circle click (for both desktop and mobile)
    if (profileIcon || (profileCircle && mobileProfileContainer)) {
        e.stopPropagation();
        const parentProfileIcon = profileIcon || profileCircle.closest('.profile-icon');
        const dropdown = parentProfileIcon.querySelector('.profile-dropdown');
        if (dropdown) {
            const isVisible = dropdown.style.display === 'block';
            // Hide all other dropdowns
            document.querySelectorAll('.profile-dropdown').forEach(d => {
                if (d !== dropdown) d.style.display = 'none';
            });
            // Toggle current dropdown
            dropdown.style.display = isVisible ? 'none' : 'block';
        }
        return; // Stop further execution if we handled a profile icon click
    }

    // Handle mobile profile container click (for register icon when not logged in)
    if (mobileProfileContainer) {
        // If it's a link, let it work normally
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        e.stopPropagation();
        return;
    }

    // Hide dropdowns when clicking outside (for mobile and desktop)
    document.querySelectorAll('.profile-dropdown').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar); 