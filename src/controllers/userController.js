const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'First name and last name are required.' });
        }

        // Check if a user with the same first and last name already exists
        const existingUser = await User.findOne({ firstName, lastName });

        if (existingUser) {
            return res.status(400).json({ error: 'User with the same name already exists.' });
        }

        const newUser = new User({
            firstName,
            lastName,
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;

        // Check if a user with the new name already exists
        const existingUser = await User.findOne({ firstName, lastName });
        if (existingUser) {
            return res.status(400).json({ error: 'A user with this name already exists.' });
        }

        const user = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


