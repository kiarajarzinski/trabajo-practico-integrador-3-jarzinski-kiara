import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Outlet, Navigate } from "react-router-dom";

//componente de ruta privada que verifica la autenticacion 
export const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //funcion para verificar la autenticacion del usuario
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      //si la respuesta es ok el usuario esta autenticado
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      //si hay error en en el fetch el usuario no esta autenticado
    } catch (error) {
      console.log("Error al hacer fetch");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  //verificamos la autenticacion al cargar el componente
  useEffect(() => {
    checkAuth();
  }, []);
  return isLoading ? (
    <Loading />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};