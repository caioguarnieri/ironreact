import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

import styles from "./Header.module.css";

export const Header = () => {
  const { loggedInUser, handleLogout } = useContext(AuthContext);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Book App
      </Link>

      <nav>
        <Link
          className={
            currentPath === "/" ? styles.navlink__active : styles.navlink
          }
          to="/"
        >
          Home
        </Link>
        {loggedInUser.user.role === "ADMIN" && (
          <Link
            className={
              currentPath === "/book/create"
                ? styles.navlink__active
                : styles.navlink
            }
            to="/book/create"
          >
            Novo Livro
          </Link>
        )}
      </nav>

      {!!Object.keys(loggedInUser.user).length ? (
        <div className={styles.welcome}>
          Bem-vindo, {loggedInUser.user.name}
          <button
            className={styles.logout}
            type="button"
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
          >
            Sair
          </button>
        </div>
      ) : (
        <Link
          className={
            currentPath === "/login" ? styles.navlink__active : styles.navlink
          }
          to="/login"
        >
          Entrar
        </Link>
      )}
    </header>
  );
};
