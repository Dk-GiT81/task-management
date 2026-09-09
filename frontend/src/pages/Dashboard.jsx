import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock3,
  FolderKanban,
} from "lucide-react";

import GlassCard from "../components/GlassCard";
import { getDashboardStats } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total_tasks: 0,
    todo_tasks: 0,
    in_progress_tasks: 0,
    completed_tasks: 0,
    total_projects: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>
            Good morning, {user?.name || "User"} 👋
          </h1>

          <p>
            Here's what's happening with your tasks today.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats-grid">

        {/* Total Tasks */}
        <GlassCard className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Circle size={22} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{stats.total_tasks}</strong>
          </div>
        </GlassCard>

        {/* To Do */}
        <GlassCard className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Circle size={22} />
          </div>

          <div>
            <span>To Do</span>
            <strong>{stats.todo_tasks}</strong>
          </div>
        </GlassCard>

        {/* In Progress */}
        <GlassCard className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.in_progress_tasks}</strong>
          </div>
        </GlassCard>

        {/* Completed */}
        <GlassCard className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed_tasks}</strong>
          </div>
        </GlassCard>

        {/* Projects */}
        <GlassCard className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <FolderKanban size={22} />
          </div>

          <div>
            <span>Projects</span>
            <strong>{stats.total_projects}</strong>
          </div>
        </GlassCard>

      </div>

      {/* Progress */}
      <GlassCard className="dashboard-progress-card">
        <div className="dashboard-section-header">
          <div>
            <h2>Task Progress</h2>
            <p>Your overall task completion.</p>
          </div>

          <strong>
            {stats.total_tasks > 0
              ? Math.round(
                  (stats.completed_tasks / stats.total_tasks) * 100
                )
              : 0}
            %
          </strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${
                stats.total_tasks > 0
                  ? (stats.completed_tasks / stats.total_tasks) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}

export default Dashboard;