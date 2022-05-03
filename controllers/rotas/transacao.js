const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos         = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')

module.exports = function(app){
    
    app.get('/transacao',  (req, res)=>{
        query.findAll(res, 'transacao', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
    })

      app.post('/transacao', (req, res)=>{
        let dados = {
          descricaoTransacao: req.body.descricao,
          valorTransacao: req.body.valor,
          idCentroCusto: req.body.tipo
        }
        console.log(dados)
        query.create(dados, Transacoes, res)
      })

      app.delete('/transacao', (req, res)=>{
        const id = req.query['id']
        query.destroy(id, 'idTransacao', Transacoes, res)
      })

      app.get('/transacao/buscar', (req, res)=>{
        const id = req.query['id']
        console.log(id)

        query.buscar(res, id, Transacoes)
      })

      app.put('/transacao',  (req, res)=>{
               
        const id = req.body.id
        let dados = {
          descricaoTransacao: req.body.descricao,
          valorTransacao: req.body.valor,
          idCentroCusto: req.body.tipo
        }
        query.update(id, 'idTransacao', dados, Transacoes, res)
        
    })

}