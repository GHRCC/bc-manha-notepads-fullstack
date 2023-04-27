import path from "path";
import * as json from "../json";
import type { Notepad } from "../../../shared/types";

type FindNotepadsParams = {
  limit?: number;
  offset?: number;
  search?: string;
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

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");
}

export function findNotepads({
  limit = 10,
  offset = 0,
  search,
}: FindNotepadsParams = {}) {
  const notepadsFiles = json.listJSON(notepadModelDataPath);
  const sortedNotepadsFiles = notepadsFiles.sort((a, b) => {
    const idA = parseInt(a);
    const idB = parseInt(b);
    return idA - idB;
  });

  if (search === undefined) {
    const paginatedNotepadsFiles = sortedNotepadsFiles.slice(
      offset,
      limit + offset
    );

    const count = notepadsFiles.length;
    const notepads = paginatedNotepadsFiles.map((file) => {
      return json.readJSON(notepadModelDataPath, file);
    });

    return { notepads, count };
  } else {
    const normalizedSearch = normalizeText(search);
    const notepads: Notepad[] = sortedNotepadsFiles.map((file) => {
      return json.readJSON(notepadModelDataPath, file);
    });

    const searchedNotepadsFiles = notepads.filter(
      ({ title, subtitle, content }) => {
        const normalizedTitle = normalizeText(title);
        const normalizedSubtitle = normalizeText(subtitle);
        const normalizedContent = normalizeText(content);
        return (
          normalizedTitle.includes(normalizedSearch) ||
          normalizedSubtitle.includes(normalizedSearch) ||
          normalizedContent.includes(normalizedSearch)
        );
      }
    );

    const count = searchedNotepadsFiles.length;
    const paginatedNotepadsFiles = searchedNotepadsFiles.slice(
      offset,
      limit + offset
    );

    return {
      count,
      notepads: paginatedNotepadsFiles,
    };
  }
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
