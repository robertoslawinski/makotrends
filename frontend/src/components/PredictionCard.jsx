import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";
import styles from "./PredictionCard.module.css";
import VoteProgress from "./VoteProgress";

export default function PredictionCard({ prediction }) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span>{prediction.category}</span>
        <span className={styles[prediction.status]}>{prediction.status}</span>
      </div>
      <h2>{prediction.title}</h2>
      <p>{prediction.description}</p>
      <VoteProgress percentages={prediction.votePercentages} counts={prediction.voteCounts} />
      <div className={styles.footer}>
        <span>
          <CalendarDays size={16} />
          {new Date(prediction.deadline).toLocaleDateString()}
        </span>
        <Link
          to={`/predictions/${prediction._id}`}
          onClick={() =>
            trackEvent("market_opened", {
              market_id: prediction._id,
              market_status: prediction.status,
              market_category: prediction.category
            })
          }
        >
          View market
        </Link>
      </div>
    </article>
  );
}
