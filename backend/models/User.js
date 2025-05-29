const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    avatar: {
        type: String,
        default: ''
    },
    enrolledCourses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        completedLectures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'
        }],
        progress: {
            type: Number,
            default: 0
        },
        lastAccessed: {
            type: Date,
            default: Date.now
        }
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Virtual for getting user's enrolled courses with progress
userSchema.virtual('enrollments', {
    ref: 'Course',
    localField: 'enrolledCourses.course',
    foreignField: '_id'
});

// Method to check if user is enrolled in a course
userSchema.methods.isEnrolled = function(courseId) {
    return this.enrolledCourses.some(enrollment => 
        enrollment.course.toString() === courseId.toString()
    );
};

// Method to get user's progress in a specific course
userSchema.methods.getCourseProgress = function(courseId) {
    const enrollment = this.enrolledCourses.find(enrollment => 
        enrollment.course.toString() === courseId.toString()
    );
    
    return enrollment ? enrollment.progress : 0;
};

// Method to mark a lecture as completed
userSchema.methods.completeLecture = async function(courseId, lectureId) {
    const enrollment = this.enrolledCourses.find(enrollment => 
        enrollment.course.toString() === courseId.toString()
    );
    
    if (enrollment && !enrollment.completedLectures.includes(lectureId)) {
        enrollment.completedLectures.push(lectureId);
        await this.save();
        return true;
    }
    
    return false;
};

// Method to enroll in a course
userSchema.methods.enrollInCourse = async function(courseId) {
    if (!this.isEnrolled(courseId)) {
        this.enrolledCourses.push({
            course: courseId,
            enrolledAt: Date.now()
        });
        await this.save();
        return true;
    }
    return false;
};

module.exports = mongoose.model('User', userSchema);
