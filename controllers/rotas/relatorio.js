const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos         = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')
const {autenticar}=require('../auth')

module.exports = function(app){

    app.get('/relatorio',autenticar, (req, res)=>{
        query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
    })
}