const express=require('express');
const cors=require('cors');
/* =======estou comentando o banco de dados pois a gente não tem um DEFINIDO por enquanto, e tbm para não dar conflito com o node na hora de iniciar
const connection = require('./controllers/database');=========
*/
const bordyParser=require('body-parser');
const { application } = require('express');
const consign = require('consign');

var app=express();
app.use(cors());

/*=========estou comentando o banco de dados pois a gente não tem um DEFINIDO por enquanto, e tbm para não dar conflito com o node na hora de iniciar===========

connection
    .authenticate()
    .then(()=>{
        console.log('Conectado ao Banco')
    })
    .catch((erro)=>{
        console.log(erro)
    })
*/
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bordyParser.urlencoded({extended: true})); 
app.use(bordyParser.json()); 


consign()
    .include('./models')
    .include('./controllers/rotas')
    .into(app);
const porta=8182;
app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}...`)
})