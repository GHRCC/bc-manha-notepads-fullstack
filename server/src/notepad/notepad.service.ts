import path from "path";
import * as json from "../json";
import type { Notepad } from "../../../shared/types";

type FindNotepadsParams = {
  limit?: number;
  offset?: number;
};

const notepadModelPath = path.join("data", "notepad.data");
const notepadModelDataPath = path.join(notepadModelPath, "notepads");

export function findNotepadById(id: number) {
  try {
    const notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
    return notepad;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function findNotepads({
  limit = 10,
  offset = 0,
}: FindNotepadsParams = {}) {
  const notepadsFiles = json
    .listJSON(notepadModelDataPath)
    .sort((a, b) => {
      const idA = parseInt(a);
      const idB = parseInt(b);
      return idA - idB;
    })
    .slice(offset, limit + offset);

  const notepads = notepadsFiles.map((file) => {
    return json.readJSON(notepadModelDataPath, file);
  });
  return notepads;
}

export function deleteNotepadById(id: number) {
  let notepad: Notepad;
  try {
    notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
    json.deleteJSON(notepadModelDataPath, `${id}.json`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function createNotepad(notepadData: Omit<Notepad, "id" | "created_at">) {
  let notepad: Notepad;
  const notepadsLatestId = json.readJSON(
    notepadModelPath,
    "notepadsLatestId.json"
  );
  const notepadId: number = notepadsLatestId.latestId + 1;
  json.updateJSON([notepadModelPath, "notepadsLatestId.json"], {
    latestId: notepadId,
  });

  try {
    notepad = {
      ...notepadData,
      id: notepadId,
      created_at: new Date().toJSON(),
    };
    json.createJSON([notepadModelDataPath, `${notepadId}.json`], notepad);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function updateNotepadById(id: number, notepadData: Notepad) {
  let notepad: Notepad;
  try {
    json.updateJSON([notepadModelDataPath, `${id}.json`], notepadData);
    notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad: Notepad = {
    ...notepadData,
    id,
  };

  try {
    json.overwriteJSON([notepadModelDataPath, `${id}.json`], notepad);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}
