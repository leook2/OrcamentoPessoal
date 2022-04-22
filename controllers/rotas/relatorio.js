const Sequelize = require('sequelize');

const CentrosCustos = require('../../models/CentrosCustos')()
const Transacoes = require('../../models/Transacoes')()
const query = require('../funcoes/funcoesRotas')

module.exports = function(app){
    app.get('/relatorio', (req, res)=>{
        res.render('relatorio')
    })

    app.get('/relatorio/dados', (req, res)=>{
        query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
        //findAll(res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos)
    })

}