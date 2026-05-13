import { ArrowUpRight, BarChart3, Filter, Sparkles, Target, Users } from "lucide-react";
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

const intelligencePillars = [
  {
    title: "Behavior",
    text: "Identify how consumers may think, feel and behave next."
  },
  {
    title: "Timing",
    text: "Build the right products at the right moment."
  },
  {
    title: "Confidence",
    text: "Innovate with collective signals instead of noise."
  },
  {
    title: "Opportunity",
    text: "Spot emerging openings before competitors react."
  },
  {
    title: "Growth",
    text: "Turn trend signals into stronger sales and long-term loyalty."
  },
  {
    title: "Clarity",
    text: "Transform prediction markets into actionable intelligence."
  }
];

const proofPoints = [
  { label: "No betting", value: "Points" },
  { label: "Format", value: "Yes / No" },
  { label: "Source", value: "Markets" }
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
      setPredictions(data);
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

  const categoryCount = useMemo(
    () => new Set(predictions.map((prediction) => prediction.category)).size,
    [predictions]
  );

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Prediction intelligence</span>
          <h1>Anticipate the future with clarity and confidence.</h1>
          <p>
            MakoTrends is a points-based prediction game that turns yes-or-no
            markets into signals about technology, culture, consumer behavior
            and the next wave of demand.
          </p>
          <div className={styles.heroActions}>
            <a href="#markets">
              Explore signals <ArrowUpRight size={18} />
            </a>
            <a href="/rules">View rules</a>
          </div>
        </div>

        <aside className={styles.signalPanel} aria-label="MakoTrends signal overview">
          <div className={styles.panelHeader}>
            <span>Signal brief</span>
            <Sparkles size={17} />
          </div>
          <strong>What does the crowd expect before a trend becomes consensus?</strong>
          <p>Track votes, percentages and resolutions to turn curiosity into strategic foresight.</p>
          <div className={styles.panelStats}>
            <span>
              <b>{openCount}</b>
              open
            </span>
            <span>
              <b>{predictions.length}</b>
              monitored
            </span>
            <span>
              <b>{categoryCount}</b>
              topics
            </span>
          </div>
        </aside>
      </div>

      <section className={styles.intelligence}>
        <div>
          <span className={styles.eyebrow}>Why it matters</span>
          <h2>Prediction data for smarter decisions.</h2>
          <p>
            Each market is a focused question. Each vote is a small signal.
            Together, they help reveal where the market may be moving next.
          </p>
        </div>
        <div className={styles.pillars}>
          {intelligencePillars.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method}>
        <article>
          <Target size={22} />
          <h2>No betting. Just accuracy.</h2>
          <p>
            Users vote on objective yes-or-no questions and earn points when
            markets resolve correctly.
          </p>
        </article>
        <article>
          <BarChart3 size={22} />
          <h2>Collective signals in real time.</h2>
          <p>
            Each vote helps reveal how the community reads trends before they
            become obvious.
          </p>
        </article>
        <article>
          <Users size={22} />
          <h2>A living read on the market.</h2>
          <p>
            See how people interpret events, launches, risks and cultural shifts
            as they unfold.
          </p>
        </article>
      </section>

      <section className={styles.marketSection} id="markets">
        <div className={styles.marketIntro}>
          <div>
            <span className={styles.eyebrow}>Live markets</span>
            <h2>Signals to watch now.</h2>
          </div>
          <div className={styles.proofPoints}>
            {proofPoints.map((point) => (
              <span key={point.label}>
                <b>{point.value}</b>
                {point.label}
              </span>
            ))}
          </div>
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
          Fetching the latest prediction signals and vote distribution.
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
