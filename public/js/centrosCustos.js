
function accDelete(url, id){
    console.log(id)
    console.log(url)

    axios.delete(`${url}?id=${id}`)
    .then(resp=>{
        console.log(resp)
        alert('Registro excluido com sucesso!')
        window.location.reload()
    })
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
}

function editar(id){
    console.log(id)

    axios.get(`${url}/buscar?id=${id}`)
    .then(resp=>{
      console.log(resp.data)
      carregarDados(resp.data)
  })
  .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
}

function carregarDados(cCusto){
    exibirModal()
    console.log(cCusto)
    form.idCentroCusto.value = cCusto.idCentroCusto
    form.nome.value = cCusto.nomeCentroCusto
    form.nome.focus()
    console.log(form)
}
/*
function editar(id){
  event.preventDefault()
  const form = document.getElementById('form')
  exibirModal()
  let url = 'http://localhost:8182/centroscustos'
  axios.put(url)
  .then(resp=>{resp.json()})
  .then(cCusto=>{
    console.log(cCusto)
    form.idCentrocusto.value = cCusto.idCentrocusto
    form.nome.value = cCusto.nomeCentroCusto
    form.nome.focus()
  }).catch(err=>{
    console.log(`Error: ${err}`)
  })

}
*/
/*
function editar(id){
  event.preventDefault()
  exibirModal()
  let url = 'http://localhost:8182/centroscustos/buscar/'+id
  fetch(url).then((resp)=>resp.json())
        .then(cCusto=>{
            console.log(cCusto)
            form.idCentroCusto.value = cCusto.idCentroCusto;
            form.idtipo.value=cCusto.idTipo;
            form.nome.value=cCusto.nomeCentroCusto;
            form.nome.focus()
        })

  }
*/