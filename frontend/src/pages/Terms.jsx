import styles from "./Info.module.css";

export default function Terms() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <span>Terms</span>
        <h1>Basic terms for using MakoTrends.</h1>
        <p>
          MakoTrends is a points-based forecasting game. By using it, you agree
          to play fairly and understand that points have no cash value.
        </p>
      </div>
      <div className={styles.stack}>
        <article>
          <h2>No real-money wagering</h2>
          <p>
            MakoTrends does not support deposits, withdrawals, payouts,
            securities, gambling, or real-money prediction markets. Points are
            for reputation and ranking only.
          </p>
        </article>
        <article>
          <h2>Accounts and conduct</h2>
          <p>
            Use one account, keep your login secure, and do not attempt to
            manipulate votes, rankings, or market outcomes.
          </p>
        </article>
        <article>
          <h2>Market resolution</h2>
          <p>
            Markets resolve according to their stated criteria and sources.
            Admins resolve outcomes manually during the MVP. Ambiguous cases may
            be resolved conservatively or left closed until evidence is clear.
          </p>
        </article>
        <article>
          <h2>Availability</h2>
          <p>
            The service is provided as an MVP and may change, pause, or go
            offline. Free hosting services may introduce cold starts or brief
            delays.
          </p>
        </article>
        <article>
          <h2>Content and decisions</h2>
          <p>
            Markets are for informational and entertainment purposes. They are
            not financial, legal, investment, or professional advice.
          </p>
        </article>
      </div>
    </section>
  );
}
