import { CheckCircle2, Clock, Scale, ShieldAlert } from "lucide-react";
import styles from "./Info.module.css";

const rules = [
  {
    icon: CheckCircle2,
    title: "Vote once",
    text: "Each user can vote yes or no once per market. Votes are locked after submission."
  },
  {
    icon: Clock,
    title: "Deadlines matter",
    text: "Open markets accept votes until the listed deadline. Expired markets close automatically."
  },
  {
    icon: Scale,
    title: "Resolution criteria",
    text: "Markets resolve according to the stated criteria and source. Ambiguous outcomes should be resolved conservatively."
  },
  {
    icon: ShieldAlert,
    title: "Admin resolution",
    text: "Admins resolve markets manually for the MVP. Future versions may add disputes, evidence, and automated checks."
  }
];

export default function Rules() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <span>Platform rules</span>
        <h1>Simple rules for fair trend predictions.</h1>
        <p>
          MakoTrends is a points-based prediction game. It does not handle real
          money, payouts, securities, or gambling. Points are for ranking and
          reputation only.
        </p>
      </div>
      <div className={styles.grid}>
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <article key={rule.title}>
              <Icon size={24} />
              <h2>{rule.title}</h2>
              <p>{rule.text}</p>
            </article>
          );
        })}
      </div>
      <div className={styles.panel}>
        <h2>Resolution policy</h2>
        <p>
          A market resolves YES only when the stated event clearly happens by
          the deadline according to the listed source. It resolves NO when the
          threshold is missed, the event is not verifiable, or the result remains
          materially ambiguous after the resolution date.
        </p>
      </div>
    </section>
  );
}
