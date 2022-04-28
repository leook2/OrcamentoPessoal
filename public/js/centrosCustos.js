
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

function accEdit(url, id){
    console.log(id)
    console.log(url)

    axios.put(`${url}?id=${id}`)
    .then(resp=>{
      alert('Registro Atualizado com sucesso!')
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
