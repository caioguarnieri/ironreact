import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

import styles from "./BookDetails.module.css";

export const BookDetails = ({
  coverImage,
  title,
  _id: id,
  author,
  releaseYear,
  genre,
  synopsis,
  openDeleteModal,
  setDeleteModalId,
}) => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <>
      <div className={styles.top}>
        <img className={styles.image} src={coverImage} alt={title} />

        {loggedInUser.user.role === "ADMIN" && (
          <div className={styles.actions}>
            <Link className={styles.edit} to={`/book/edit/${id}`}>
              Editar
            </Link>
            <button
              className={styles.remove}
              type="button"
              onClick={() => {
                setDeleteModalId(id);
                openDeleteModal();
              }}
            >
              Deletar
            </button>
          </div>
        )}
      </div>
      <ul className={styles.details}>
        <li className={styles.topic}>
          <strong>Título do Livro:</strong> {title}
        </li>
        <li className={styles.topic}>
          <strong>Autor:</strong> {author}
        </li>
        <li className={styles.topic}>
          <strong>Ano de Lançamento:</strong> {releaseYear}
        </li>
        <li className={styles.topic}>
          <strong>Gênero:</strong> {genre}
        </li>
        <li className={styles.topic}>
          <strong>Sinopse:</strong> {synopsis}
        </li>
      </ul>
    </>
  );
};
