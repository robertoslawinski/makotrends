import { useEffect, useState } from "react";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import styles from "./Profile.module.css";

export default function Profile() {
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
          "Your profile could not be loaded right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <section className={styles.page}>
        <StateMessage type="loading" title="Loading profile">
          Pulling your points, accuracy and prediction history.
        </StateMessage>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className={styles.page}>
        <StateMessage type="error" title="Profile unavailable" actionLabel="Try again" onAction={load}>
          {error || "We could not find profile data for this account."}
        </StateMessage>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>{profile.user.name}</h1>
        <p>{profile.user.email}</p>
      </div>
      <div className={styles.stats}>
        <span>{profile.user.points} points</span>
        <span>{profile.accuracyRate}% accuracy</span>
        <span>{profile.user.correctPredictions}/{profile.user.totalPredictions} correct</span>
      </div>
      <h2>Prediction history</h2>
      <div className={styles.history}>
        {profile.history.length === 0 && (
          <StateMessage type="empty" title="No prediction history yet">
            Vote in an open market to start building your track record.
          </StateMessage>
        )}
        {profile.history.map((vote) => (
          <article key={vote._id}>
            <strong>{vote.predictionId?.title || "Deleted prediction"}</strong>
            <span>Voted {vote.selectedOption}</span>
            <span>{vote.isCorrect === null ? "Pending" : vote.isCorrect ? "Correct" : "Incorrect"}</span>
            <span>{vote.pointsEarned} pts</span>
          </article>
        ))}
      </div>
    </section>
  );
}
