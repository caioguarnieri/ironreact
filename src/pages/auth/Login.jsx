import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import { SpinnerLoading } from "../../components/SpinnerLoading";

function Login() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

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

    let errorMessage =
      name === "email" ? "Email Obrigatório" : "Senha Obrigatória";

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
      const response = await api.post("/login", formData);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      authContext.setLoading(false);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setFormErrors({});
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
    }
  }

  return (
    <>
      <h1 className="title">Entre na sua conta</h1>
      <h2 className="subtitle">
        Ainda não tem conta? <Link to="/signup">Cadastrar</Link>
      </h2>
      <form className="form" onSubmit={handleSubmit}>
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

        <button className="submit" type={authContext.loading ? "button" : "submit"}>
          {authContext.loading ? <SpinnerLoading /> : "Entrar"}
        </button>
      </form>
    </>
  );
}

export default Login;
