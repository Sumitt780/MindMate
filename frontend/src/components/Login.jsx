import { useState } from "react";
import {
  Flower2,
  Loader2,
  Eye,
  EyeOff,
  LockKeyhole,
  User,
  ShieldCheck,
} from "lucide-react";

import { api, setSession } from "../api";

export default function Login({ onAuthed }) {
  const [mode, setMode] = useState("login");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const isLogin = mode === "login";

  const submit = async (e) => {
    e.preventDefault();

    setError(null);

    const cleanUsername =
      username.trim();

    if (!cleanUsername) {
      setError(
        "Please enter your username."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const fn = isLogin
        ? api.login
        : api.register;

      const {
        token,
        username: uname,
      } = await fn(
        cleanUsername,
        password
      );

      setSession(
        token,
        uname
      );

      onAuthed();
    } catch (err) {
      console.error(
        "Authentication error:",
        err
      );

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(
      isLogin
        ? "register"
        : "login"
    );

    setError(null);
    setPassword("");
  };

  return (
    <div className="mm-auth-shell">

      <div className="mm-auth-card">

        {/* =========================
            Brand
            ========================= */}

        <div className="mm-auth-brand">

          <div className="mm-auth-logo">
            <Flower2
              size={23}
              strokeWidth={2.1}
            />
          </div>

          <div>
            <div className="mm-auth-brand-title">
              MindMate
            </div>

            <div className="mm-auth-brand-subtitle">
              Your wellness space
            </div>
          </div>

        </div>

        {/* =========================
            Heading
            ========================= */}

        <div className="mm-auth-heading">

          <h1>
            {isLogin
              ? "Welcome back"
              : "Create your space"}
          </h1>

          <p>
            {isLogin
              ? "Sign in to continue your wellness journey."
              : "Create an account and start your wellness journey."}
          </p>

        </div>

        {/* =========================
            Form
            ========================= */}

        <form
          className="mm-auth-form"
          onSubmit={submit}
        >

          {/* Username */}

          <div className="mm-auth-field">

            <label htmlFor="mindmate-username">
              Username
            </label>

            <div className="mm-auth-input-wrap">

              <User
                size={16}
                className="mm-auth-input-icon"
              />

              <input
                id="mindmate-username"
                className="mm-input mm-auth-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                autoComplete="username"
                disabled={loading}
                required
              />

            </div>

          </div>

          {/* Password */}

          <div className="mm-auth-field">

            <label htmlFor="mindmate-password">
              Password
            </label>

            <div className="mm-auth-input-wrap">

              <LockKeyhole
                size={16}
                className="mm-auth-input-icon"
              />

              <input
                id="mindmate-password"
                className="mm-input mm-auth-input mm-auth-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                autoComplete={
                  isLogin
                    ? "current-password"
                    : "new-password"
                }
                disabled={loading}
                minLength={6}
                required
              />

              <button
                type="button"
                className="mm-auth-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>

            </div>

            {!isLogin && (
              <span className="mm-auth-field-hint">
                Use at least 6 characters.
              </span>
            )}

          </div>

          {/* Error */}

          {error && (
            <div className="mm-auth-error">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            className="mm-save-btn mm-auth-submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <Loader2
                  className="mm-spin"
                  size={15}
                />

                <span>
                  {isLogin
                    ? "Signing in..."
                    : "Creating account..."}
                </span>
              </>
            ) : (
              <span>
                {isLogin
                  ? "Sign in"
                  : "Create account"}
              </span>
            )}

          </button>

        </form>

        {/* =========================
            Switch mode
            ========================= */}

        <div className="mm-auth-switch-row">

          <span>
            {isLogin
              ? "New to MindMate?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            className="mm-switch"
            onClick={switchMode}
            disabled={loading}
          >
            {isLogin
              ? "Create an account"
              : "Sign in"}
          </button>

        </div>

        {/* =========================
            Privacy
            ========================= */}

        <div className="mm-auth-privacy">

          <ShieldCheck size={13} />

          <span>
            Your wellness journey is private
            and belongs to you.
          </span>

        </div>

      </div>

    </div>
  );
}