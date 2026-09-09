import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  /*
   * Restore session when application starts
   */
  useEffect(() => {
    async function restoreSession() {
      const storedToken =
        localStorage.getItem("access_token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Session expired");
        }

        const userData = await response.json();

        setUser(userData);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("access_token");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);


  /*
   * Register
   */
  async function register(name, email, password) {
    const response = await fetch(
      "http://localhost:8000/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Registration failed"
      );
    }

    return data;
  }


  /*
   * Login
   */
  async function login(email, password) {
    const response = await fetch(
      "http://localhost:8000/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Login failed"
      );
    }

    localStorage.setItem(
      "access_token",
      data.access_token
    );

    setToken(data.access_token);

    /*
     * Get logged-in user's information
     */
    const userResponse = await fetch(
      "http://localhost:8000/auth/me",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(
        "Unable to retrieve user information"
      );
    }

    const userData = await userResponse.json();

    setUser(userData);

    return data;
  }


  /*
   * Logout
   */
  function logout() {
    localStorage.removeItem("access_token");

    setToken(null);
    setUser(null);
  }


  const value = {
    token,
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: Boolean(token),
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


/*
 * Custom hook
 */
// The context hook must be exported from this module for consumers to access it.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}