import styles from "./VoteProgress.module.css";

export default function VoteProgress({ percentages = { yes: 0, no: 0 }, counts = { yes: 0, no: 0 } }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span>Yes</span>
        <strong>{percentages.yes}%</strong>
      </div>
      <div className={styles.track}>
        <span className={styles.yes} style={{ width: `${percentages.yes}%` }} />
      </div>
      <div className={styles.row}>
        <span>No</span>
        <strong>{percentages.no}%</strong>
      </div>
      <div className={styles.track}>
        <span className={styles.no} style={{ width: `${percentages.no}%` }} />
      </div>
      <small>
        {counts.yes || 0} yes / {counts.no || 0} no
      </small>
    </div>
  );
}
