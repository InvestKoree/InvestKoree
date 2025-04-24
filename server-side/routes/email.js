// // server/routes/email.js (ES Module version)

// import express from "express";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const router = express.Router();

// router.post("/send-registration-email", async (req, res) => {
//   const { to, name } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail", // or your preferred email provider
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"InvestKoree" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: "Thank You for Registering with InvestKoree",
//       html: `<p>Hi ${name},</p>
//              <p>Thank you for registering with <strong>InvestKoree</strong>! We're excited to help you connect with investors and grow your business.</p>
//              <p>Best,<br/>The InvestKoree Team</p>`,
//     });

//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// });

// export default router;
