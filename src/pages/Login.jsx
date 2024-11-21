import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useFakeAuth } from "../context/FakeAuthContext";
import Message from "../components/Message";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState("");
  
  const { login, isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if(!email || !password) {
      setError("请填写所有字段");
      return;
    }

    try {
      await login(email, password);
    } catch(err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/app",{replace: true});
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <Message message={error} />}
        
        <div className={styles.row}>
          <label htmlFor="email">邮箱地址</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">登录</Button>
        </div>
      </form>
    </main>
  );
}
