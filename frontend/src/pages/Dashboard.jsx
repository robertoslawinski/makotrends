import { PlusCircle, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/api/users/me");
      setProfile(data);
    };
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
