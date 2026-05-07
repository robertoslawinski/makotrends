import { AlertTriangle, CheckCircle2, Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [predictions, setPredictions] = useState([]);
  const [resultById, setResultById] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState(null);
  const [processingId, setProcessingId] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await api.get("/api/predictions");
      setPredictions(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Admin markets could not be loaded right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const requestAction = (type, prediction) => {
    setError("");
    setSuccess("");
    setPendingAction({ type, prediction });
  };

  const closeConfirmation = () => {
    if (processingId) return;
    setPendingAction(null);
  };

  const remove = async (id) => {
    try {
      setProcessingId(id);
      await api.delete(`/api/predictions/${id}`);
      setPendingAction(null);
      await load();
      setSuccess("Market deleted.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete this market.");
    } finally {
      setProcessingId("");
    }
  };

  const resolve = async (id) => {
    try {
      setProcessingId(id);
      await api.put(`/api/predictions/${id}/resolve`, {
        result: resultById[id] || "yes"
      });
      setPendingAction(null);
      await load();
      setSuccess("Market resolved and points distributed.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to resolve this market.");
    } finally {
      setProcessingId("");
    }
  };

  const confirmPendingAction = async () => {
    if (!pendingAction) return;

    if (pendingAction.type === "resolve") {
      await resolve(pendingAction.prediction._id);
      return;
    }

    await remove(pendingAction.prediction._id);
  };

  const pendingResult =
    pendingAction?.type === "resolve"
      ? resultById[pendingAction.prediction._id] || "yes"
      : "";

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Admin</h1>
        <Link to="/admin/create">
          <PlusCircle size={18} /> Create prediction
        </Link>
      </div>
      {loading && (
        <StateMessage type="loading" title="Loading admin markets">
          Preparing markets for editing and resolution.
        </StateMessage>
      )}
      {!loading && error && (
        <StateMessage type="error" title="Admin action needs attention" actionLabel="Try again" onAction={load}>
          {error}
        </StateMessage>
      )}
      {!loading && success && (
        <StateMessage type="success" title="Admin action completed" compact>
          {success}
        </StateMessage>
      )}
      {pendingAction && (
        <div className={styles.confirmation} role="dialog" aria-modal="true">
          <div className={styles.confirmationCard}>
            <span className={styles.warningIcon}>
              {pendingAction.type === "resolve" ? (
                <CheckCircle2 size={22} />
              ) : (
                <AlertTriangle size={22} />
              )}
            </span>
            <div>
              <h2>
                {pendingAction.type === "resolve"
                  ? "Resolve this market?"
                  : "Delete this market?"}
              </h2>
              <p>
                <strong>{pendingAction.prediction.title}</strong>
              </p>
              {pendingAction.type === "resolve" ? (
                <p>
                  This will mark <strong>{pendingResult.toUpperCase()}</strong> as the
                  winning outcome, lock the market, calculate correct votes and distribute
                  points. Review the resolution criteria before confirming.
                </p>
              ) : (
                <p>
                  This removes the market from the admin board. Use this only for drafts,
                  test markets or accidental entries.
                </p>
              )}
              <div className={styles.confirmActions}>
                <button type="button" onClick={closeConfirmation} disabled={Boolean(processingId)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={pendingAction.type === "delete" ? styles.danger : ""}
                  onClick={confirmPendingAction}
                  disabled={Boolean(processingId)}
                >
                  {processingId
                    ? "Processing..."
                    : pendingAction.type === "resolve"
                      ? "Confirm resolution"
                      : "Delete market"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && predictions.length === 0 && (
        <StateMessage type="empty" title="No markets created yet">
          Create the first prediction market to launch the board.
        </StateMessage>
      )}
      <div className={styles.list}>
        {predictions.map((prediction) => (
          <article key={prediction._id}>
            <div>
              <strong>{prediction.title}</strong>
              <span>{prediction.status} / {prediction.category}</span>
            </div>
            <select
              value={resultById[prediction._id] || "yes"}
              onChange={(event) =>
                setResultById({ ...resultById, [prediction._id]: event.target.value })
              }
              disabled={prediction.status === "resolved"}
            >
              <option value="yes">Yes wins</option>
              <option value="no">No wins</option>
            </select>
            <button
              disabled={prediction.status === "resolved" || processingId === prediction._id}
              onClick={() => requestAction("resolve", prediction)}
            >
              {processingId === prediction._id ? "Working..." : "Resolve"}
            </button>
            <Link to={`/admin/edit/${prediction._id}`} title="Edit">
              <Edit size={18} />
            </Link>
            <button
              onClick={() => requestAction("delete", prediction)}
              title="Delete"
              disabled={processingId === prediction._id}
            >
              <Trash2 size={18} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
