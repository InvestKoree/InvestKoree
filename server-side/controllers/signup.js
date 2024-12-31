import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

async function createUser (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { name, email, password, role, phone } = req.body;

        // Check if the user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        });

        // Save the user to the database
        const savedUser  = await newUser .save();
        res.status(201).json(savedUser );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { createUser  };