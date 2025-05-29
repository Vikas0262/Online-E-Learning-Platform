const Course = require('../models/Course');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Enroll a user in a course
// @route   POST /api/courses/enroll
// @access  Private
exports.enrollInCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { courseId } = req.body;
        const userId = req.user.id;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if already enrolled
        if (user.isEnrolled(courseId)) {
            return res.status(400).json({ msg: 'Already enrolled in this course' });
        }

        // Enroll the user in the course
        await user.enrollInCourse(courseId);
        
        // Add student to course's enrolled students
        await course.enrollStudent(userId);

        res.status(201).json({
            success: true,
            msg: 'Successfully enrolled in the course',
            course: {
                _id: course._id,
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                instructor: course.instructor,
                enrolledAt: Date.now()
            }
        });

    } catch (err) {
        console.error('Error enrolling in course:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Get user's enrolled courses
// @route   GET /api/courses/my-courses
// @access  Private
exports.getMyCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'enrolledCourses.course',
            select: 'title description thumbnail instructor totalHours lectures',
            populate: {
                path: 'instructor',
                select: 'name'
            }
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Format the response
        const enrolledCourses = user.enrolledCourses.map(enrollment => ({
            _id: enrollment.course._id,
            title: enrollment.course.title,
            description: enrollment.course.description,
            thumbnail: enrollment.course.thumbnail,
            instructor: enrollment.course.instructor,
            totalLectures: enrollment.course.lectures.length,
            totalHours: enrollment.course.totalHours,
            enrolledAt: enrollment.enrolledAt,
            progress: enrollment.progress,
            lastAccessed: enrollment.lastAccessed
        }));

        res.status(200).json({
            success: true,
            count: enrolledCourses.length,
            data: enrolledCourses
        });

    } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Get course details
// @route   GET /api/courses/:id
// @access  Private
exports.getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('enrolledStudents.student', 'name email');

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Check if user is enrolled
        const isEnrolled = req.user && course.enrolledStudents.some(
            student => student.student._id.toString() === req.user.id
        );

        // If not enrolled and not the instructor, don't show full content
        if (!isEnrolled && (!req.user || req.user.id !== course.instructor._id.toString())) {
            return res.status(200).json({
                success: true,
                isEnrolled: false,
                preview: {
                    _id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: course.thumbnail,
                    instructor: course.instructor,
                    rating: course.rating,
                    numReviews: course.numReviews,
                    totalStudents: course.enrolledStudents.length,
                    totalHours: course.totalHours,
                    totalLectures: course.lectures.length,
                    previewVideo: course.previewVideo,
                    requirements: course.requirements,
                    learningOutcomes: course.learningOutcomes,
                    level: course.level,
                    category: course.category
                }
            });
        }

        // If enrolled or is instructor, show full content
        let userProgress = 0;
        if (isEnrolled) {
            const enrollment = course.enrolledStudents.find(
                e => e.student._id.toString() === req.user.id
            );
            userProgress = enrollment ? enrollment.progress : 0;
        }

        res.status(200).json({
            success: true,
            isEnrolled: true,
            progress: userProgress,
            data: course
        });

    } catch (err) {
        console.error('Error fetching course details:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Mark lecture as completed
// @route   PUT /api/courses/:courseId/lectures/:lectureId/complete
// @access  Private
exports.completeLecture = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.user.id;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Check if lecture exists in course
        const lecture = course.lectures.find(l => l._id.toString() === lectureId);
        if (!lecture) {
            return res.status(404).json({ msg: 'Lecture not found in this course' });
        }

        // Update user's progress
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Mark lecture as completed and update progress
        const enrollment = user.enrolledCourses.find(
            e => e.course.toString() === courseId
        );

        if (!enrollment) {
            return res.status(400).json({ msg: 'Not enrolled in this course' });
        }

        // Check if already completed
        if (!enrollment.completedLectures.includes(lectureId)) {
            enrollment.completedLectures.push(lectureId);
            
            // Calculate new progress
            const totalLectures = course.lectures.length;
            const completedLectures = enrollment.completedLectures.length;
            enrollment.progress = Math.min(
                Math.round((completedLectures / totalLectures) * 100),
                100
            );
            
            // Update last accessed
            enrollment.lastAccessed = Date.now();
            
            await user.save();
            
            // Also update in Course model for analytics
            await course.updateProgress(userId, lectureId);
        }

        res.status(200).json({
            success: true,
            progress: enrollment.progress,
            completedLectures: enrollment.completedLectures
        });

    } catch (err) {
        console.error('Error marking lecture as completed:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
