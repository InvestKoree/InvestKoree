// import admin from '../firebaseAdmin.js';





// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Invalid token format" });
//   }

//   admin.auth().verifyIdToken(token)
//     .then(decodedToken => {
//       req.user = decodedToken;
//       next();
//     })
//     .catch(error => {
//       console.error("Token verification error:", error);
//       res.status(401).json({ message: "Unauthorized" });
//     });
// };

// export default authMiddleware;
