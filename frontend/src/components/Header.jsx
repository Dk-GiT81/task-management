import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Header() {
  const { user } = useAuth();

  const userInitial =
    user?.name?.charAt(0).toUpperCase() || "U";


  return (
    <header className="app-header">

      {/* Search */}
      <div className="search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search tasks, projects..."
        />

        <span className="search-shortcut">
          Ctrl + K
        </span>

      </div>


      {/* Header Actions */}
      <div className="header-actions">

        {/* Notifications */}
        <button className="notification-button">

          <Bell size={21} />

          <span className="notification-dot">
            1
          </span>

        </button>


        {/* Logged-in User */}
        <button className="header-user">

          <div className="header-avatar">
            {userInitial}
          </div>

          <div className="header-user-info">

            <strong>
              {user?.name || "User"}
            </strong>

            <span>
              {user?.role === "admin"
                ? "Admin"
                : "User"}
            </span>

          </div>

          <ChevronDown size={17} />

        </button>

      </div>

    </header>
  );
}


export default Header;