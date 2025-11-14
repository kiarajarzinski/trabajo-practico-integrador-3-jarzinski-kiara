import React, { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Outlet, Navigate } from "react-router-dom";

//componente de ruta publica que verifica la autenticacion 
export default function PublicRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //funcion para verificar la autenticacion del usuario
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (response.ok) {
        // si la respuesta es ok esta autenticado
        setIsAuthenticated(true);
      } else {
        //  si no, el usuario no esta autenticado
        setIsAuthenticated(false);
      }
      //si hay error en el fetch no esta autenticado
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
  // retornamos el loading si esta cargando, si esta autenticado redirigimos a home, si no mostramos las rutas publicas
  return isLoading ? (
    <Loading />
  ) : isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Outlet />
  );
}