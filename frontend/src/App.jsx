import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Conversations from "./pages/Conversations.jsx";
import Tasks from "./pages/Tasks.jsx";
import Decisions from "./pages/Decisions.jsx";
import ProjectMemory from "./pages/ProjectMemory.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/decisions" element={<Decisions />} />
          <Route path="/project-memory" element={<ProjectMemory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
