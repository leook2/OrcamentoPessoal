
function findAll(res, rota, table, orderCampo, ordem = 'DESC', includeTable) {
    let consulta = []
    if (includeTable) {
        let include = {include: [{ model: includeTable }] }
        consulta.push(include)
    }
    query = { raw: true, order: [[orderCampo, ordem]] }
    consulta.push(query)
    console.log(...consulta)
    table.findAll(...consulta)
        .then(resp => {
            console.log(resp)
            res.render(rota, { dados: resp })
        })
        .catch(erro => {
            console.log('Catch Get')
            console.log(erro)
        })
}
exports.findAll = findAll


function destroy(id, campoPk, table, res) {
    let keyId = {}
    keyId[campoPk]=id
    table.destroy({ where: keyId })
        .then((resp) => {
            res.json(resp)
        })
        .catch(erro => {
            console.log('Catch delete')
            console.log(erro)
        })
}
exports.destroy = destroy

/*
app.post('/centroscustos/update', (req, res) => {
    console.log(req.body)
    let id = parseInt(req.body.id)
    let nome = req.body.nome;
    let idtipo = parseInt(req.body.idtipo)
    CentrosCustos.update({
        nomeCentroCusto: nome,
        idTipo: idtipo
    }, { where: { idCentroCusto: id } })
        .then((resp) => {
            console.log(resp)
            res.redirect("/centroscustos")
        })
        .catch((erro) => {
            console.log(erro)
        })
})
*/

function update(id, campoPk, dados, rota, table, res) {
    let keyId = {}
    keyId[campoPk]=id
    table.update(dados, { where: keyId })
}

function buscar(id, res, table,) {
    table.findByPk(id)
        .then(resp => {
            res.json(resp)
        })
        .catch(() => {
            res.status(500)
            res.json({ erro: 'Dados não encontrados' })
        })
}
exports.buscar = buscar


function create(dados, table, res) {
    table.create(dados)
        .then(resp=>{
            console.log(resp) 
            res.json(resp)
           
        }).catch(erro => {
            console.log('Catch post')
            console.log(erro)
        })
}
exports.create = create 

