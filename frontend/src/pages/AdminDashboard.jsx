import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [predictions, setPredictions] = useState([]);
  const [resultById, setResultById] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError("");
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

  const remove = async (id) => {
    setError("");
    try {
      await api.delete(`/api/predictions/${id}`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete this market.");
    }
  };

  const resolve = async (id) => {
    setError("");
    try {
      await api.put(`/api/predictions/${id}/resolve`, {
        result: resultById[id] || "yes"
      });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to resolve this market.");
    }
  };

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
            <button disabled={prediction.status === "resolved"} onClick={() => resolve(prediction._id)}>
              Resolve
            </button>
            <Link to={`/admin/edit/${prediction._id}`} title="Edit">
              <Edit size={18} />
            </Link>
            <button onClick={() => remove(prediction._id)} title="Delete">
              <Trash2 size={18} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
