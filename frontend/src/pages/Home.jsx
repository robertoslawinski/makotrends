import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import PredictionCard from "../components/PredictionCard";
import styles from "./Home.module.css";

const statuses = ["all", "open", "closed", "resolved"];

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPredictions = async () => {
      setLoading(true);
      setError("");

      try {
        const query = status === "all" ? "" : `?status=${status}`;
        const { data } = await api.get(`/api/predictions${query}`);
        setPredictions(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load predictions");
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, [status]);

  const openCount = useMemo(
    () => predictions.filter((prediction) => prediction.status === "open").length,
    [predictions]
  );

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Prediction markets</span>
          <h1>See tomorrow before the market does.</h1>
          <p>
            MakoTrends turns emerging signals into sharp yes/no markets for people who
            want to read cultural, AI and technology shifts before they become obvious.
          </p>
          <div className={styles.heroActions}>
            <a href="#markets">Explore signals</a>
            <a href="/rules">How scoring works</a>
          </div>
        </div>
        <div className={styles.heroMetrics} aria-label="Market overview">
          <div className={styles.stat}>
            <strong>{openCount}</strong>
            <span>Open markets</span>
          </div>
        </div>
      </div>

      <div className={styles.filters} id="markets">
        <Filter size={18} />
        {statuses.map((item) => (
          <button
            key={item}
            className={status === item ? styles.active : ""}
            onClick={() => setStatus(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <p>Loading predictions...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && predictions.length === 0 && <p>No predictions found.</p>}
      <div className={styles.grid}>
        {predictions.map((prediction) => (
          <PredictionCard key={prediction._id} prediction={prediction} />
        ))}
      </div>
    </section>
  );
}
