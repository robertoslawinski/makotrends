import { CheckCircle2, FileCheck2, Link as LinkIcon, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import VoteProgress from "../components/VoteProgress";
import { useAuth } from "../context/AuthContext";
import styles from "./PredictionDetails.module.css";

export default function PredictionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPrediction = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/predictions/${id}`);
      setPrediction(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load prediction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrediction();
  }, [id]);

  const vote = async (selectedOption) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setError("");
    setMessage("");
    try {
      await api.post(`/api/predictions/${id}/vote`, { selectedOption });
      setMessage("Vote locked in.");
      await loadPrediction();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit vote");
    }
  };

  if (loading) return <p>Loading prediction...</p>;
  if (!prediction) return <p className="error">{error}</p>;

  const alreadyVoted = Boolean(prediction.viewerVote);
  const votingOpen = prediction.status === "open" && new Date(prediction.deadline) > new Date();

  return (
    <section className={styles.page}>
      <article className={styles.market}>
        <div className={styles.meta}>
          <span>{prediction.category}</span>
          <span>{prediction.status}</span>
        </div>
        <h1>{prediction.title}</h1>
        <p>{prediction.description}</p>
        <VoteProgress percentages={prediction.votePercentages} counts={prediction.voteCounts} />
        {prediction.status === "resolved" && (
          <div className={styles.result}>Resolved: {prediction.result}</div>
        )}
        <section className={styles.resolution}>
          <div>
            <FileCheck2 size={22} />
            <h2>How this resolves</h2>
          </div>
          <p>{prediction.resolutionCriteria || "Resolution criteria will be added by the market admin."}</p>
          <dl>
            <div>
              <dt>Source</dt>
              <dd>
                <LinkIcon size={16} />
                {prediction.resolutionSource || "Official or credible public sources"}
              </dd>
            </div>
            <div>
              <dt>Resolution date</dt>
              <dd>
                {prediction.resolutionDate
                  ? new Date(prediction.resolutionDate).toLocaleDateString()
                  : "After deadline"}
              </dd>
            </div>
            <div>
              <dt>Points</dt>
              <dd>{prediction.pointsValue || 10} points for a correct vote</dd>
            </div>
          </dl>
        </section>
      </article>

      <aside className={styles.panel}>
        <h2>Your prediction</h2>
        {alreadyVoted ? (
          <p className={styles.voted}>You voted {prediction.viewerVote.selectedOption}.</p>
        ) : (
          <p>Pick a side before the deadline.</p>
        )}
        <div className={styles.voteButtons}>
          <button disabled={!votingOpen || alreadyVoted} onClick={() => vote("yes")}>
            <CheckCircle2 size={20} /> Yes
          </button>
          <button disabled={!votingOpen || alreadyVoted} onClick={() => vote("no")}>
            <XCircle size={20} /> No
          </button>
        </div>
        <dl>
          <div>
            <dt>Deadline</dt>
            <dd>{new Date(prediction.deadline).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Total votes</dt>
            <dd>{prediction.totalVotes}</dd>
          </div>
          <div>
            <dt>Reward</dt>
            <dd>{prediction.pointsValue || 10} pts</dd>
          </div>
        </dl>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </aside>
    </section>
  );
}
