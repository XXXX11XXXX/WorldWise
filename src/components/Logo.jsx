import styles from "./Logo.module.css";

import { useNavigate } from "react-router-dom";
function Logo() {
  const navigate = useNavigate();
  return <img src="/logo.png" alt="WorldWise logo" className={styles.logo} onClick={() => navigate("/")}  />;
}

export default Logo;
