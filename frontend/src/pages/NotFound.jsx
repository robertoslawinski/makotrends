import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.code}>404</div>
      <div className={styles.content}>
        <span>Signal not found</span>
        <h1>This market path does not exist.</h1>
        <p>
          The link may be outdated, mistyped or pointing to a market that is no longer
          available. Head back to the live board and keep scanning tomorrow's signals.
        </p>
        <div className={styles.actions}>
          <Link to="/">
            <ArrowLeft size={18} /> Back to markets
          </Link>
          <Link to="/ranking">
            <Search size={18} /> View ranking
          </Link>
        </div>
      </div>
    </section>
  );
}
