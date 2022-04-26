const req           = require("express/lib/request");
const query         = require('../funcoes/funcoesRotas')

const Tipos         = require("../../models/Tipos")();
const CentrosCustos = require("../../models/CentrosCustos")()
const Transacoes    = require('../../models/Transacoes')()

module.exports = function(app){
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
}