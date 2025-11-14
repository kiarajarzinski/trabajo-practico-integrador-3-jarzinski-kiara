import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

//componente registro
export const Register = () => {
    //hook para manejar el formulario
  const { form, handleChange } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  //hook de navegacion
  const navigate = useNavigate();

  //funcion para manejar el registro
  const handleRegister = async (evento) => {
    try {
        //prevenir que se recargue la pag
      evento.preventDefault();

      //se hace el fetch al endpoint de register
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      //si la respuesta no es ok
      if (!response.ok) {
        return alert(data.message);
      }
//si el registro es exitoso
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(135deg,#60a5fa 0%, #7c3aed 50%, #8b5cf6 100%)",
      }}
    >
      <div
        className="card p-4 rounded-3 shadow w-100"
        style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", maxWidth: "480px" }}
      >
        <h2 className="h3 text-center text-white mb-4 fw-bold">Registro de Usuario</h2>

        <form onSubmit={handleRegister} className="d-grid gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control bg-transparent text-white"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={form.lastname}
            onChange={handleChange}
            required
            className="form-control bg-transparent text-white"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
            className="form-control bg-transparent text-white"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control bg-transparent text-white"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control bg-transparent text-white"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          <button type="submit" className="btn btn-light text-primary w-100 fw-semibold">
            Registrarse
          </button>
        </form>

        <p className="text-center text-white mt-3">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-white text-decoration-underline fw-medium">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};