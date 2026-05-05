import { useEffect, useState } from "react";
import api from "../api/client";
import styles from "./Profile.module.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/api/users/me");
      setProfile(data);
    };
    load();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

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
