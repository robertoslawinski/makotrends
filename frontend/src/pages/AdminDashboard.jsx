import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [predictions, setPredictions] = useState([]);
  const [resultById, setResultById] = useState({});
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await api.get("/api/predictions");
    setPredictions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await api.delete(`/api/predictions/${id}`);
    await load();
  };

  const resolve = async (id) => {
    setError("");
    try {
      await api.put(`/api/predictions/${id}/resolve`, {
        result: resultById[id] || "yes"
      });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to resolve prediction");
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
      {error && <p className="error">{error}</p>}
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
