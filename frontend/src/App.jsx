import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Conversations from "./pages/Conversations.jsx";
import Tasks from "./pages/Tasks.jsx";
import Decisions from "./pages/Decisions.jsx";
import ProjectMemory from "./pages/ProjectMemory.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/project-memory" element={<ProjectMemory />} />
      </Route>
    </Routes>
  );
}

export default App;
