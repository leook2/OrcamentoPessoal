const Sequelize = require('sequelize');

const CentrosCustos = require('../../models/CentrosCustos')()
const Transacoes = require('../../models/Transacoes')()
const funcoes = require('../funcoes/funcoesRotas')(Sequelize)

module.exports = function(app){
    app.get('/relatorio', (req, res)=>{
        res.render('relatorio')
    })

    app.get('/relatorio/dados', (req, res)=>{
        funcoes.findAll(Sequelize, res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos)
        //findAll(res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos)
    })

}