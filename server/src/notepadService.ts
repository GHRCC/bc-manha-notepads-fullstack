import * as json from "./json";
import type { Notepad } from "./types";

export function findNotepadById(id: number) {
  const notepad = json.readJSON("data", "notepads", `${id}.json`);
  return notepad;
}

export function findNotepads() {
  const notepadsFiles = json.listJSON("data", "notepads");
  const notepads = notepadsFiles.map((file) =>
    json.readJSON("data", "notepads", file)
  );
  return notepads;
}

export function deleteNotepadById(id: number) {
  const notepad = json.readJSON("data", "notepads", `${id}.json`);
  json.deleteJSON("data", "notepads", `${id}.json`);
  const response = {
    success: true,
    data: {
      notepad,
    },
  };

  return response;
}

export function createNotepadById(notepadData: Notepad) {
  const notepadsLatestId = json.readJSON("data", "notepadsLatestId.json");
  const notepadId: number = notepadsLatestId.latestId + 1;
  json.updateJSON(["data", "notepadsLatestId.json"], {
    latestId: notepadId,
  });

  const notepad = {
    ...notepadData,
    id: notepadId,
  };
  json.createJSON(["data", "notepads", `${notepadId}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

export function updateNotepadById(id: number, notepadData: Notepad) {
  json.updateJSON(["data", "notepads", `${id}.json`], notepadData);
  const notepad = json.readJSON("data", "notepads", `${id}.json`);

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
  json.overwriteJSON(["data", "notepads", `${id}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}
