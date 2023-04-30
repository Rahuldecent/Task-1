const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload');

router.post('/events' ,upload.single('image') ,eventController.createEvent);
router.get('/events' ,eventController.getEventByid);
router.get('/event',eventController.findEvent)
router.put('/events/:id',eventController.updateEvent)
router.delete('/events/:id',eventController.deleteEvent);

module.exports = router;