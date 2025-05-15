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
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if course is already enrolled
    const isEnrolled = user.enrolledCourses.some(course => course.title === title);
    if (isEnrolled) {
      return res.status(400).json({ msg: 'Course already enrolled' });
    }

    // Add course to enrolled courses
    user.enrolledCourses.push({
      title,
      orderId,
      date: new Date(),
      price,
      videoUrl
    });

    await user.save();
    res.json({ msg: 'Course enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    console.error('❌ Enrollment error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ enrolledCourses: user.enrolledCourses || [] });
  } catch (err) {
    console.error('❌ Error fetching enrolled courses:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
