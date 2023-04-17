const express = require("express");
const json = require("./json");

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

// Lista de pessoas
app.get("/pessoas", (req, res) => {
  const pessoasFiles = json.listJSON("data", "pessoas");
  const pessoas = pessoasFiles.map((file) =>
    json.readJSON("data", "pessoas", file)
  );
  res.json(pessoas);
});

// Pega pessoa pelo ID
app.get("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pessoa = json.readJSON("data", "pessoas", `${id}.json`);
  res.json(pessoa);
});

// Criar uma pessoa
app.post("/pessoas", (req, res) => {
  const pessoasLatestId = json.readJSON("data", "pessoasLatestId.json");
  const pessoaId = pessoasLatestId.latestId + 1;
  json.updateJSON(["data", "pessoasLatestId.json"], {
    latestId: pessoaId,
  });

  const pessoa = {
    id: pessoaId,
    ...req.body,
  };
  json.createJSON(["data", "pessoas", `${pessoaId}.json`], pessoa);

  const response = {
    success: true,
    data: { pessoa },
  };
  res.json(response);
});

// Sobreescrever uma pessoa pelo ID
app.put("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pessoa = {
    id,
    ...req.body,
  };
  json.overwriteJSON(["data", "pessoas", `${id}.json`], pessoa);

  const response = {
    success: true,
    data: { pessoa },
  };
  res.json(response);
});

// Atualizar parcialmente uma pessoa pelo ID
app.patch("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  json.updateJSON(["data", "pessoas", `${id}.json`], req.body);
  const pessoa = json.readJSON("data", "pessoas", `${id}.json`);

  const response = {
    success: true,
    data: { pessoa },
  };
  res.json(response);
});

// Deletar uma pessoa pelo ID
app.delete("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pessoa = json.readJSON("data", "pessoas", `${id}.json`);
  json.deleteJSON("data", "pessoas", `${id}.json`);
  const response = {
    success: true,
    data: {
      pessoa,
    },
  };
  res.json(response);
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
