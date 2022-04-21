
function findAll(res, rota, table, orderCampo, ordem = 'DESC', includeTable) {
    consulta = {}
    if (includeTable) {
        let include = { include: [{ model: includeTable }] }
        consulta.push(include)
    }
    query = { raw: true, order: [[orderCampo, ordem]] }
    consulta.push(query)
    table.findAll(consulta)
        .then(resp => {
            res.render(rota, { dados: resp })
        })
        .catch(erro => {
            console.log('Catch Get')
            console.log(erro)
        })
}
module.exports = findAll


function destroy(id, campoPk, rota, table, res) {
    table.destroy({ where: { campoPk: id } })
        .then(() => {
            res.render(rota)
        })
        .catch(erro => {
            console.log('Catch delete')
            console.log(erro)
        })
}
module.exports = destroy

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

function update(id, campoPk, dados, rota, table, res) {
    table.update(dados, { where: { campoPk: id } })
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
module.exports = buscar





function create(dados, rota, table, res) {
    table.create(dados)
        .then(
            res.redirect(rota)
        ).catch(erro => {
            console.log('Catch post')
            console.log(erro)
        })
}
module.exports = create