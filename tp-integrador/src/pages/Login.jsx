import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

//componente login
export const Login = () => {
  const { form, handleChange } = useForm({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  //funcion para manejar el login
  const handleLogin = async (evento) => {
    try {
        //prevenir comportamiento por defecto
      evento.preventDefault();
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      //si la respuesta no es ok
      if (!response.ok) {
        return alert(data.message);
      }

      //si el login es exitoso
      alert(data.message);
      navigate("/home");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ background: "linear-gradient(135deg,#93c5fd 0%, #bfdbfe 100%)" }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <div className="card rounded-3 shadow p-4">
          <h2 className="h3 text-center text-dark mb-4 fw-bold">Iniciar Sesión</h2>

          <form className="d-grid gap-3" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="form-label mb-1">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Ingresa tu nombre de usuario"
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                className="form-control"
              />
            </div>

            <span className="d-flex justify-content-center gap-1">
              <p className="mb-0">¿No tienes una cuenta?</p>
              <Link to="/register" className="link-primary">
                Registrate
              </Link>
            </span>

            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};