const json = require("./json");

function findNotepadById(id) {
  const notepad = json.readJSON("data", "notepads", `${id}.json`);
  return notepad;
}

function findNotepads() {
  const notepadsFiles = json.listJSON("data", "notepads");
  const notepads = notepadsFiles.map((file) =>
    json.readJSON("data", "notepads", file)
  );
  return notepads;
}

function deleteNotepadById(id) {
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

function createNotepadById(notepadData) {
  const notepadsLatestId = json.readJSON("data", "notepadsLatestId.json");
  const notepadId = notepadsLatestId.latestId + 1;
  json.updateJSON(["data", "notepadsLatestId.json"], {
    latestId: notepadId,
  });

  const notepad = {
    id: notepadId,
    ...notepadData,
  };
  json.createJSON(["data", "notepads", `${notepadId}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

function updateNotepadById(id, notepadData) {
  json.updateJSON(["data", "notepads", `${id}.json`], notepadData);
  const notepad = json.readJSON("data", "notepads", `${id}.json`);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

function overwriteNotepadById(id, notepadData) {
  const notepad = {
    id,
    ...notepadData,
  };
  json.overwriteJSON(["data", "notepads", `${id}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}

module.exports = {
  findNotepads,
  findNotepadById,
  deleteNotepadById,
  createNotepadById,
  updateNotepadById,
  overwriteNotepadById,
};
