import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../contexts/booksContext";
import styles from "./DeleteModal.module.css";
import { SpinnerLoading } from "./SpinnerLoading";

export const DeleteModal = ({ id, close }) => {
  const { destroy, loading } = useContext(BooksContext);

  const navigate = useNavigate();

  console.log(id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Deseja mesmo excluir este livro?</h3>
        <div className={styles.actions}>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => close()}
          >
            Cancelar
          </button>
          <button
            className={styles.confirm}
            type="button"
            onClick={async () => {
              if (loading) return;
              await destroy(id);
              close();
              navigate("/");
            }}
          >
            {loading ? <SpinnerLoading /> : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};
