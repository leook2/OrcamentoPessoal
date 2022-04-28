const Tipos        = require('../../models/Tipos')()
const CentrosCustos = require("../../models/CentrosCustos")()
const query         = require('../funcoes/funcoesRotas')
const Transacoes    = require('../../models/Transacoes')()


module.exports = function(app){
    
    app.post('/centroscustos',  (req, res)=>{
        let dados={idTipo:req.body.idtipo,nomeCentroCusto:req.body.nome}
        query.create(dados, CentrosCustos, res)
         
    })
    app.get('/centroscustos', (req, res)=>{
        query.findAll(res, 'centrosCustos', CentrosCustos, 'idCentroCusto', 'DESC', Tipos)
    });
    
    app.put('/centroscustos',  (req, res)=>{
        //Construir os parâmetros de forma apriada

        query.update(id, campoPk, dados, rota, CentrosCustos, res)
        //updadte(res, '/relatorio', Transacoes, 'idCentroCusto', 'DESC', CentrosCustos) 
    })


    app.delete('/centroscustos',  (req, res)=>{
        let id = parseInt(req.query['id'])
        console.log(id)
        query.destroy(id, 'idCentroCusto', CentrosCustos, res) 
    })

    
  
        
    
    

};



























/*{
    app.get('/centroscustos', (req, res)=>{
        CentrosCustos.findAll({include:[{model:Tipos}]}, 
            {raw:true,order:[['idCentroCusto', 'DESC']]})
            .then(resp =>{
                res.render("centrosCustos", {cCustos:resp});
            })
            .catch(erro=>{
                console.log('Catch Post')
                console.log(erro)
            })
        
    });
    app.post('/centroscustos/create',(req, res)=>{
        let nome=req.body.nome;
        let idTipo=parseInt(req.body.idtipo);
        CentrosCustos.create({
            nomeCentroCusto:nome,
            idTipo:idTipo
        }).then(
            res.redirect('/centroscustos')
        ).catch(erro=>{
            console.log('Catch Post')
            console.log(erro)
        })
    })
    app.get('/centroscustos/buscar/:id', (req, res)=>{
        let id= parseInt(req.params.id)
        CentrosCustos.findByPk(id).then(resp =>{
            res.json(resp)
        }).catch(()=>{
            res.status(500)
            res.json({erro:'Dados não encontrados'})
        })
    })
    app.post('/centroscustos/update/', (req, res)=>{
        let id= parseInt(req.body.idCentroCusto)
        let nome= req.body.nome;
        let idtipo = parseInt(req.body.idtipo)
        CentrosCustos.update({nomeCentroCusto:nome,idTipo: idtipo},
        {where:{idCentroCusto:id}})
        .then((resp)=>{
            res.redirect("/centroscustos")
        })
        .catch((erro)=>{
            console.log(erro)
        })
    })

    app.delete('/centroscustos/deletar?id', (req,res)=>{
        let id= parseInt(req.params.id)
        console.log(id)
        query.destroy(id, 'idTransacao', '/centroscustos', Transacoes, res)
    })
}*/