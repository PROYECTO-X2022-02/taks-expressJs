const express = require("express");
const fs = require("fs");
const app = express();
const port = 8020;
const list = require("./list-edid-router");
const completados = require("./list-view-router");
const login = require("./Login/login");
const { validateMethod, validateUrl } = require("./middleware/peticiones");
app.use(express.json());
app.use(validateUrl);
app.use(validateMethod);
app.use("/estado", completados);
app.use("/lista", list);
app.use("/login", login);
app.get("/", function (req, res) {
  let datos;
  fs.readFile("tareas.json", function (err, data) {
    let tarea = data.toString();
    datos = JSON.parse(tarea);
    res.send({ tareas: datos });
  });
});

app.listen(port, function () {
  console.log(`el servidor esta escuchando en http://localhost:${port} `);
});
