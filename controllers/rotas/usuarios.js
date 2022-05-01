const query = require('../funcoes/funcoesRotas')
const usuarios = require("../../models/Usuarios")()
module.exports = function (app) {
    app.post('/add', (req, res) => {
        const dados = { nomeUsuario: req.body.nome, email: req.body.email, hashSenha: req.body.senha }
        console.log(dados)
        query.create(dados, usuarios, res)
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.get('/cadastro', (req, res) => {
        res.render('cadastro')
    })
}