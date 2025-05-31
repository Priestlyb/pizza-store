import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!username || !password) return;
    setLoading(true);
    setError(false);
    try {
      await axios.post("/api/login", { username, password });
      router.push("/admin");
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className={styles.button}
          disabled={loading || !username || !password}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <span className={styles.error}>Wrong credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
