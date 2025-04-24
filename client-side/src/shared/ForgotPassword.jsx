// Step 2: Create ForgotPassword.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendLink = async () => {
    if (!input) return toast.error("Please enter your email or phone number");

    try {
      setIsSending(true);
      await axios.post("/api/forgot-password", { identifier: input });
      toast.success("Reset link sent to your email or phone if it exists");
    } catch (err) {
      toast.error(err.response?.data?.message || "No account found");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>Forgot Password</h2>
      <input
        type="text"
        placeholder="Enter email or phone"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSendLink} disabled={isSending}>
        {isSending ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
};

export default ForgotPassword;
