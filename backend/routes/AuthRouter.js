const {authenticateUser} = require('../controllers/AuthController');
const router = require('express').Router();

// user login page
router.post('/user', authenticateUser);

module.exports = router;