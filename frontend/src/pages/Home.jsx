import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-logo">
          <div className="home-logo-icon">✓</div>
          <span>TaskFlow</span>
        </div>

        <div className="home-nav-actions">
          <Link to="/login" className="home-login-link">
            Login
          </Link>

          <Link to="/register" className="home-register-button">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-badge">
            ✨ Simple. Organized. Productive.
          </div>

          <h1>
            Manage your tasks.
            <br />
            <span>Get things done.</span>
          </h1>

          <p>
            TaskFlow helps you organize projects, manage tasks,
            track progress, and stay focused — all in one place.
          </p>

          <div className="home-hero-actions">
            <Link to="/register" className="primary-home-button">
              Get Started
              <span>→</span>
            </Link>

            <Link to="/login" className="secondary-home-button">
              Login
            </Link>
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="home-preview-wrapper">
          <div className="home-preview">

            <div className="preview-header">
              <div>
                <span className="preview-small-text">
                  Dashboard
                </span>
                <h3>Welcome back 👋</h3>
              </div>

              <div className="preview-avatar">
                U
              </div>
            </div>

            <div className="preview-stats">

              <div className="preview-stat-card">
                <span>Total Tasks</span>
                <strong>24</strong>
              </div>

              <div className="preview-stat-card">
                <span>In Progress</span>
                <strong>8</strong>
              </div>

              <div className="preview-stat-card">
                <span>Completed</span>
                <strong>12</strong>
              </div>

            </div>

            <div className="preview-progress">
              <div className="preview-progress-header">
                <span>Project Progress</span>
                <strong>68%</strong>
              </div>

              <div className="preview-progress-bar">
                <div className="preview-progress-fill"></div>
              </div>
            </div>

            <div className="preview-tasks">

              <div className="preview-task">
                <div className="preview-check completed">
                  ✓
                </div>

                <div>
                  <strong>Design dashboard</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="preview-task">
                <div className="preview-check">
                </div>

                <div>
                  <strong>Build authentication</strong>
                  <span>In Progress</span>
                </div>
              </div>

              <div className="preview-task">
                <div className="preview-check">
                </div>

                <div>
                  <strong>Write API tests</strong>
                  <span>To Do</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Features */}
      <section className="home-features">

        <div className="home-section-heading">
          <span>POWERFUL FEATURES</span>
          <h2>Everything you need to stay organized.</h2>
          <p>
            Keep your projects and tasks under control with a simple
            and intuitive workspace.
          </p>
        </div>

        <div className="home-feature-grid">

          <div className="home-feature-card">
            <div className="home-feature-icon">✓</div>
            <h3>Task Management</h3>
            <p>
              Create, update, delete, and organize your tasks
              with ease.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">▦</div>
            <h3>Project Organization</h3>
            <p>
              Keep related tasks together and manage your
              projects efficiently.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">↗</div>
            <h3>Track Progress</h3>
            <p>
              See what is completed, in progress, and still
              waiting to be done.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">⌘</div>
            <h3>Kanban Board</h3>
            <p>
              Move tasks between stages using an intuitive
              drag-and-drop workflow.
            </p>
          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="home-cta">

        <div>
          <h2>Ready to get organized?</h2>
          <p>
            Start managing your tasks and projects today.
          </p>
        </div>

        <Link to="/register" className="primary-home-button">
          Create Account
          <span>→</span>
        </Link>

      </section>

      {/* Footer */}
      <footer className="home-footer">
        <span>© 2026 TaskFlow</span>
        <span>Task Management Application</span>
      </footer>

    </div>
  );
}

export default Home;