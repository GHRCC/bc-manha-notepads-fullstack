import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppBar } from "./components/AppBar";
import { Home } from "./routes/Home";
import { CreateNotepad } from "./routes/CreateNotepad";
import { ViewNotepad } from "./routes/ViewNotepad";
import { EditNotepad } from "./routes/EditNotepad";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-notepad" element={<CreateNotepad />} />
          <Route path="/publicacoes/:id" element={<ViewNotepad />} />
          <Route path="/publicacoes/editar/:id" element={<EditNotepad />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
