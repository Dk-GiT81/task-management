import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Home from "./pages/Home";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";


function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <h1>
        {title}
      </h1>

      <p>
        This page will be built later.
      </p>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            Public Pages
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            Protected Application Pages
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Tasks />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PlaceholderPage title="Team" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PlaceholderPage title="Analytics" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;