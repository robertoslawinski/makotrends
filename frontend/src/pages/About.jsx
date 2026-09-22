import { Activity, ShieldCheck, TrendingUp } from "lucide-react";
import styles from "./Info.module.css";

export default function About() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <span>About FuteTrends</span>
        <h1>A prediction game for Brazilian football signals.</h1>
        <p>
          FuteTrends turns Brasileirao 2026 and Libertadores forecasting into a
          lightweight competition. Users vote yes or no on future football
          events, earn points for correct calls, and climb the ranking as
          markets resolve.
        </p>
      </div>
      <div className={styles.grid}>
        <article>
          <TrendingUp size={24} />
          <h2>Football signals</h2>
          <p>Markets focus on title races, relegation pressure, Libertadores runs, transfers, and coach changes.</p>
        </article>
        <article>
          <ShieldCheck size={24} />
          <h2>Clear resolution</h2>
          <p>Each market should state the source and criteria used to decide yes or no.</p>
        </article>
        <article>
          <Activity size={24} />
          <h2>Gamified accuracy</h2>
          <p>Scores reward users who make accurate predictions before the outcome is known.</p>
        </article>
      </div>
    </section>
  );
}
