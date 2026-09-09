import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      await register(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/login");
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
              TASK MANAGEMENT
            </p>

            <h1>
              Create your account
            </h1>

            <p>
              Start organizing your work today.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="auth-form-group">

              <label htmlFor="name">
                Name
              </label>

              <div className="auth-input-wrapper">

                <User size={18} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


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

              <label htmlFor="password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>


          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* Login */}
          <div className="auth-footer">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>

        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;