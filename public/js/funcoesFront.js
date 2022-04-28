
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
    form.idtipo.value = cCusto.idTipo
    form.nome.focus()
    console.log(form)
}


function actionPost(url,dados){
  console.log(url, dados)
  axios.post(url, dados)
  .then(res =>{
      if (res.status==200){
          alert("Dados gravados com sucesso!")
          window.location.reload()
      } else{
          console.log(res.status)
      }
  })
  .catch(erro=>{
      console.log(erro)
  });
}

function actionPut(url,dados){
  console.log(url, dados)
   axios.put(url,dados)        
   .then(res =>{
       if(res.status==200){
           alert("Dados atualizados com sucesso!")
           window.location.reload()
       }else{
           console.log(res.status)
       }             
   })
   .catch(erro=>{
       console.log(erro)
   });
}

function gravarTransacao(){
  const form = document.getElementById('form')
  const dados = {
    a:    form.descricao.value,
    valor:form.valor.value,
    tipo: form.tipo.options[tipo.selectedIndex].value
  }
  console.log(dados)

  if(form.id.value === ''){
    actionPost('http://localhost:8182/relatorio', dados)
  }
}