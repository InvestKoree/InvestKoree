import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { adminsignIn } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const loginInput = form.get("u_signin_email_or_phone");
    const password = form.get("u_signin_pass");

    if (!loginInput || !password) {
      setError("Email/Phone and Password are required");
      setIsLoading(false);
      return;
    }

    const isPhoneNumber = /^01\d{9}$/.test(loginInput);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);

    if (!isPhoneNumber && !isEmail) {
      setError(
        "Please enter a valid email or phone number containing 11 numbers and starting with 01"
      );
      setIsLoading(false);
      return;
    }

    try {
      if (isPhoneNumber) {
        await adminsignIn(null, password, loginInput);
      } else {
        await adminsignIn(loginInput, password, null);
      }
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.message || "Login error");
      setError(err.message || "Login error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signcontainer">
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={handleLogin}
            className="sign-in-form sm:mr-4 xs:mr-4 xxs:mr-4"
          >
            <h2 className="lg:text-4xl text-black mb-2 md:text-2xl sm:text-lg xxs:text-lg xs:text-lg">
              Admin Sign in
            </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="Email Address or Phone Number"
                name="u_signin_email_or_phone"
                required
              />
            </div>
            <div className="input-field relative">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="u_signin_pass"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
              {isLoading && <Loader />}
            </div>
            <input
              type="submit"
              value={isLoading ? "Logging in..." : "Login"}
              className="login-btn solid lg:w-96 sm:w-36 xxs:w-24 xs:w-32 md:lg:w-80"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
