import { useContext, useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false,
  });
  const { createUser, adminsignIn } = useAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({ login: false, register: false });
  const navigate = useNavigate();
  // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, login: true }));
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("u_signin_email");
    const password = form.get("u_signin_pass");

    try {
      await adminsignIn(email, password);

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
    const password = form.get("u_signup_password");
    const confirmPassword = form.get("u_signup_cpassword");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setIsLoading((prev) => ({ ...prev, register: false }));
      return;
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
      await createUser(name, email, password, "admin"); // Use the createUser function from context
      toast.success("Registration successful");
      navigate("/admindashboard");
    } catch (err) {
      toast.error(err.message || "Registration error");
      setError(err.message || "Registration error");
    } finally {
      setIsLoading((prev) => ({ ...prev, register: false }));
    }
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
              Admin Sign in
            </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email Address"
                name="u_signin_email"
                required
              />
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword.login ? "text" : "password"}
                placeholder="Password"
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
            <h2 className="lg:text-4xl text-black mb-2 md:text-2xl sm:text-lg xxs:text-lg xs:text-lg">
              Admin Sign up
            </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Full Name"
                name="u_signup_name"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email Address"
                name="u_signup_email"
                required
              />
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword.register ? "text" : "password"}
                placeholder="Password"
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
                placeholder="Confirm Password"
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
            <input
              type="submit"
              value={isLoading.register ? "Signing up..." : "Sign up"}
              className="login-btn lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 solid"
              disabled={isLoading.register}
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel sm:mr-6 xs:mr-6 xxs:mr-6">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up to access exclusive features!</p>
            <button
              className="login-btn2 lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel sm:ml-6 xs:ml-6 xxs:ml-6">
          <div className="content">
            <h3>One of us?</h3>
            <p>Log in to access your account.</p>
            <button
              className="login-btn2 lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80 transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Log in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
