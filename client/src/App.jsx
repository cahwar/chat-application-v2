import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import AuthWaitingRoutes from "./utils/AuthWaitingRoutes";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthWaitingRoutes />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={(<h1>Hello</h1>)} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}