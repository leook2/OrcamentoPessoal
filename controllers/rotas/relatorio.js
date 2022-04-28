const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos         = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')

module.exports = function(app){
    
    app.get('/relatorio',  (req, res)=>{
        query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
        //findAll(res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos) 
    })

      app.get("/relatorio/teste", (req, res) => {
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

      app.post('/relatorio', (req, res)=>{
        let dados = {
          descricaoTransacao: req.body.a,
          valorTransacao: req.body.valor,
          idCentroCusto: req.body.tipo
        }
        console.log(dados)
        query.create(dados, Transacoes, res)
      })

      app.delete('/relatorio', (req, res)=>{
        const id = req.query['id']
        query.destroy(id, 'idTransacao', Transacoes, res)
      })

      app.get('/relatorio/buscar', (req, res)=>{

        query.buscar()
      })


}