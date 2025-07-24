import express from 'express';
import Ticket from '../models/Ticket.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Ticket
router.post('/', protect, async (req, res) => {
  const { title, description, priority } = req.body;

  console.log(title, description, priority);

  try {
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user._id,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create ticket' });
  }
});

// Get All Tickets for Logged-in User
router.get('/', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});

// Get Single Ticket
router.get('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
});

// Update Ticket (title, description, status, priority)
router.put('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: 'Ticket not found or unauthorized' });

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update ticket' });
  }
});

// Delete Ticket
router.delete('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!ticket) return res.status(404).json({ message: 'Ticket not found or unauthorized' });

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
});

export default router;
