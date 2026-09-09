import { useState } from "react";
import GlassCard from "../components/GlassCard";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your application preferences.</p>
        </div>
      </div>

      <div className="settings-container">
        <GlassCard className="settings-card">
          <h2>Appearance</h2>
          <p className="settings-description">
            Customize how TaskFlow looks.
          </p>

          <div className="settings-row">
            <div>
              <strong>Dark Mode</strong>
              <span>Use a darker appearance for the application.</span>
            </div>

            <button
              className={`settings-toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              <span />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="settings-card">
          <h2>Notifications</h2>
          <p className="settings-description">
            Manage your notification preferences.
          </p>

          <div className="settings-row">
            <div>
              <strong>Task Notifications</strong>
              <span>
                Receive notifications about your tasks.
              </span>
            </div>

            <button
              className={`settings-toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
              aria-label="Toggle notifications"
            >
              <span />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="settings-card">
          <h2>Security</h2>
          <p className="settings-description">
            Manage your account security.
          </p>

          <div className="settings-row">
            <div>
              <strong>Password</strong>
              <span>
                Change your account password.
              </span>
            </div>

            <button
              className="secondary-button"
              disabled
            >
              Change Password
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Settings;