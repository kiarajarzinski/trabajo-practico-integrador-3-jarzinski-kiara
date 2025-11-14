import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Profile } from "../pages/Profile.jsx";
import { Home } from "../pages/Home.jsx";
import { Tasks } from "../pages/Tasks.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx"
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};