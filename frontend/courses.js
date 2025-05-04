
// Sample API data
const coursesData = [
    {
        "title": "Mastering JavaScript",
        "image": "https://i.ytimg.com/vi/xc3a_CJhjCc/maxresdefault.jpg",
        "description": "Learn JavaScript from scratch to advanced level.",
        "instructor": "John Doe",
        "duration": "8 weeks",
        "price": "$99.99"
    },
    {
        "title": "React for Beginners",
        "image": "https://th.bing.com/th/id/OIP.2GDkgyKi2FjEDunhJouC8gHaEK?rs=1&pid=ImgDetMain",
        "description": "A complete React.js guide for new developers.",
        "instructor": "Jane Smith",
        "duration": "6 weeks",
        "price": "$79.99"
    },
    {
        "title": "Backend with Node.js",
        "image": "https://th.bing.com/th/id/OIP.A1oCRlq3ksd69Jpac6FW2wHaDe?rs=1&pid=ImgDetMain",
        "description": "Build powerful APIs using Node and Express.",
        "instructor": "Mike Johnson",
        "duration": "10 weeks",
        "price": "FREE"
    },
    {
        "title": "C Programming",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Master the fundamentals of C programming language.",
        "instructor": "Robert Johnson",
        "duration": "6 weeks",
        "price": "$89.99"
    },
    {
        "title": "C++ Programming",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Learn object-oriented programming with C++.",
        "instructor": "Michael Brown",
        "duration": "8 weeks",
        "price": "$99.99"
    },
    {
        "title": "Java Development",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Build robust applications with Java.",
        "instructor": "Sarah Wilson",
        "duration": "10 weeks",
        "price": "$119.99"
    },
    {
        "title": "Python Programming",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Learn Python from basics to advanced concepts.",
        "instructor": "David Lee",
        "duration": "8 weeks",
        "price": "$94.99"
    },
    {
        "title": "Ruby on Rails",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Build web applications with Ruby on Rails.",
        "instructor": "Emily Davis",
        "duration": "7 weeks",
        "price": "$109.99"
    },
    {
        "title": "Dart Programming",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Master Dart for Flutter development.",
        "instructor": "James Wilson",
        "duration": "5 weeks",
        "price": "$79.99"
    },
    {
        "title": "HTML & CSS",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Create beautiful websites with HTML and CSS.",
        "instructor": "Lisa Anderson",
        "duration": "4 weeks",
        "price": "$69.99"
    },
    {
        "title": "MongoDB",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Learn NoSQL database with MongoDB.",
        "instructor": "Thomas Clark",
        "duration": "6 weeks",
        "price": "$89.99"
    },
    {
        "title": "SQL Mastery",
        "image": "https://th.bing.com/th/id/OIP.0QwQh0QwQh0QwQh0QwQh0QHaEK?rs=1&pid=ImgDetMain",
        "description": "Master database management with SQL.",
        "instructor": "Jennifer White",
        "duration": "5 weeks",
        "price": "$84.99"
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
                <a href="course-details.html?id=${course.title.toLowerCase().replace(/\s+/g, '-')}" class="view-course-btn">View Course</a>
            </div>
        </div>
    `;
}

// Function to display courses
function displayCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    
    // Simulate API delay
    setTimeout(() => {
        coursesGrid.innerHTML = coursesData.map(course => createCourseCard(course)).join('');
    }, 1000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', displayCourses);
