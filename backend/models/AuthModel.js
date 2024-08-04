const db = require('../config/db');
const bcrypt = require('bcrypt');

class Authentication {
    static async UserLogin(username, password) {
        try {
            // Retrieve the hashed password from the database for the given username
            const [rows, _] = await db.execute('SELECT password FROM students WHERE email = ?', [username]);

            if (rows.length === 0) {
                return null; // No user found with the given username
            }

            const hashedPassword = rows[0].password;

            // Compare the provided plain text password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, hashedPassword);

            if (isPasswordValid) {
                // Passwords match, user is authenticated
                return {
                    isAuthenticated: true,
                    user: {
                        stu_id: rows[0].stu_id,
                        name: rows[0].name,
                        gender: rows[0].gender,
                    },
                };
            } else {
                // Passwords do not match, authentication failed
                return {
                    isAuthenticated: false,
                };
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Authentication;
