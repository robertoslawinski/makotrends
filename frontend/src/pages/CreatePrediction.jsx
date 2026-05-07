import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import StateMessage from "../components/StateMessage";
import styles from "./CreatePrediction.module.css";

const initialForm = {
  title: "",
  description: "",
  category: "",
  deadline: "",
  resolutionDate: "",
  resolutionSource: "",
  resolutionCriteria: "",
  pointsValue: 10,
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
  const [loading, setLoading] = useState(editMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!editMode) return;
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/api/predictions/${id}`);
        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          deadline: toDatetimeLocal(data.deadline),
          resolutionDate: data.resolutionDate ? toDatetimeLocal(data.resolutionDate) : "",
          resolutionSource: data.resolutionSource || "",
          resolutionCriteria: data.resolutionCriteria || "",
          pointsValue: data.pointsValue || 10,
          status: data.status
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "This market could not be loaded for editing."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [editMode, id]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        ...form,
        deadline: new Date(form.deadline).toISOString(),
        resolutionDate: form.resolutionDate
          ? new Date(form.resolutionDate).toISOString()
          : null,
        pointsValue: Number(form.pointsValue)
      };

      if (editMode) {
        await api.put(`/api/predictions/${id}`, payload);
      } else {
        await api.post("/api/predictions", payload);
      }

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save this market. Please review the fields and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={submit}>
        <h1>{editMode ? "Edit prediction" : "Create prediction"}</h1>
        {loading && (
          <StateMessage type="loading" title="Loading market draft" compact>
            Fetching the saved market data.
          </StateMessage>
        )}
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
        <div className={styles.grid}>
          <label>
            Resolution date
            <input
              type="datetime-local"
              value={form.resolutionDate}
              onChange={(event) =>
                setForm({ ...form, resolutionDate: event.target.value })
              }
            />
          </label>
          <label>
            Points
            <input
              type="number"
              min="1"
              max="100"
              required
              value={form.pointsValue}
              onChange={(event) =>
                setForm({ ...form, pointsValue: event.target.value })
              }
            />
          </label>
        </div>
        <label>
          Resolution source
          <input
            required
            value={form.resolutionSource}
            onChange={(event) =>
              setForm({ ...form, resolutionSource: event.target.value })
            }
          />
        </label>
        <label>
          Resolution criteria
          <textarea
            required
            minLength="20"
            value={form.resolutionCriteria}
            onChange={(event) =>
              setForm({ ...form, resolutionCriteria: event.target.value })
            }
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
        {error && (
          <StateMessage type="error" title="Market could not be saved" compact>
            {error}
          </StateMessage>
        )}
        <button type="submit" disabled={loading || saving}>
          <Save size={18} /> {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
