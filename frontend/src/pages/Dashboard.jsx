import { PlusCircle, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/api/users/me");
      setProfile(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Your dashboard could not be loaded right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user.name}.</p>
        </div>
        {user.role === "admin" && (
          <Link to="/admin/create">
            <PlusCircle size={18} /> Create prediction
          </Link>
        )}
      </div>
      {loading && (
        <StateMessage type="loading" title="Loading your dashboard">
          Refreshing your score, accuracy and resolved vote totals.
        </StateMessage>
      )}
      {!loading && error && (
        <StateMessage type="error" title="Dashboard unavailable" actionLabel="Try again" onAction={load}>
          {error}
        </StateMessage>
      )}
      <div className={styles.stats}>
        <article>
          <Trophy size={22} />
          <strong>{profile?.user.points ?? user.points}</strong>
          <span>Total points</span>
        </article>
        <article>
          <Target size={22} />
          <strong>{profile?.accuracyRate ?? 0}%</strong>
          <span>Accuracy</span>
        </article>
        <article>
          <Target size={22} />
          <strong>{profile?.user.totalPredictions ?? user.totalPredictions}</strong>
          <span>Resolved votes</span>
        </article>
      </div>
    </section>
  );
}
