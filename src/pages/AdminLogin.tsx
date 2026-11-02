import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Info, LockKeyhole } from "lucide-react";
import { isAdminAuthenticated, loginAdmin } from "../lib/auth";
import { useSeo } from "../hooks/useSeo";
import { Button } from "../components/ui";

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  useSeo({
    title: "Admin Login",
    description: "Browser-local administration for Chattogram Trust.",
    noIndex: true,
  });
  if (isAdminAuthenticated()) return <Navigate to="/admin/dashboard" replace />;
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loginAdmin(username.trim(), password)) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(
        "The credentials were not accepted, or session storage is disabled. Check your details and browser settings.",
      );
      document.getElementById("admin-password")?.focus();
    }
  }
  return (
    <div className="container-site">
      <section className="admin-login">
        <div className="panel">
          <div className="admin-login-icon">
            <LockKeyhole size={25} />
          </div>
          <p className="eyebrow">
            <span />
            INSTITUTE WORKSPACE
          </p>
          <h1>Welcome back.</h1>
          <p className="mb-7 mt-3 text-xs leading-6 text-muted">
            Manage the content and enrollment records saved in this browser.
          </p>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="field-label" htmlFor="admin-username">
                Admin username
              </label>
              <input
                id="admin-username"
                className="field"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
                maxLength={100}
                autoFocus
              />
            </div>
            <div>
              <label className="field-label" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  className="field !pr-12"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  maxLength={100}
                />
                <button
                  type="button"
                  className="icon-btn absolute right-1 top-1"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button className="w-full" type="submit">
              Sign in to workspace
              <ArrowRight size={16} />
            </Button>
          </form>
        </div>
        <div className="form-notice mt-5">
          <Info size={16} className="mb-2 text-cyan-500" />
          <strong className="text-ink">
            Local administration, not secure authentication.
          </strong>
          <p className="mt-1">
            This login gates a browser-local interface. Credentials and data can
            be inspected or changed by anyone with access to this browser or the
            site code. Do not use it to protect sensitive records on a
            public/shared device. A secure multi-user deployment requires
            server-side authentication, authorization and a database.
          </p>
        </div>
      </section>
    </div>
  );
}
