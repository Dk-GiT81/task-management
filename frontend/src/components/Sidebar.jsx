import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "▦",
    },
    {
      to: "/tasks",
      label: "My Tasks",
      icon: "☑",
    },
    {
      to: "/projects",
      label: "Projects",
      icon: "▣",
    },
    {
      to: "/team",
      label: "Team",
      icon: "♧",
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: "▥",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: "♙",
    },
  ];

  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Logo / Sidebar Toggle */}
      <div className="sidebar-logo-wrapper">
        <button
          type="button"
          className="sidebar-logo-button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          <img
            src="/taskflow_icon.png"
            alt="TaskFlow"
            className="sidebar-logo-icon"
          />
        </button>

        <div className="sidebar-logo-text">
          <strong>TaskFlow</strong>
          <span>Manage · Organize · Achieve</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="sidebar-link"
            title={collapsed ? item.label : undefined}
            aria-label={item.label}
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink
          to="/settings"
          className="sidebar-link"
          title={collapsed ? "Settings" : undefined}
          aria-label="Settings"
        >
          <span className="sidebar-icon">
            ⚙
          </span>

          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          aria-label="Logout"
        >
          <span className="sidebar-icon">
            →
          </span>

          <span>Logout</span>
        </button>

        <div className="sidebar-version">
          Version 1.0.0
          <br />
          © 2026 TaskFlow
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;