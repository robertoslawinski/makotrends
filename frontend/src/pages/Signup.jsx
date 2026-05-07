import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StateMessage from "../components/StateMessage";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please check the fields and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authPage}>
      <form className={styles.form} onSubmit={submit}>
        <h1>Create account</h1>
        <label>
          Name
          <input
            required
            minLength="2"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength="8"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        {error && (
          <StateMessage type="error" title="Could not create account" compact>
            {error}
          </StateMessage>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
