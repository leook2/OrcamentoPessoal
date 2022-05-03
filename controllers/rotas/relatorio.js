const Sequelize     = require('sequelize')
const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos         = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')
const {autenticar}=require('../auth')

module.exports = function(app){

    app.get('/relatorio',autenticar, (req, res)=>{
        query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
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
              res.render('relatorio',{centrosCustos:cCusto, tipos:tipos})
            })
          })
      });
}

