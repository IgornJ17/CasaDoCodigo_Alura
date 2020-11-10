const HTTP = require('http')
const app = require("./config/custom-express")

app.listen(3000, () => console.log("Servidor em execucao na porta 3000..."))