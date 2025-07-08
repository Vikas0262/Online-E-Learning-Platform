# Learning World - Online E-Learning Platform

![Learning World Banner](frontend/images/HomeAsideLeft.jpeg)

A comprehensive e-learning platform that provides an interactive learning experience with a wide range of courses, blog content, and user management features. The platform features a responsive design that works seamlessly across all devices, with an intuitive user interface and smooth navigation.

## 🌟 Features

### User Features
- **User Authentication**
  - Secure registration and login
  - Password reset functionality
  - Profile management with avatar support
  - Role-based access control (Admin/Student/Instructor)
  - Persistent login sessions
  - Responsive profile dropdown with quick access to account settings

### Course Management
- Browse and search courses
- Course categories and filters
- Course details and curriculum
- Progress tracking
- Ratings and reviews

### Interactive Learning
- Video lessons with progress tracking
- Course materials and downloadable resources
- Interactive quizzes and assignments
- Discussion forums for peer interaction
- Certificate of completion with verification
- Mobile-optimized learning interface

### Blog & Community
- Educational blog posts
- Comments and discussions
- Knowledge sharing
- Latest trends in education

### Admin Dashboard
- User management
- Course approval and management
- Content moderation
- Analytics and reports

## 🛠️ Technologies Used

### Frontend
- **HTML5, CSS3, JavaScript** - Core web technologies
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Font Awesome** - Icons and UI components
- **CSS Grid & Flexbox** - Modern layout techniques
- **JavaScript (ES6+)** - Client-side functionality
- **Progressive Web App (PWA)** - Offline capabilities and app-like experience
- **Accessibility** - WCAG 2.1 compliant components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email notifications
- **Bcrypt** - Password hashing

### Development Tools
- **Git** - Version control with GitHub integration
- **NPM** - Package management
- **Nodemon** - Development server with hot-reload
- **ESLint & Prettier** - Code quality and formatting
- **VS Code** - Recommended code editor with extensions support
- **Chrome DevTools** - For debugging and performance optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)
- NPM (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Online-E-Learning-Platform.git
   cd Online-E-Learning-Platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Open the frontend**
   - Open the `frontend` folder in your preferred web server
   - Or use a local server like Live Server in VS Code

## 📂 Project Structure

```
Online-E-Learning-Platform/
├── backend/               # Backend server code
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Server entry point
├── frontend/             # Frontend code
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── images/           # Static images
│   └── *.html            # HTML pages
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Latest Updates

### v1.2.0 - 2025-07-09
- **Enhanced Navigation**
  - Redesigned responsive navigation bar
  - Improved mobile menu with smooth animations
  - Profile icon with dropdown menu
  - Better touch targets for mobile devices

### v1.1.0 - 2025-06-25
- **Performance Improvements**
  - Optimized asset loading
  - Reduced bundle size
  - Improved page load times

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 🙋‍♂️ Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## ✉️ Contact

For any inquiries, please reach out to [vikas.v6543@gmail.com](mailto:vikas.v6543@gmail.com)

---

<div align="center">
  Made By Vikas Vishwakarma
</div>
