
function accDelete(url, id){
    console.log(id)
    console.log(url)

    axios.delete(`${url}?id=${id}`)
    .then(resp=>{
        console.log(resp)
        actionGet(url)
        alert('Registro excluido com sucesso!')
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


