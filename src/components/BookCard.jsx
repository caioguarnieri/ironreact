import { useContext } from "react";
import { Link } from "react-router-dom";
import { BinIcon } from "../assets/icons/BinIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { AuthContext } from "../contexts/authContext";
import { BooksContext } from "../contexts/booksContext";

import styles from "./BookCard.module.css";

export const BookCard = ({
  coverImage,
  image,
  title,
  author,
  releaseYear,
  _id: id,
  openDeleteModal,
  setDeleteModalId,
}) => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <li className={styles.bookcard}>
      <img className={styles.image} src={coverImage} alt={image} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{author}</p>
        <span>{releaseYear}</span>
        <div className={styles.actions}>
          <Link className={styles.show} to={`/book/${id}`}>
            Ver Detalhes
          </Link>

          {loggedInUser.user.role === "ADMIN" && (
            <>
              <Link className={styles.edit} to={`/book/edit/${id}`}>
                <EditIcon />
              </Link>
              <button
                className={styles.remove}
                onClick={() => {
                  setDeleteModalId(id);
                  openDeleteModal();
                }}
              >
                <BinIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
