// Sample API data
const coursesData = [
    {
        "title": "Mastering JavaScript",
        "image": "https://i.ytimg.com/vi/xc3a_CJhjCc/maxresdefault.jpg",
        "description": "Learn JavaScript from scratch to advanced level.",
        "instructor": "John Doe",
        "duration": "8 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/xc3a_CJhjCc"
    },
    {
        "title": "React for Beginners",
        "image": "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
        "description": "A complete React.js guide for new developers.",
        "instructor": "Jane Smith",
        "duration": "6 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/Ke90Tje7VS0"
    },
    {
        "title": "Backend with Node.js",
        "image": "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
        "description": "Build powerful APIs using Node and Express.",
        "instructor": "Mike Johnson",
        "duration": "10 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/Oe421EPjeBE"
    },
    {
        "title": "C Programming",
        "image": "https://i.ytimg.com/vi/KJgsSFOSQv0/maxresdefault.jpg",
        "description": "Master the fundamentals of C programming language.",
        "instructor": "Robert Johnson",
        "duration": "6 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/KJgsSFOSQv0"
    },
    {
        "title": "C++ Programming",
        "image": "https://i.ytimg.com/vi/8jLOx1hD3_o/maxresdefault.jpg",
        "description": "Learn object-oriented programming with C++.",
        "instructor": "Michael Brown",
        "duration": "8 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/8jLOx1hD3_o"
    },
    {
        "title": "Java Development",
        "image": "https://i.ytimg.com/vi/eIrMbAQSU34/maxresdefault.jpg",
        "description": "Build robust applications with Java.",
        "instructor": "Sarah Wilson",
        "duration": "10 weeks",
        "price": "$119.99",
        "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34"
    },
    {
        "title": "Python Programming",
        "image": "https://i.ytimg.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
        "description": "Learn Python from basics to advanced concepts.",
        "instructor": "David Lee",
        "duration": "8 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8"
    },
    {
        "title": "Ruby on Rails",
        "image": "https://i.ytimg.com/vi/B3Fbujmgo60/maxresdefault.jpg",
        "description": "Build web applications with Ruby on Rails.",
        "instructor": "Emily Davis",
        "duration": "7 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/B3Fbujmgo60"
    },
    {
        "title": "Dart Programming",
        "image": "https://i.ytimg.com/vi/1ukSR1GRtMU/maxresdefault.jpg",
        "description": "Master Dart for Flutter development.",
        "instructor": "James Wilson",
        "duration": "5 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/1ukSR1GRtMU"
    },
    {
        "title": "HTML & CSS",
        "image": "https://i.ytimg.com/vi/mU6anWqZJcc/maxresdefault.jpg",
        "description": "Create beautiful websites with HTML and CSS.",
        "instructor": "Lisa Anderson",
        "duration": "4 weeks",
        "price": "FREE",
        "videoUrl": "https://www.youtube.com/embed/mU6anWqZJcc"
    },
    {
        "title": "MongoDB",
        "image": "https://i.ytimg.com/vi/Www6cTUymCY/maxresdefault.jpg",
        "description": "Learn NoSQL database with MongoDB.",
        "instructor": "Thomas Clark",
        "duration": "6 weeks",
        "price": "$89.99",
        "videoUrl": "https://www.youtube.com/embed/Www6cTUymCY"
    },
    {
        "title": "SQL Mastery",
        "image": "https://i.ytimg.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
        "description": "Master database management with SQL.",
        "instructor": "Jennifer White",
        "duration": "5 weeks",
        "price": "$84.99",
        "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY"
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

// Function to create course card
function createCourseCard(course) {
    return `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-price">
                    <i class="fas fa-tag"></i>
                    ${course.price}
                </div>
                <div class="course-meta">
                    <span class="instructor">
                        <i class="fas fa-user"></i>
                        ${course.instructor}
                    </span>
                    <span class="duration">
                        <i class="fas fa-clock"></i>
                        ${course.duration}
                    </span>
                </div>
                <a href="video-player.html?video=${encodeURIComponent(course.videoUrl)}&title=${encodeURIComponent(course.title)}&description=${encodeURIComponent(course.description)}" 
                   class="view-course-btn">
                    <i class="fas fa-play-circle"></i> View Tutorial
                </a>
            </div>
        </div>
    `;
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

// Function to display courses
function displayCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (coursesGrid) {
        coursesGrid.innerHTML = coursesData.map(course => createCourseCard(course)).join('');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
});
