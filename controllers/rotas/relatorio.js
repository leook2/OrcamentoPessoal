const { Op }        = require('sequelize');
const Sequelize     = require('sequelize');

const CentrosCustos = require('../../models/CentrosCustos')()
const idTipo        = require('../../models/Tipos')()
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
        try {
          const resultado = Transacoes.findAll({
            attributes: ['valorTransacao', [Sequelize.fn('sum', Sequelize.col('ValorTrans')), 'total'],
            [Sequelize.fn('avg', Sequelize.col('score')), 'average']],
            group : ['user.oid'],
            raw: true
           });
          console.log(...resultado)
          res.send(resultado);
        } catch (err) {
          res.send(err);
        }
      });

}

/*<!--     --> */