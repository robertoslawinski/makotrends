import { Medal } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client";
import styles from "./Ranking.module.css";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/api/ranking");
      setRanking(data);
    };
    load();
  }, []);

  return (
    <section className={styles.page}>
      <h1>Ranking</h1>
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
