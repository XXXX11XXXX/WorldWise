import styles from "./User.module.css";
import {useFakeAuth} from "../context/FakeAuthContext";
import {useNavigate} from "react-router-dom";
function User() {
  const {user, logout} = useFakeAuth();
  const navigate = useNavigate();
  if (!user) return null;

  function handleClick() {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>欢迎, {user.name}</span>
      <button onClick={handleClick}>退出</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
