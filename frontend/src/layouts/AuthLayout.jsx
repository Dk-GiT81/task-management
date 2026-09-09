function AuthLayout({ children }) {
  return (
    <div className="auth-layout">

      <div className="auth-background-shape shape-one" />
      <div className="auth-background-shape shape-two" />
      <div className="auth-background-shape shape-three" />

      <div className="auth-brand">
        <div className="auth-brand-icon">
          ✓
        </div>

        <div>
          <h2>TaskFlow</h2>
          <p>Manage · Organize · Achieve</p>
        </div>
      </div>

      {children}

    </div>
  );
}

export default AuthLayout;