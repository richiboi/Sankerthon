const axios = require("axios");

axios({
    "method":"GET",
    "url":"https://unogs-unogs-v1.p.rapidapi.com/api.cgi",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"unogs-unogs-v1.p.rapidapi.com",
    "x-rapidapi-key":"4676fa55f1msh89b74d37392c25cp1e15a4jsnc343d246a136",
    "useQueryString":true
    }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })