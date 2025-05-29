const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Get all contacts with optional status filter
router.get('/', contactController.getAllContacts);

// Create a new contact
router.post('/', contactController.createContact);

// Update contact status
router.patch('/:id/status', contactController.updateContactStatus);

// Delete a contact
router.delete('/:id', contactController.deleteContact);

router.post('/submit', contactController.submitContact);

module.exports = router; 