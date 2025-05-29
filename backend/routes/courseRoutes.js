const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const courseController = require('../controllers/courseController');

// @route   POST /api/courses/enroll
// @desc    Enroll a user in a course
// @access  Private
router.post(
    '/enroll',
    [
        auth,
        [
            check('courseId', 'Course ID is required').not().isEmpty()
        ]
    ],
    courseController.enrollInCourse
);

// @route   GET /api/courses/my-courses
// @desc    Get all courses enrolled by the current user
// @access  Private
router.get('/my-courses', auth, courseController.getMyCourses);

// @route   GET /api/courses/:id
// @desc    Get course details by ID
// @access  Private
router.get('/:id', auth, courseController.getCourseDetails);

// @route   PUT /api/courses/:courseId/lectures/:lectureId/complete
// @desc    Mark a lecture as completed
// @access  Private
router.put(
    '/:courseId/lectures/:lectureId/complete',
    auth,
    courseController.completeLecture
);

module.exports = router;
