const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body); // Debug log

    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields'); // Debug log
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new contact message
    const contactMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save to database
    const savedMessage = await contactMessage.save();
    console.log('Message saved successfully:', savedMessage); // Debug log

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
}; 