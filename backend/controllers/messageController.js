const Message = require('../models/Message');

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message status', error: error.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
}; 