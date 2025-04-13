import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import OTPModal from "../../shared/OTPModal";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FounderLogin = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const { t } = useTranslation();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false,
  });
  const { createUser, foundersignIn } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({ login: false, register: false });
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false); // New state for registration success
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, login: true }));
    setError(null);

    const form = new FormData(e.currentTarget);
    const loginInput = form.get("u_signin_email_or_phone");
    const password = form.get("u_signin_pass");

    if (!loginInput || !password) {
      setError("Email/Phone and Password are required");
      setIsLoading((prev) => ({ ...prev, login: false }));
      return;
    }

    const isPhoneNumber = /^01\d{9}$/.test(loginInput); // Validate phone number format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput); // Validate email format

    if (!isPhoneNumber && !isEmail) {
      setError(
        "Please enter a valid email or phone number containing 11 numbers and starting with 01"
      );
      setIsLoading((prev) => ({ ...prev, login: false }));
      return;
    }

    try {
      if (isPhoneNumber) {
        await foundersignIn(null, password, loginInput); // Pass phone as the third parameter
      } else {
        await foundersignIn(loginInput, password, null); // Pass email as the first parameter
      }

      toast.success("Login successful");
    } catch (err) {
      toast.error(err.message || "Login error");
      setError(err.message || "Login error");
    } finally {
      setIsLoading((prev) => ({ ...prev, login: false }));
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading((prev) => ({ ...prev, register: true }));

    const form = new FormData(e.currentTarget);
    const name = form.get("u_signup_name");
    const email = form.get("u_signup_email");
    const phone = form.get("u_signup_number");
    const password = form.get("u_signup_password");
    const confirmPassword = form.get("u_signup_cpassword");
    const profilePicimg = form.get("u_signup_profile"); // profile picture file here

    if (!isTermsAccepted) {
      setError("You must accept the terms and conditions to register.");
      setIsLoading((prev) => ({ ...prev, register: false }));
      return;
    }

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !profilePicimg
    ) {
      setError("All fields are required");
      setIsLoading((prev) => ({ ...prev, register: false }));
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      setError("Please enter a valid email ");
      setIsLoading((prev) => ({ ...prev, register: false }));
      return;
    }

    const validatePhoneNumber = [
      {
        regex: /^01\d{9}$/, // Must start with 01 and have 11 digits
        message: "Phone Number must contain 11 numbers and must start with 01",
      },
    ];
    for (const validation of validatePhoneNumber) {
      if (!validation.regex.test(phone)) {
        setError(validation.message);
        setIsLoading((prev) => ({ ...prev, register: false }));
        return;
      }
    }

    // Password validations
    const passwordValidations = [
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter",
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter",
      },
      {
        regex: /.{6,}/,
        message: "Password must be at least 6 characters long",
      },
    ];

    for (const validation of passwordValidations) {
      if (!validation.regex.test(password)) {
        setError(validation.message);
        setIsLoading((prev) => ({ ...prev, register: false }));
        return;
      }
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading((prev) => ({ ...prev, register: false }));
      return;
    }

    try {
      // 1. Upload profile picture to Cloudinary inside handleRegister

      if (profilePicimg && typeof profilePicimg === "object") {
        const imageFormData = new FormData();
        imageFormData.append("file", profilePicimg);
        imageFormData.append("upload_preset", "uploadpreset");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dhqmilgfz/upload", // Cloudinary API URL
          imageFormData
        );
        profilePic = uploadResponse.data.secure_url;
        // Get the image URL after successful upload
      }

      await createUser(name, email, password, "founder", phone, profilePic);
      setRegistrationSuccessful(true);
      setPhoneNumber(phone);
      setShowOTPModal(true);
    } finally {
      setIsLoading((prev) => ({ ...prev, register: false }));
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleOTPSuccess = () => {
    toast.success("Phone number verified successfully! You can login Now");
    setShowOTPModal(false);
    navigate("/founderlogin");
  };
  return (
    <div className={`signcontainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="sign-in-form sm:mr-4 xs:mr-4 xxs:mr-4 "
          >
            <h2 className="lg:text-4xl text-black mb-2 md:text-2xl sm:text-lg xxs:text-lg xs:text-lg">
              {t("founder_login")}
            </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder={t("email_address")}
                name="u_signin_email_or_phone"
                required
              />
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword.login ? "text" : "password"}
                placeholder={t("password")}
                name="u_signin_pass"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("login")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword.login ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
              {isLoading.login && <Loader />}
            </div>
            <input
              type="submit"
              value={isLoading.login ? "Logging in..." : "Login"}
              className="login-btn solid lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80"
              disabled={isLoading.login}
            />
          </form>

          {/* Register Form */}
          <form
            onSubmit={handleRegister}
            className="sign-up-form xs:ml-4 sm:ml-4 xxs:ml-4"
          >
            <h2 className="lg:text-4xl text-black mb -2 md:text-2xl sm:text-lg xxs:text-lg xs:text-lg">
              {t("sign_up")}
            </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                accept="image/*"
                id="profile-pic-upload"
                name="u_signup_profile"
                className="hidden"
                onChange={handleProfilePicChange} // Handle image preview
              />
              <label htmlFor="profile-pic-upload" className="cursor-pointer">
                <img
                  src={
                    profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  } // Display profilePic state for preview
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {t("choose_file")}
                </p>
              </label>
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder={t("full_name")}
                name="u_signup_name"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder={t("email_address")}
                name="u_signup_email"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                placeholder={t("phone_number")}
                name="u_signup_number"
                required
              />
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword.register ? "text" : "password"}
                placeholder={t("password")}
                name="u_signup_password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("register")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword.register ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder={t("confirm_password")}
                name="u_signup_cpassword"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword.confirm ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
              {isLoading.register && <Loader />}
            </div>
            <div className="terms-container flex flex-row gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={() => setIsTermsAccepted((prev) => !prev)}
              />
              <label htmlFor="terms" className="text-sm font-light">
                <Link
                  to="/founderterms"
                  className="text-blue-500 hover:underline"
                >
                  {t("terms_conditions")}
                </Link>
              </label>
            </div>

            <input
              type="submit"
              value={isLoading.register ? "Signing up..." : "Sign up"}
              className={`login-btn lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 solid ${
                isLoading.register || !isTermsAccepted ? "btn-disabled" : ""
              }`}
              disabled={isLoading.register || !isTermsAccepted}
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel sm:mr-6 xs:mr-6 xxs:mr-6">
          <div className="content">
            <h3>{t("new_here")}</h3> {/* Use translation */}
            <p>{t("access_exclusive_features")}</p>
            <button
              className="login-btn2 lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              {t("sign_up")}
            </button>
          </div>

          <img src="img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel sm:ml-6 xs:ml-6 xxs:ml-6">
          <div className="content">
            <h3>{t("one_of_us")}</h3> {/* Use translation */}
            <p>{t("log_in_to_access")}</p>
            <button
              className="login-btn2 lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              {t("sign_in")}
            </button>
            {registrationSuccessful && ( // Show button if registration was successful
              <button
                type="button"
                onClick={() => setShowOTPModal(true)}
                className="otp-btn mt-4"
              >
                {t("open_otp_modal")}
              </button>
            )}
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
      {showOTPModal && (
        <OTPModal
          phonenumber={phonenumber} // Use the phonenumber state
          onSuccess={handleOTPSuccess}
          onClose={() => setShowOTPModal(false)}
        />
      )}
    </div>
  );
};

export default FounderLogin;
