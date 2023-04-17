const fs = require("fs");
const path = require("path");

function isJSON(path) {
  return path.endsWith(".json");
}

function fileExists(path) {
  return fs.existsSync(path);
}

// Lê um arquivo JSON
function readJSON(...jsonFile) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } else {
    throw new Error("Esse arquivo não existe!");
  }
}

// Cria um arquivo JSON
function createJSON(jsonFile, jsonContent, indentSize = 2) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, indentSize)
    );
  } else {
    throw new Error("Já existe um arquivo nesse caminho!");
  }
}

// Apaga um arquivo JSON
function deleteJSON(...jsonFile) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.unlinkSync(jsonFilePath);
  } else {
    throw new Error("Não é um caminho para um arquivo JSON");
  }
}

// Sobrescreve um arquivo JSON
function overwriteJSON(jsonFile, jsonContent, indentSize = 2) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, indentSize)
    );
  } else {
    throw new Error("Esse arquivo não existe!");
  }
}

// Atualiza parcialmente um arquivo JSON
function updateJSON(jsonFile, jsonContent, indentSize = 2) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) || !isJSON(jsonFilePath)) {
    throw new Error("Esse arquivo não existe!");
  }

  const currentJsonContent = JSON.parse(
    fs.readFileSync(jsonFilePath).toString()
  );
  const nextJsonContent = {
    ...currentJsonContent,
    ...jsonContent,
  };
  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(nextJsonContent, null, indentSize)
  );
}

function listJSON(...jsonPath) {
  const files = fs.readdirSync(path.join(...jsonPath));
  return files.filter((file) => file.endsWith(".json"));
}

module.exports = {
  readJSON,
  createJSON,
  overwriteJSON,
  updateJSON,
  deleteJSON,
  listJSON,
};
