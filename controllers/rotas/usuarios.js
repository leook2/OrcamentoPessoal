const query = require('../funcoes/funcoesRotas')
const usuarios = require("../../models/Usuarios")()
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.post('/add', (req, res) => {
        const dados = { nomeUsuario: req.body.nome, email: req.body.email, hashSenha: req.body.senha }
        var erros = []
        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome ==null){
            erros.push({texto: "Nome invalido"})
        }
        if(!req.body.email || typeof req.body.email == undefined || req.body.email ==null){
            erros.push({texto: "Email invalido"})
        }

        if(!req.body.senha || typeof req.body.senha== undefined || req.body.senha ==null){
            erros.push({texto: "Senha invalida"})
        }
        if(req.body.senha != req.body.senha2){
            erros.push({texto: "As senhas não correspodem"})
        }
        if(erros.length > 0){
           console.log(erros)
        }else{
            query.create(dados, usuarios, res)
        }
    })

    app.use(session({
        secret: uuidv4(),
        resave: true,
        saveUninitialized: true
    }))

    //Login
    app.post('/login', (req, res) => {


    })
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.get('/cadastro', (req, res) => {
        res.render('cadastro')
    })
}