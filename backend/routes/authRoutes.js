const express = require('express');
const { register, login, enrollCourse, getEnrolledCourses } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/enroll', auth, enrollCourse);
router.get('/enrolled-courses', auth, getEnrolledCourses);

module.exports = router;