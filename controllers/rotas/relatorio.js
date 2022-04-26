const { Op }        = require('sequelize');
const Sequelize     = require('sequelize');
const CentrosCustos = require('../../models/CentrosCustos')()
const Tipos        = require('../../models/Tipos')()
const Transacoes    = require('../../models/Transacoes')()
const query         = require('../funcoes/funcoesRotas')

module.exports = function(app){
    
    app.get('/relatorio',  (req, res)=>{
        query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
        //findAll(res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos) 
    })

    app.get('/relatorio/filter', (req, res)=>{
     query.findAll(res, 'relatorio', Transacoes, 'idTransacao', 'DESC', CentrosCustos)
      const b= CentrosCustos.findAll({
        where: {idTipo: '2'} 
      })
      console.log(b)
  if (b === null) {
    console.log('Not found!');
  } else {
    console.log(b.idTipo); // 'My Title'
  }
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

}

/*<!--     --> */