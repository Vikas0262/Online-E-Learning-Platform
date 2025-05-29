const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        default: 'All Levels'
    },
    thumbnail: {
        type: String,
        required: true
    },
    previewVideo: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    lectures: [{
        title: String,
        duration: Number, // in minutes
        videoUrl: String,
        description: String,
        resources: [{
            title: String,
            url: String
        }]
    }],
    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
        }
    }],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    requirements: [String],
    learningOutcomes: [String],
    isPublished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update the enrolledStudents array when a student enrolls
courseSchema.methods.enrollStudent = async function(studentId) {
    const isEnrolled = this.enrolledStudents.some(enrollment => 
        enrollment.student.toString() === studentId.toString()
    );

    if (!isEnrolled) {
        this.enrolledStudents.push({
            student: studentId,
            enrolledAt: Date.now()
        });
        
        await this.save();
        return true;
    }
    
    return false; // Already enrolled
};

// Update user's progress in the course
courseSchema.methods.updateProgress = async function(studentId, lectureId) {
    const enrollment = this.enrolledStudents.find(enrollment => 
        enrollment.student.toString() === studentId.toString()
    );

    if (enrollment) {
        // Check if lecture is already marked as completed
        const isCompleted = enrollment.completedLectures.some(lecture => 
            lecture.toString() === lectureId.toString()
        );

        if (!isCompleted) {
            enrollment.completedLectures.push(lectureId);
            
            // Update progress percentage
            enrollment.progress = Math.min(
                Math.round((enrollment.completedLectures.length / this.lectures.length) * 100),
                100
            );
            
            await this.save();
            return true;
        }
    }
    
    return false;
};

// Get course progress for a specific student
courseSchema.methods.getStudentProgress = function(studentId) {
    const enrollment = this.enrolledStudents.find(enrollment => 
        enrollment.student.toString() === studentId.toString()
    );
    
    return enrollment ? enrollment.progress : 0;
};

// Get all enrolled students
courseSchema.methods.getEnrolledStudents = function() {
    return this.populate('enrolledStudents.student', 'name email');
};

module.exports = mongoose.model('Course', courseSchema);
