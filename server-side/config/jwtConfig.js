import crypto from 'crypto';

// Generate the secret key once
const secretKey = crypto.randomBytes(32).toString('hex');

// Export only the secret key string directly
export default secretKey;