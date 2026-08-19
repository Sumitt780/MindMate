import { useState } from "react";
import { Flower2, Loader2 } from "lucide-react";
import { api, setSession } from "../api";

export default function Login({ onAuthed }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fn = mode === "login" ? api.login : api.register;
      const { token, username: uname } = await fn(username.trim(), password);
      setSession(token, uname);
      onAuthed();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mm-auth-shell">
      <div className="mm-auth-card">
        <div className="mm-logo" style={{ color: "var(--ink)", marginBottom: 20 }}>
          <Flower2 size={22} color="var(--mood-4)" />
          <span className="mm-display" style={{ fontSize: 18, fontWeight: 600 }}>
            MindMate
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
          {mode === "login" ? "Welcome back — sign in to see your garden." : "Create an account to start tracking."}
        </p>
        <form onSubmit={submit}>
          <input
            className="mm-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            className="mm-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
          {error && <div className="mm-error">{error}</div>}
          <button type="submit" className="mm-save-btn" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading && <Loader2 className="mm-spin" size={14} />}
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button className="mm-switch" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
