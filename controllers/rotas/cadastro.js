module.exports = function(app){
    app.get('/cadastro', (req, res)=>{
        res.render('cadastro')
    })
}