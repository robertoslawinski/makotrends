import { Activity, LogOut, Shield, Trophy, User } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.brand}>
          <Activity size={24} />
          <span>MakoTrends</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/">Markets</NavLink>
          <NavLink to="/ranking">
            <Trophy size={17} /> Ranking
          </NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          {user?.role === "admin" && (
            <NavLink to="/admin">
              <Shield size={17} /> Admin
            </NavLink>
          )}
        </nav>
        <div className={styles.actions}>
          {user ? (
            <>
              <NavLink to="/profile" className={styles.profileLink}>
                <User size={17} />
                {user.name}
              </NavLink>
              <button onClick={handleLogout} className={styles.iconButton} title="Log out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.linkButton}>
                Login
              </NavLink>
              <NavLink to="/signup" className={styles.primaryButton}>
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
