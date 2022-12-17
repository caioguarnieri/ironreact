import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../contexts/booksContext";
import styles from "./Form.module.css";
import { SpinnerLoading } from "./SpinnerLoading";

export const Form = ({ type = "create", id }) => {
  const { create, update, loading, show } = useContext(BooksContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    releaseYear: "",
    genre: "",
    file: "",
    synopsis: "",
  });
  const [formErrors, setFormErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      let response;
      if (type === "create") {
        response = await create({ ...formData });
      }

      if (type === "edit") {
        response = await update({ ...formData }, id);
      }

      if (response) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { value, type, files } = event.target;

    const formValue = type === "file" ? files[0] : value;

    setFormData({ ...formData, [event.target.name]: formValue });
  }

  useEffect(() => {
    const loadBook = async () => {
      const response = await show(id);
      setFormData({
        ...response,
        file: "",
      });
    };

    if (type === "edit") {
      loadBook();
    }
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <label className={styles.label} htmlFor="title">
        Título
      </label>
      <input
        className={formErrors.title ? styles.input__error : styles.input}
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      {formErrors.title && (
        <span className={styles.error}>{formErrors.title}</span>
      )}

      <label className={styles.label} htmlFor="author">
        Autor
      </label>
      <input
        className={formErrors.password ? styles.input__error : styles.input}
        type="text"
        name="author"
        id="author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      {formErrors.author && (
        <span className={styles.error}>{formErrors.author}</span>
      )}

      <label className={styles.label} htmlFor="releaseYear">
        Ano de Lançamento
      </label>
      <input
        className={formErrors.password ? styles.input__error : styles.input}
        type="number"
        name="releaseYear"
        id="releaseYear"
        value={formData.releaseYear}
        onChange={handleChange}
        required
      />
      {formErrors.releaseYear && (
        <span className={styles.error}>{formErrors.releaseYear}</span>
      )}

      <label className={styles.label} htmlFor="genre">
        Gênero
      </label>
      <input
        className={formErrors.password ? styles.input__error : styles.input}
        type="text"
        name="genre"
        id="genre"
        value={formData.genre}
        onChange={handleChange}
      />
      {formErrors.genre && (
        <span className={styles.error}>{formErrors.genre}</span>
      )}

      <label className={styles.label} htmlFor="file">
        Imagem da Capa
      </label>
      <input
        className={formErrors.password ? styles.input__error : styles.input}
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
      />
      {formErrors.file && (
        <span className={styles.error}>{formErrors.file}</span>
      )}

      <label className={styles.label} htmlFor="synopsis">
        Sinopse
      </label>
      <textarea
        className={
          formErrors.password ? styles.textarea__error : styles.textarea
        }
        type="text"
        name="synopsis"
        id="synopsis"
        value={formData.synopsis}
        onChange={handleChange}
      />
      {formErrors.synopsis && (
        <span className={styles.error}>{formErrors.synopsis}</span>
      )}

      <button className={styles.btn} type="submit">
        {loading ? <SpinnerLoading /> : "Salvar"}
      </button>
    </form>
  );
};
