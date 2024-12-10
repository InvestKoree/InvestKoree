import { useState, useEffect } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../Firebase/firebase.config.js";
import { toast } from "react-toastify";
import { connectAuthEmulator } from "firebase/auth";

const OTPModal = ({ phoneNumber, onClose, onSuccess, isOpen }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      sendOTP(); // Automatically send OTP when modal opens
    }
  }, [isOpen]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // Invisible reCAPTCHA for OTP
          callback: (response) => {
            console.log("Recaptcha solved:", response);
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        },
        auth
      );
    }
  };

  const sendOTP = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        console.log("Confirmation result:", confirmation);
        setConfirmationResult(confirmation);
        setOtpSent(true);
        toast.success("OTP sent successfully!");
        startTimer();
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Try again later.");
      });
    if (process.env.NODE_ENV === "development") {
      auth.settings.appVerificationDisabledForTesting = true; // Disable for testing
      connectAuthEmulator(auth, "http://localhost:5173"); // Point to your emulator
    }
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOTP = () => {
    if (otp.trim().length !== 6 || isNaN(otp)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((result) => {
        toast.success("Verification successful!");
        setOtpVerified(true);
        onSuccess();
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        toast.error("Invalid OTP. Please try again.");
      });
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      sendOTP();
    } else {
      toast.error(`Please wait ${timer}s before resending OTP`);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Verify Phone Number</h2>
          <p>Please enter the OTP sent to {phoneNumber}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div id="recaptcha-container"></div>
          <button onClick={verifyOTP} disabled={!otpSent}>
            Verify OTP
          </button>
          <button onClick={handleResendOTP} disabled={timer > 0}>
            Resend OTP {timer > 0 && `(${timer}s)`}
          </button>
          <button onClick={onClose} disabled={!otpVerified}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default OTPModal;
