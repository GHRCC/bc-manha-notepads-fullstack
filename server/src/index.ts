import express from "express";
import * as notepadService from "./notepadService";
import fs from "fs";

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

// Lista de notepads
app.get("/notepads", (req, res) => {
  const notepads = notepadService.findNotepads();
  res.status(200).json(notepads);
});

// Pega notepad pelo ID
app.get("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  res.status(200).json(notepad);
});

// Criar uma notepad
app.post("/notepads", (req, res) => {
  const response = notepadService.createNotepadById(req.body);
  res.status(201).json(response);
});

// Sobreescrever uma notepad pelo ID
app.put("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.overwriteNotepadById(id, req.body);
  res.status(200).json(response);
});

// Atualizar parcialmente uma notepad pelo ID
app.patch("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.updateNotepadById(id, req.body);
  res.status(200).json(response);
});

// Deletar uma notepad pelo ID
app.delete("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.status(200).json(response);
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
