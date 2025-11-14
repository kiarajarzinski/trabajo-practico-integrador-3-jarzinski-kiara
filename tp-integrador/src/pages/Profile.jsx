import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

//componente perfil
export const Profile = () => {
  const [user, setUser] = useState(null); //estado para el usuario
  const [isLoading, setIsLoading] = useState(true);

  //hook de navegacion 
  const navigate = useNavigate();

  //funcion para obtener al usuario
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      //si la respuesta no es ok
      if (!response.ok) {
        throw new Error("Error al hacer fetch del profile");
      }
      const data = await response.json();
      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [navigate]);

  //funcion para hacer logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
        method: "POST",
      });
      //si la respuesta no es ok
      if (!response.ok) {
        throw new Error("Error al hacer logout");
      }
      alert("Sesión cerrada");
      navigate("/login");
    } catch (error) {
      console.log(error);
      return alert("Error al hacer logout");
    }
  };

   if (isLoading) {
    <Loading />;
  }
  return (
    <>
      <Navbar />

      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{
          background: "linear-gradient(135deg,#6366f1 0%, #7c3aed 50%, #f472b6 100%)",
        }}
      >
        <div
          className="card text-white shadow"
          style={{
            maxWidth: "540px",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="card-body text-center">
            <h1 className="card-title h3 mb-4">Perfil de Usuario</h1>

            {user ? (
              <div className="text-start mb-3">
                <p className="mb-2">
                  <strong>ID:</strong> {user.id}
                </p>
                <p className="mb-2">
                  <strong>Nombre:</strong> {user.name}
                </p>
                <p className="mb-0">
                  <strong>Apellido:</strong> {user.lastname}
                </p>
              </div>
            ) : (
              <p className="text-white-50">Cargando información del usuario...</p>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-light text-primary fw-semibold mt-3 w-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};