import { Medal } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import styles from "./Ranking.module.css";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/api/ranking");
      setRanking(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "The leaderboard could not be loaded right now."
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
      <h1>Ranking</h1>
      {loading && (
        <StateMessage type="loading" title="Loading leaderboard">
          Ranking users by total points and prediction accuracy.
        </StateMessage>
      )}
      {!loading && error && (
        <StateMessage type="error" title="Ranking is unavailable" actionLabel="Try again" onAction={load}>
          {error}
        </StateMessage>
      )}
      {!loading && !error && ranking.length === 0 && (
        <StateMessage type="empty" title="No ranked users yet">
          Rankings will appear after users make and resolve predictions.
        </StateMessage>
      )}
      <div className={styles.table}>
        {ranking.map((user) => (
          <div key={user.id} className={styles.row}>
            <span className={styles.rank}>
              <Medal size={18} /> #{user.rank}
            </span>
            <strong>{user.name}</strong>
            <span>{user.points} pts</span>
            <span>{user.accuracyRate}% accuracy</span>
          </div>
        ))}
      </div>
    </section>
  );
}
