import styles from "./Info.module.css";

export default function Privacy() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <span>Privacy Policy</span>
        <h1>How MakoTrends handles basic account data.</h1>
        <p>
          This MVP collects only the information needed to run accounts, votes,
          points, and rankings. Last updated: May 6, 2026.
        </p>
      </div>
      <div className={styles.stack}>
        <article>
          <h2>Information we collect</h2>
          <p>
            We store your name, email address, hashed password, votes, points,
            prediction accuracy, and market history. We do not store your
            plaintext password.
          </p>
        </article>
        <article>
          <h2>How we use it</h2>
          <p>
            We use account data to authenticate you, prevent duplicate votes,
            calculate points, show rankings, and display your prediction
            history.
          </p>
        </article>
        <article>
          <h2>Service providers</h2>
          <p>
            MakoTrends uses third-party infrastructure including Netlify,
            Render, MongoDB Atlas, and GitHub. These providers process data as
            needed to host, deploy, and operate the app.
          </p>
        </article>
        <article>
          <h2>Data deletion</h2>
          <p>
            During the MVP period, deletion requests can be handled manually by
            the project operator. Public rankings may change if an account is
            removed.
          </p>
        </article>
        <article>
          <h2>Security</h2>
          <p>
            Passwords are hashed before storage, and production secrets are kept
            outside the source repository. No internet service is perfectly
            secure, so avoid reusing sensitive passwords.
          </p>
        </article>
      </div>
    </section>
  );
}
