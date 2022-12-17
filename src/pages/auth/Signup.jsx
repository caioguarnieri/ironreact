import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { AuthContext } from "../../contexts/authContext";

function Signup(props) {
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    validate(event);
  }

  function handleError(event, message) {
    setFormErrors({
      ...formErrors,
      [event.currentTarget.name]: message,
    });
  }

  function validate(event) {
    const { value, name } = event.currentTarget;
    let errorMessage = "";

    switch (name) {
      case "name":
        errorMessage = "Nome Obrigatório!";
        break;
      case "email":
        errorMessage = "Email Obrigatório!";
        break;
      case "password":
        errorMessage = "Senha Obrigatória!";
        break;
      default:
        break;
    }

    if (value.trim() === "") {
      return handleError(event, errorMessage);
    }

    delete formErrors[name];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(formErrors).length !== 0) {
      return;
    }

    try {
      authContext.setLoading(true);
      const response = await api.post("/signup", formData);
      setFormErrors({});
      authContext.setLoading(false);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
      }

      console.error(err);
    }
  }

  return (
    <>
      <h1 className="title">Crie sua conta</h1>
      <h2 className="subtitle">
        Já possui uma conta? <Link to="/login">Entrar</Link>
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="signupFormName">
          Nome Completo
        </label>
        <input
          className={formErrors.name ? "input input__error" : "input"}
          type="name"
          name="name"
          id="signupFormName"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {formErrors.name && <span className="error">{formErrors.name}</span>}

        <label className="label" htmlFor="signupFormEmail">
          Email
        </label>
        <input
          className={formErrors.email ? "input input__error" : "input"}
          type="email"
          name="email"
          id="signupFormEmail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}

        <label className="label" htmlFor="signupFormPassword">
          Senha
        </label>
        <input
          className={formErrors.password ? "input input__error" : "input"}
          type="password"
          name="password"
          id="signupFormPassword"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formErrors.password && (
          <span className="error">{formErrors.password}</span>
        )}

        <button
          className="submit"
          type={authContext.loading ? "button" : "submit"}
        >
          {authContext.loading ? <SpinnerLoading /> : "Cadastrar"}
        </button>
      </form>
    </>
  );
}

export default Signup;
