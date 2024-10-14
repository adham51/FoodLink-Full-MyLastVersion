const food = require('express').Router();
const db = require('../database/db_conection');
const bcrypt = require('bcrypt');
const { query } = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.json({ message: 'Token missing' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
};

// API to add a new food donation
food.post('/add', authenticateToken, (req, res) => {
    const { food_name, quantity, description, expiration_date } = req.body;
    const { user_id, user_type } = req.user;

    if (user_type !== 'donor') {
        return res.json({ message: 'You are not a donor' });
    }

    // Use connection.query instead of _query
    connection.query(`INSERT INTO foodlist (user_id, food_name, quantity, description, expiration_date, status) VALUES (?, ?, ?, ?, ?, 'available')`, [user_id, food_name, quantity, description, expiration_date], (err, results) => {
        if (err) {
            res.json({ message: 'Error adding food item' });
            console.log(err);
        } else {
            res.json({ message: 'Food Added Successfully' });
        }
    });
});

// API to get all available food items
food.get('/available', (req, res) => {
    connection.query(`SELECT * FROM foodlist WHERE status = 'available'`, (err, data) => {
        if (err) {
            res.json({ message: 'Error' });
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// API to get all donations by a specific donor
food.get('/donor/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    connection.query(`SELECT * FROM foodlist WHERE user_id = ?`, [user_id], (err, data) => {
        if (err) {
            res.json({ message: 'Error' });
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// API to delete a food item
food.delete('/deletefood/:food_id', (req, res) => {
    const food_id = req.params.food_id;
    connection.query(`DELETE FROM foodlist WHERE food_id = ?`, [food_id], (err, data) => {
        if (err) {
            res.json({ message: 'Error' });
            console.log(err);
        } else {
            res.json({ message: 'Food deleted successfully' });
        }
    });
});

// Route to get food item details by food_id
food.get('/food/:food_id', (req, res) => {
    const { food_id } = req.params;

    connection.query(`SELECT * FROM foodlist WHERE food_id = ?`, [food_id], (err, data) => {
        if (err || data.length === 0) {
            res.json({ message: 'Food item not found' });
        } else {
            res.json(data[0]);
        }
    });
});

// Export the router
module.exports = food;
