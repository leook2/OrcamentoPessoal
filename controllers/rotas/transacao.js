const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos         = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')

module.exports = function(app){
    
    app.get('/transacao',  (req, res)=>{
        query.findAll(res, 'transacao', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
    })

      app.get("/transacao/teste", (req, res) => {
        /*Transacoes.sum('valorTransacao', {where: {idCentroCusto:1}})
          .then(resp => {
            console.log(resp)
            res.json(resp)
          })*/

          Transacoes.findAll({
            attributes:['idCentroCusto',
            [Sequelize.fn('sum', Sequelize.col('valorTransacao')), 'SomaValor']
          ],
          include:[{model:CentrosCustos, attributes:{exclude:['idCentroCusto', 'idTipo']},
                  include:[{model:Tipos}]}],
          group:'idCentroCusto',
          //raw:true
          })
          .then(cCusto=>{
            Transacoes.findAll({
              attributes:['idCentroCusto',
              [Sequelize.fn('sum', Sequelize.col('valorTransacao')), 'SomaValor']
            ],
            include:[{model:CentrosCustos, attributes:{exclude:['idCentroCusto', 'nomeCentroCusto', 'idTipo']},
                    include:[{model:Tipos}]}],
            group:'nomeTipo',
            //raw:true
            })
            .then(tipos =>{
              console.log({centrosCustos:cCusto, tipos:tipos})
              res.json({centrosCustos:cCusto, tipos:tipos})
            })
          })
      });

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