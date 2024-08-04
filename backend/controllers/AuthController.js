const Authentication = require('../models/AuthModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison

const authenticateUser = async (req, res, next) => {
    try {
        const username = req.body.authData.username;
        const password = req.body.authData.password;

        // Authenticate the user using the Authentication.UserLogin method
        const authResult = await Authentication.UserLogin(username, password);

        if (authResult && authResult.isAuthenticated) {
            // Authentication succeeded, generate a JWT token and send it in the response
            const user = authResult.user;

            const token = jwt.sign({ userId: user.stu_id, name: user.name, gender: user.gender }, 'your_secret_key', {
                expiresIn: '1h',
            });

            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error.response);
        next(error);
        res.status(500).json({ error: error });
    }
};

module.exports = { authenticateUser };
