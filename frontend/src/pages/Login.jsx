import { useState } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        formData.email,
        formData.password
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <AuthLayout>

      <div className="auth-container">

        <div className="auth-card glass-card">

          <div className="auth-heading">

            <p className="eyebrow">
              WELCOME BACK
            </p>

            <h1>
              Welcome back
            </h1>

            <p>
              Sign in to continue to your workspace.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="auth-form-group">

              <label htmlFor="email">
                Email
              </label>

              <div className="auth-input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Password */}
            <div className="auth-form-group">

              <div className="password-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>


              <div className="auth-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* Remember me */}
            <label className="remember-me">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>


            {/* Submit */}
            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* Register */}
          <div className="auth-footer">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create one
            </Link>

          </div>

        </div>

      </div>

    </AuthLayout>
  );
}

export default Login;