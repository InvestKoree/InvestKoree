import User from '../models/userModel.js';
import bcrypt from 'bcrypt';



async function  createUser(userData) {
    const{name,email,password} =userData;
    const hashedPassword =bcrypt.hash(password,10);
    const createUser = new User({
        name,
        email,
        password :hashedPassword,
        role ,phone
    });

    const savedUser = await createUser.save();
    return savedUser;

}

export default createUser;