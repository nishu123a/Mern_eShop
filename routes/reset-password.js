const express = require("express");
const router = express.Router();
const { generatePasswordResetToken,sendPasswordResetEmail } = require("./sendpasswordresetemail"); // Implement this function to generate a reset token

router.post("/reset-password", (req, res) => {
  const { email } = req.profile;

  // Implement validation for the email address

  // Generate a password reset token (with a limited expiration time)
  const resetToken = generatePasswordResetToken(email);

  // Send an email with the reset token
  sendPasswordResetEmail(email, resetToken);

  return res.json({ message: "Password reset link sent. Check your email." });
});

module.exports = router;
