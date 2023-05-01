const express = require('express');

const server = express();

const data = require('./Movie Data/data.json')

const PORT = 3000;

server.get('/',(req, res)=>{

  res.send({"title": data.title, "poster_path": data.poster_path, "overview": data.overview,})

})


server.get('/favorite',(req, res)=>{

  res.send("Welcome to Favorite Page")
  
  });


  server.get('*', (req, res) => {
    res.status(404).send({
      "status": 404,
      "responseText": "Sorry, page not found error"
    });
    res.status(500).send({
      "status": 500,
      "responseText": "Sorry, internal server error"
    });
  });


  server.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}: I'm ready`)
})