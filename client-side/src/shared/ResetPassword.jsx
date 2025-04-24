import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      return toast.error("Passwords do not match or are empty");
    }

    try {
      await axios.post(`/api/reset-password/${token}`, { newPassword });
      toast.success("Password updated successfully");
      navigate("/investorlogin");
    } catch (err) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ResetPassword;
