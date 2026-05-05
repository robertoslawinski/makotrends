import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import styles from "./CreatePrediction.module.css";

const initialForm = {
  title: "",
  description: "",
  category: "",
  deadline: "",
  status: "open"
};

const toDatetimeLocal = (value) => {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export default function CreatePrediction({ editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!editMode) return;
      const { data } = await api.get(`/api/predictions/${id}`);
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        deadline: toDatetimeLocal(data.deadline),
        status: data.status
      });
    };
    load();
  }, [editMode, id]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        deadline: new Date(form.deadline).toISOString()
      };

      if (editMode) {
        await api.put(`/api/predictions/${id}`, payload);
      } else {
        await api.post("/api/predictions", payload);
      }

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save prediction");
    }
  };

  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={submit}>
        <h1>{editMode ? "Edit prediction" : "Create prediction"}</h1>
        <label>
          Title
          <input
            required
            minLength="5"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </label>
        <label>
          Category
          <input
            required
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            required
            minLength="10"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </label>
        <label>
          Deadline
          <input
            type="datetime-local"
            required
            value={form.deadline}
            onChange={(event) => setForm({ ...form, deadline: event.target.value })}
          />
        </label>
        {editMode && (
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </label>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit">
          <Save size={18} /> Save
        </button>
      </form>
    </section>
  );
}
