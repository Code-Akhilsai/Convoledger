import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Conversations from "./pages/Conversations.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/conversations" element={<Conversations />} />
      </Route>
    </Routes>
  );
}

export default App;
