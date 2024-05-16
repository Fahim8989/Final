const db = require('../configs/db');

function createUser(username, email, password) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function getUserById(userId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // Assuming user IDs are unique, so we only return the first result
            }
        });
    });
}
async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                // Check if the query returned any results
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null); // Resolve with null if no user is found
                }
            }
        });
    });
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
};