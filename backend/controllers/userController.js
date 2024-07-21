const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with hashed password
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        // Find the user by ID
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the update data
        let updateData = {};

        // If email is provided and different from the current email, check for duplicates and update
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            updateData.email = email;
        }

        // If name is provided, update it
        if (name) {
            updateData.name = name;
        }

        // If password is provided, hash it before updating
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Update the user with the provided fields
        user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Optional
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, authUser, updateUser, deleteUser };
