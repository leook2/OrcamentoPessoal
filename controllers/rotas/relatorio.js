module.exports = function(app){
    app.get('/relatorio', (req, res)=>{
        res.render('relatorio')
    })
}