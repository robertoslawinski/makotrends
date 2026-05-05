import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className={styles.authPage}>
      <form className={styles.form} onSubmit={submit}>
        <h1>Login</h1>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
