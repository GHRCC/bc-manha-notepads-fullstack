import express from "express";
import * as notepadService from "./notepad.service";

export const notepadController = express.Router();

// Lista os notepads
notepadController.get("/", (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const notepads = notepadService.findNotepads({ limit, offset });
  res.status(200).json(notepads);
});

// Pega um notepad pelo ID
notepadController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  if (notepad === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(notepad);
  }
});

// Cria um notepad
notepadController.post("/", (req, res) => {
  console.log(req.query);
  const response = notepadService.createNotepad(req.body);
  res.status(201).json(response);
});

// Sobreescreve um notepad pelo ID
notepadController.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.overwriteNotepadById(id, req.body);
  res.status(200).json(response);
});

// Atualiza parcialmente um notepad pelo ID
notepadController.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.updateNotepadById(id, req.body);
  res.status(200).json(response);
});

// Deleta um notepad pelo ID
notepadController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.status(200).json(response);
});
