import GlassCard from "../components/GlassCard";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const userInitial =
    user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your account information.</p>
        </div>
      </div>

      <GlassCard className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userInitial}
          </div>

          <div className="profile-header-info">
            <h2>{user?.name || "User"}</h2>
            <p>
              {user?.role === "admin"
                ? "Administrator"
                : "User"}
            </p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail">
            <span>Name</span>
            <strong>{user?.name || "-"}</strong>
          </div>

          <div className="profile-detail">
            <span>Email</span>
            <strong>{user?.email || "-"}</strong>
          </div>

          <div className="profile-detail">
            <span>Role</span>
            <strong>
              {user?.role === "admin"
                ? "Administrator"
                : "User"}
            </strong>
          </div>
        </div>

        <div className="profile-actions">
          <button className="primary-button" disabled>
            Edit Profile
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

export default Profile;