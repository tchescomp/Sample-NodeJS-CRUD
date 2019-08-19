const express = require("express");

const server = express();

let count = 0;

server.use(express.json());

server.use((req, res, next) => {
  count++;
  console.log(`Contagem de Requisições: ${count}`);
  next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) return res.status(400).json({ error: "Projeto não existe." });

  return next();
}

const projects = [];

//Incluir Projeto no Array
server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

//Listar Projetos do Array
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Alterar Projeto Buscando Pelo id
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//Deletar Projeto do Array
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  var index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
});

//Incluir Tarefa no Projeto contido no Array
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
