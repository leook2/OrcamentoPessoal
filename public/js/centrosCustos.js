function accDelete(url, id){
    console.log(url);
    console.log(id)

    axios.delete(`${url}?id=${id}`)
    .then(resp=>{
        console.log(resp)
        actionGet(url)
        alert('Registro excluido com sucesso!')
    })
    .catch(err=>{
        console.log(`Error: ${err}`)
    })
}
