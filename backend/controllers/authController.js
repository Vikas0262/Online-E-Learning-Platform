const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('📥 Signup data received:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log('✅ User registered:', newUser);
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login data received:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('✅ Login successful. Token generated:', token);

    // Send enrolled courses with login response
    res.json({ 
      msg: 'Login successful', 
      token, 
      name: user.name,
      enrolledCourses: user.enrolledCourses || []
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const { title, orderId, price, videoUrl } = req.body;
    
    // Get user ID from the authenticated request (set by auth middleware)
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if course is already enrolled
    const isEnrolled = user.enrolledCourses.some(course => course.title === title);
    if (isEnrolled) {
      return res.status(400).json({ 
        success: false,
        msg: 'You are already enrolled in this course' 
      });
    }

    // Add course to enrolled courses
    const enrollmentData = {
      title,
      orderId: orderId || `ORD-${Date.now()}`,
      date: new Date(),
      price: price || '0',
      videoUrl: videoUrl || ''
    };

    user.enrolledCourses.push(enrollmentData);
    await user.save();
    
    // Return the updated list of enrolled courses
    res.json({ 
      success: true,
      msg: 'Course enrolled successfully', 
      enrolledCourses: user.enrolledCourses 
    });
  } catch (err) {
    console.error('❌ Enrollment error:', err);
    res.status(500).json({ 
      success: false,
      msg: 'Internal server error' 
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    // Get user ID from the authenticated request (set by auth middleware)
    const userId = req.user.id;
    
    // Find the user and populate the enrolled courses
    const user = await User.findById(userId).select('enrolledCourses');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: 'User not found' 
      });
    }
    
    // Format the response
    const formattedCourses = user.enrolledCourses.map(course => ({
      _id: course._id,
      title: course.title,
      orderId: course.orderId,
      date: course.date,
      price: course.price,
      videoUrl: course.videoUrl,
      // Add any additional fields you want to include
    }));
    
    res.json({ 
      success: true,
      count: formattedCourses.length,
      enrolledCourses: formattedCourses 
    });
  } catch (err) {
    console.error('❌ Error fetching enrolled courses:', err);
    res.status(500).json({ 
      success: false,
      msg: 'Internal server error' 
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        // The user ID is already available in req.user from the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            location: user.location,
            enrolledCourses: user.enrolledCourses || []
        });
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
