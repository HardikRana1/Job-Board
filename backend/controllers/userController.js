const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { userType, name, email, password, companyName, companyAddress } = req.body;
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create user with hashed password
        const user = await User.create({ 
            userType, 
            name, 
            email, 
            password: hashedPassword,
            companyName: userType === 'employer' ? companyName : null,
            companyAddress: userType === 'employer' ? companyAddress : null
        });


        res.status(201).json({
            _id: user._id,
            userType: user.userType,
            name: user.name,
            email: user.email,
            companyName: user.companyName,
            companyAddress: user.companyAddress,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Data is received at backend side');
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
       
        
        const isMatch = await bcrypt.compare(password, user.password);
       

        if (user && isMatch) {
            res.json({
                _id: user._id,
                userType: user.userType,
                name: user.name,
                email: user.email,
                companyName: user.companyName,
                companyAddress: user.companyAddress,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
            console.log('Invalid password');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { userType, name, email, password, companyName, companyAddress } = req.body;

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

        // Update company details if the user is an employer
        if (userType === 'employer') {
            if (companyName) {
                updateData.companyName = companyName;
            }
            if (companyAddress) {
                updateData.companyAddress = companyAddress;
            }
        }

        // Update the user with the provided fields
        user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        res.json({
            _id: user._id,
            userType: user.userType,
            name: user.name,
            email: user.email,
            companyName: user.companyName,
            companyAddress: user.companyAddress,
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
