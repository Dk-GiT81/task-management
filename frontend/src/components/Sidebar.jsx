import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  
  const { logout } = useAuth();

  const navigate = useNavigate();


  function handleLogout() {
   logout();

   navigate("/login");
  }

  const mainNavigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Team",
      path: "/team",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];


  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          <CheckSquare size={23} />
        </div>

        <div>
          <h2>TaskFlow</h2>

          <p>
            Manage · Organize · Achieve
          </p>
        </div>

      </div>


      {/* Main Navigation */}
      <nav className="sidebar-navigation">

        {mainNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={20} />

              <span>
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>


      {/* Bottom Navigation */}
      <div className="sidebar-bottom">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <Settings size={20} />

          <span>
            Settings
          </span>
        </NavLink>


        <button
          className="sidebar-link logout-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />

          <span>
            Logout
          </span>
        </button>

      </div>


      {/* Version */}
      <div className="sidebar-footer">
        <p>Version 1.0.0</p>
        <p>© 2026 TaskFlow</p>
      </div>

    </aside>
  );
}


export default Sidebar;