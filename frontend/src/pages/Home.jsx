import { ArrowUpRight, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import PredictionCard from "../components/PredictionCard";
import StateMessage from "../components/StateMessage";
import styles from "./Home.module.css";

const statuses = ["all", "open", "closed", "resolved"];
const statusLabels = {
  all: "All",
  open: "Open",
  closed: "Closed",
  resolved: "Resolved"
};

const proofPoints = [
  "Points, not betting",
  "Yes/no football signals",
  "Brazilian football intelligence"
];

const trendSignals = [
  { name: "Brasileirao title race", competition: "Serie A 2026" },
  { name: "Libertadores final", competition: "CONMEBOL 2026" },
  { name: "Relegation battle", competition: "Serie A 2026" },
  { name: "Table movement", competition: "Serie A 2026" }
];

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPredictions = async () => {
    setLoading(true);
    setError("");

    try {
      const query = status === "all" ? "" : `?status=${status}`;
      const { data } = await api.get(`/api/predictions${query}`);
      setPredictions(data.filter((prediction) => prediction.title.includes("2026")));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not reach the market feed. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, [status]);

  const openCount = useMemo(
    () => predictions.filter((prediction) => prediction.status === "open").length,
    [predictions]
  );

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>FuteTrends intelligence</span>
          <h1>Predict Brazilian football before the table reacts.</h1>
          <p>
            Brasileirao 2026 and Libertadores signals transformed into live,
            points-based forecasts for serious football fans.
          </p>
          <div className={styles.heroActions}>
            <a href="#markets">
              Explore Signals <ArrowUpRight size={18} />
            </a>
            <a href="#markets">View Live Markets</a>
          </div>
        </div>

        <aside className={styles.trendBoard} aria-label="Trending signals">
          <div className={styles.boardHeader}>
            <span className={styles.liveDot} />
            <span>Trending now</span>
            <strong>{openCount} live markets</strong>
          </div>
          <div className={styles.signalList}>
            {trendSignals.map((signal) => (
              <div className={styles.signalCard} key={signal.name}>
                <span>{signal.name}</span>
                <strong>{signal.competition}</strong>
              </div>
            ))}
          </div>
        </aside>
      </header>

      <div className={styles.proofLine}>
        {proofPoints.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className={styles.marketSection} id="markets">
        <div className={styles.marketIntro}>
          <span className={styles.eyebrow}>Live markets</span>
          <h2>Brazilian football signals to watch now.</h2>
        </div>

        <div className={styles.filters}>
          <Filter size={18} />
          {statuses.map((item) => (
            <button
              key={item}
              className={status === item ? styles.active : ""}
              onClick={() => setStatus(item)}
            >
              {statusLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <StateMessage type="loading" title="Loading live markets">
          Fetching the latest football signals and vote distribution.
        </StateMessage>
      )}
      {!loading && error && (
        <StateMessage
          type="error"
          title="Markets are temporarily unavailable"
          actionLabel="Try again"
          onAction={loadPredictions}
        >
          {error}
        </StateMessage>
      )}
      {!loading && !error && predictions.length === 0 && (
        <StateMessage type="empty" title="No markets match this filter">
          Try another status filter or come back when new signals are published.
        </StateMessage>
      )}
      <div className={styles.grid}>
        {predictions.map((prediction) => (
          <PredictionCard key={prediction._id} prediction={prediction} />
        ))}
      </div>
    </section>
  );
}
