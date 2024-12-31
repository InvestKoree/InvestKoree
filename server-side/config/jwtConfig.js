import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables from .env file
dotenv.config();

// Use the secret key from the environment variable
const secretKey = process.env.JWT_SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log("Generated Secret Key:", secretKey);
// Export the secret key
export default secretKey;