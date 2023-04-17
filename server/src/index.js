const express = require("express");
const notepadService = require("./notepadService");

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

// Lista de notepads
app.get("/notepads", (req, res) => {
  const notepads = notepadService.findNotepads();
  res.json(notepads);
});

// Pega notepad pelo ID
app.get("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  res.json(notepad);
});

// Criar uma notepad
app.post("/notepads", (req, res) => {
  const response = notepadService.createNotepadById(req.body);
  res.json(response);
});

// Sobreescrever uma notepad pelo ID
app.put("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.overwriteNotepadById(id, req.body);
  res.json(response);
});

// Atualizar parcialmente uma notepad pelo ID
app.patch("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.updateNotepadById(id, req.body);
  res.json(response);
});

// Deletar uma notepad pelo ID
app.delete("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.json(response);
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
