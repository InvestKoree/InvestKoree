import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

async function createUser (userData) {
    const { name, email, password, role, phone } = userData;

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
    return savedUser ;
}

export default createUser ;