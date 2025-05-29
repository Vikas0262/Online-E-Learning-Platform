// Sample API data
const coursesData = [
    {
        "title": "Mastering JavaScript",
        "image": "https://i.ytimg.com/vi/xc3a_CJhjCc/maxresdefault.jpg",
        "description": "Learn JavaScript from scratch to advanced level.",
        "instructor": "John Doe",
        "duration": "8 weeks",
        "price": "₹1,499",
        "videoUrl": "https://www.youtube.com/embed/xc3a_CJhjCc",
        "rating": 3.5
    },
    {
        "title": "React for Beginners",
        "image": "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
        "description": "A complete React.js guide for new developers.",
        "instructor": "Jane Smith",
        "duration": "6 weeks",
        "price": "₹2,999",
        "videoUrl": "https://www.youtube.com/embed/Ke90Tje7VS0",
        "rating": 3.8
    },
    {
        "title": "Backend with Node.js",
        "image": "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
        "description": "Build powerful APIs using Node and Express.",
        "instructor": "Mike Johnson",
        "duration": "10 weeks",
        "price": "₹1,999",
        "videoUrl": "https://www.youtube.com/embed/Oe421EPjeBE",
        "rating": 3.2
    },
    {
        "title": "C Programming",
        "image": "https://i.ytimg.com/vi/KJgsSFOSQv0/maxresdefault.jpg",
        "description": "Master the fundamentals of C programming language.",
        "instructor": "Robert Johnson",
        "duration": "6 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/KJgsSFOSQv0",
        "rating": 3.7
    },
    {
        "title": "C++ Programming",
        "image": "https://i.ytimg.com/vi/8jLOx1hD3_o/maxresdefault.jpg",
        "description": "Learn object-oriented programming with C++.",
        "instructor": "Michael Brown",
        "duration": "8 weeks",
        "price": "₹1,299",
        "videoUrl": "https://www.youtube.com/embed/8jLOx1hD3_o",
        "rating": 3.3
    },
    {
        "title": "Java Development",
        "image": "https://i.ytimg.com/vi/eIrMbAQSU34/maxresdefault.jpg",
        "description": "Build robust applications with Java.",
        "instructor": "Sarah Wilson",
        "duration": "10 weeks",
        "price": "₹3,499",
        "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
        "rating": 3.9
    },
    {
        "title": "Python Programming",
        "image": "https://i.ytimg.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
        "description": "Learn Python from basics to advanced concepts.",
        "instructor": "David Lee",
        "duration": "8 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
        "rating": 3.6
    },
    {
        "title": "Ruby on Rails",
        "image": "https://i.ytimg.com/vi/B3Fbujmgo60/maxresdefault.jpg",
        "description": "Build web applications with Ruby on Rails.",
        "instructor": "Emily Davis",
        "duration": "7 weeks",
        "price": "₹2,499",
        "videoUrl": "https://www.youtube.com/embed/B3Fbujmgo60",
        "rating": 3.4
    },
    {
        "title": "Dart Programming",
        "image": "https://i.ytimg.com/vi/1ukSR1GRtMU/maxresdefault.jpg",
        "description": "Master Dart for Flutter development.",
        "instructor": "James Wilson",
        "duration": "5 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/1ukSR1GRtMU",
        "rating": 3.1
    },
    {
        "title": "HTML & CSS",
        "image": "https://i.ytimg.com/vi/mU6anWqZJcc/maxresdefault.jpg",
        "description": "Create beautiful websites with HTML and CSS.",
        "instructor": "Lisa Anderson",
        "duration": "4 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/mU6anWqZJcc",
        "rating": 3.7
    },
    {
        "title": "MongoDB",
        "image": "https://i.ytimg.com/vi/Www6cTUymCY/maxresdefault.jpg",
        "description": "Learn NoSQL database with MongoDB.",
        "instructor": "Thomas Clark",
        "duration": "6 weeks",
        "price": "₹1,799",
        "videoUrl": "https://www.youtube.com/embed/Www6cTUymCY",
        "rating": 3.5
    },
    {
        "title": "SQL Mastery",
        "image": "https://i.ytimg.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
        "description": "Master database management with SQL.",
        "instructor": "Jennifer White",
        "duration": "5 weeks",
        "price": "₹1,599",
        "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
        "rating": 3.8
    },
    // {
    //     "title": "Android Development",
    //     "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
    //     "description": "Build Android apps with Kotlin.",
    //     "instructor": "Kevin Martin",
    //     "duration": "12 weeks",
    //     "price": "$149.99"
    // }
];

// Function to generate star rating HTML
function generateStarRating(rating) {
    // Scale the rating to 4 stars (divide by 5 and multiply by 4)
    const scaledRating = (rating / 5) * 4;
    const fullStars = Math.floor(scaledRating);
    const hasHalfStar = scaledRating % 1 >= 0.5;
    const emptyStars = 4 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return `
        <div class="course-rating">
            ${starsHTML}
            <span class="rating-value">${rating.toFixed(1)}</span>
        </div>
    `;
}

// Function to check if a course is enrolled
function isEnrolled(courseTitle) {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    return enrolledCourses.some(course => course.title === courseTitle);
}

// Function to create course card
function createCourseCard(course) {
    const isFree = course.price.toLowerCase().includes('free');
    const isUserEnrolled = isEnrolled(course.title);
    
    let viewButtonText = 'Enroll Now';
    let buttonOnClick = `onclick="redirectToPayment('${encodeURIComponent(JSON.stringify(course))}')"`;
    
    if (isUserEnrolled) {
        viewButtonText = 'Enrolled';
        buttonOnClick = `onclick="checkLoginAndViewCourse('${course.videoUrl}', '${course.title}', '${course.description}')"`;
    } else if (isFree) {
        viewButtonText = 'View Tutorial';
        buttonOnClick = `onclick="checkLoginAndViewCourse('${course.videoUrl}', '${course.title}', '${course.description}')"`;
    }

    return `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-info">
                    <div class="course-price">
                        <i class="fas fa-tag"></i>
                        ${course.price}
                    </div>
                    ${generateStarRating(course.rating)}
                </div>
                <a href="javascript:void(0)" ${buttonOnClick} 
                   class="view-course-btn ${isUserEnrolled ? 'enrolled' : ''}">
                    <i class="${isUserEnrolled ? 'fas fa-graduation-cap' : (isFree ? 'fas fa-play-circle' : 'fas fa-shopping-cart')}"></i> ${viewButtonText}
                </a>
            </div>
        </div>
    `;
}

// Add this new function to check login status
function checkLoginAndViewCourse(videoUrl, title, description) {
    const token = localStorage.getItem('token');
    
    if (token) {
        const videoPlayerUrl = `video-player.html?video=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
        window.location.href = videoPlayerUrl;
    } else {
        const shouldRedirect = confirm('Please login to view the tutorial. Would you like to login now?');
        if (shouldRedirect) {
            window.location.href = 'login.html';
        }
    }
}

// Function to redirect to payment page
function redirectToPayment(courseData) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to enroll in this course');
        window.location.href = 'login_signup.html';
        return;
    }

    try {
        const course = JSON.parse(decodeURIComponent(courseData));
        const params = new URLSearchParams({
            title: course.title,
            price: course.price,
            image: course.image,
            instructor: course.instructor,
            duration: course.duration,
            description: course.description,
            videoUrl: course.videoUrl
        });

        window.location.href = `payment.html?${params.toString()}`;
    } catch (error) {
        console.error('Error processing course data:', error);
        alert('Something went wrong. Please try again.');
    }
}

// Function to fetch enrolled courses from backend
async function fetchEnrolledCourses() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('l', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('enrolledCourses', JSON.stringify(data.enrolledCourses));
            return data.enrolledCourses;
        } else {
            console.error('Failed to fetch enrolled courses');
            return [];
        }
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        return [];
    }
}

// Function to open video player
function openVideoPlayer(videoUrl, title, description) {
    // Create video player overlay
    const videoPlayerHTML = `
        <div class="video-player-overlay">
            <div class="video-player-container">
                <div class="video-player-header">
                    <h2>${title}</h2>
                    <div class="header-buttons">
                        <a href="video-player.html?video=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}" 
                           class="fullscreen-btn" 
                           target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open in New Page
                        </a>
                        <button onclick="closeVideoPlayer()" class="close-btn">&times;</button>
                    </div>
                </div>
                <div class="video-player-content">
                    <div class="video-wrapper">
                        <iframe 
                            src="${videoUrl}?autoplay=1&mute=0&rel=0&modestbranding=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            onerror="handleVideoError(this)">
                        </iframe>
                        <div class="video-fallback" style="display: none;">
                            <p>Unable to load video in embedded player.</p>
                            <p>Please try one of these options:</p>
                            <div class="fallback-buttons">
                                <a href="video-player.html?video=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}" 
                                   class="fallback-btn">
                                    <i class="fas fa-play-circle"></i> Watch in Video Player
                                </a>
                                <a href="${videoUrl.replace('embed/', 'watch?v=')}" 
                                   target="_blank" 
                                   class="fallback-btn youtube-btn">
                                    <i class="fab fa-youtube"></i> Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="video-description">
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove any existing video player
    const existingPlayer = document.querySelector('.video-player-overlay');
    if (existingPlayer) {
        existingPlayer.remove();
    }
    
    // Add new video player
    const videoPlayerElement = document.createElement('div');
    videoPlayerElement.innerHTML = videoPlayerHTML;
    document.body.appendChild(videoPlayerElement.firstElementChild);
    document.body.style.overflow = 'hidden';
}

// Function to close video player
function closeVideoPlayer() {
    const videoPlayer = document.querySelector('.video-player-overlay');
    if (videoPlayer) {
        videoPlayer.remove();
        document.body.style.overflow = 'auto';
    }
}

// Handle video loading errors
function handleVideoError(iframe) {
    const videoWrapper = iframe.parentElement;
    const fallback = videoWrapper.querySelector('.video-fallback');
    if (fallback) {
        iframe.style.display = 'none';
        fallback.style.display = 'block';
    }
}

// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search')
    };
}

// Function to filter courses based on search query
function filterCourses(query) {
    query = query.toLowerCase().trim();
    
    const filteredCourses = coursesData.filter(course => {
        return course.title.toLowerCase().includes(query) ||
               course.description.toLowerCase().includes(query);
    });
    
    return filteredCourses;
}

// Function to display courses with search functionality
function displayCourses(searchQuery = '') {
    const coursesGrid = document.getElementById('coursesGrid');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (coursesGrid) {
        let coursesToDisplay = coursesData;
        
        if (searchQuery) {
            coursesToDisplay = filterCourses(searchQuery);
            if (searchInput) {
                searchInput.value = searchQuery;
                clearSearch.classList.add('visible');
            }
        }
        
        if (coursesToDisplay.length === 0) {
            coursesGrid.innerHTML = `
                <div class="no-results visible">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No courses found matching "${searchQuery}"</p>
                    <p>Try different keywords or browse all courses</p>
                </div>
            `;
        } else {
            coursesGrid.innerHTML = coursesToDisplay.map(course => createCourseCard(course)).join('');
        }
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput && clearSearch) {
        // Check for search query in URL
        const params = getUrlParams();
        if (params.search) {
            displayCourses(params.search);
        }

        // Add input event listener for real-time search
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            displayCourses(query);
            
            // Show/hide clear button
            if (query) {
                clearSearch.classList.add('visible');
            } else {
                clearSearch.classList.remove('visible');
            }
        });
        
        // Add clear button functionality
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.classList.remove('visible');
            displayCourses();
            // Update URL without search parameter
            const newUrl = window.location.pathname;
            window.history.pushState({}, '', newUrl);
        });
    }
}

// Initialize courses display and search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const params = getUrlParams();
    displayCourses(params.search || '');
    initializeSearch();
});
