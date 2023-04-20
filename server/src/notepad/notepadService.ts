import path from "path";
import * as json from "../json";
import type { Notepad } from "./notepadTypes";

const notepadModelPath = path.join("src", "notepad", "notepadModel");
const notepadModelDataPath = path.join(notepadModelPath, "data");

export function findNotepadById(id: number) {
  const notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
  return notepad;
}

export function findNotepads() {
  const notepadsFiles = json.listJSON(notepadModelDataPath);
  const notepads = notepadsFiles.map((file) => {
    return json.readJSON(notepadModelDataPath, file);
  });
  return notepads;
}

export function deleteNotepadById(id: number) {
  const notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
  json.deleteJSON(notepadModelDataPath, `${id}.json`);
  const response = {
    success: true,
    data: {
      notepad,
    },
  };

  return response;
}

export function createNotepad(notepadData: Notepad) {
  const notepadsLatestId = json.readJSON(
    notepadModelPath,
    "notepadsLatestId.json"
  );
  const notepadId: number = notepadsLatestId.latestId + 1;
  json.updateJSON([notepadModelPath, "notepadsLatestId.json"], {
    latestId: notepadId,
  });

  const notepad = {
    ...notepadData,
    id: notepadId,
  };
  json.createJSON([notepadModelDataPath, `${notepadId}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

export function updateNotepadById(id: number, notepadData: Notepad) {
  json.updateJSON([notepadModelDataPath, `${id}.json`], notepadData);
  const notepad = json.readJSON(notepadModelDataPath, `${id}.json`);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad = {
    ...notepadData,
    id,
  };
  json.overwriteJSON([notepadModelDataPath, `${id}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}
