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

// Get all contacts with optional status filter
exports.getAllContacts = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status && status !== 'all' ? { status } : {};
        const contacts = await Contact.find(query).sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
};

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully', data: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact status', error: error.message });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
}; 