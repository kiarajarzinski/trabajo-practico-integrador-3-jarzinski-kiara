import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";
import { Navbar } from "../components/Navbar.jsx";

//componente home 
export const Home = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  //funcion para obtener al usuario
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      //si la respuesta no es ok
      if (!response.ok) {
        throw new Error("Error al hacer fetch del profile");
      }
    //obtener los datos
      const data = await response.json();
      console.log(data);
      setUser(data.user);
      //si hay error redirigir al login
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  //llamar a la funcion getUser 
  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-white p-4"
        style={{ background: "linear-gradient(135deg,#6366f1 0%, #7c3aed 50%, #f472b6 100%)" }}
      >
        {user ? (
          <div
            className="card text-center w-100 mx-auto shadow"
            style={{ maxWidth: "540px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
          >
            <div className="card-body text-white">
              <h2 className="h3 fw-bold mb-3">¡Bienvenido, {user.name}!</h2>
              <p className="mb-0" style={{ opacity: 0.95 }}>
                Este es tu panel de usuario. 
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white-50 fs-5">Cargando...</p>
        )}
      </main>
    </>
  );
};