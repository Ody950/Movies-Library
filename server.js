

const express = require('express');
const server = express();
const data = require('./Movie Data/data.json')
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const pg = require('pg');


const apKey = process.env.APIkey;
const client = new pg.Client(process.env.DATABASE_URL)
const PORT = 3000;
server.use(express.json())





//trending
server.get('/trending', trendingMov);
//search
server.get('/search', searchMov);
//What movies are in theatres?
server.get('/movies-theatres', theatresMov);
//What are the most popular movies?
server.get('/movies-popular', popularMov);

//post
server.post('/getMovies', addMovie);
//SQL
server.get('/getMovies', fromDatabase);


//UPDATE
server.put('/UPDATE/:id', movieUpdat);
//delete
server.delete('/DELETE/:id', deletMovie);
//get movie 
server.get('/getMovie/:id', getMov)






//Lab14

server.get('/',(req, res)=>{

  res.send({"title": data.title, "poster_path": data.poster_path, "overview": data.overview})

})

function trendingMov(req, res) {

  let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apKey}`

  axios.get(url)

    .then(result => {
      let mapResults = result.data.results.map(item => {

        let singleMovie = new MoviesDa(item.id, item.title, item.release_date, item.poster_path, item.overview);
        return singleMovie;
      })
      res.send(mapResults)
    })
    .catch((error)=>{
      console.log('sorry you have something error',error)
      res.status(500).send(error);})
};
function searchMov(req, res) {

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apKey}&query=${"Shark Side of the Moon"}`

  axios.get(url)

    .then(result => {
      let mapResults2 = result.data.results.map(item => {

        let singleMovie = new MoviesDa(item.id, item.title, item.release_date, item.poster_path, item.overview);
        return singleMovie;
      })
      res.send(mapResults2)
    })
    .catch((error)=>{
      console.log('sorry you have something error',error)
      res.status(500).send(error);})
};
//What movies are in theatres?
function theatresMov(req, res) {

  let url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${apKey}`

  axios.get(url)

    .then(result => {
      let mapResults3 = result.data.results.map(item => {

        let theatresMovie = new MoviesDa(item.id, item.title, item.release_date, item.poster_path, item.overview);
        return theatresMovie;
      })
      res.send(mapResults3)
    })
    .catch((error)=>{
      console.log('sorry you have something error',error)
      res.status(500).send(error);})
};
//What are the most popular movies?
function popularMov(req, res) {

  let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apKey}`

  axios.get(url)

    .then(result => {
      let mapResults4 = result.data.results.map(item => {

        let popularMovie = new MoviesDa(item.id, item.title, item.release_date, item.poster_path, item.overview);
        return popularMovie;
      })
      res.send(mapResults4)
    })
    .catch((error)=>{
      console.log('sorry you have something error',error)
      res.status(500).send(error);})
};








//Lab15
//post
function addMovie(req, res){
const movieData15 = req.body;
const sql = `INSERT INTO moveiAdd (title, comments)
    VALUES ($1, $2);`
    const values = [movieData15.title , movieData15.comments]; 
    client.query(sql,values)
    .then(data=>{
        res.send("The data has been added successfully");
    })
    .catch((error)=>{
        errorHandler(error,req,res)
    })

}


//SQL
function fromDatabase(req, res){
  const sql2 = `SELECT * FROM moveiAdd`;
  client.query(sql2)
  .then((data1)=>{
    res.send(data1.rows);
  })
  .catch((error)=>{
    console.log('sorry you have something error',error)
    res.status(500).send(error);})
}




//Lab16

function movieUpdat(req, res) {

  const {id} = req.params;

  const sql = `UPDATE moveiAdd SET comments = $1 WHERE id=${id};`;
  const {comments} = req.body;
  const values = [comments];
  client.query(sql, values)
  .then((upd) =>{
  res.send("The data has been updated successfully")

  })
  .catch((error)=>{
    errorHandler(error,req,res)
})
}


function deletMovie(req, res){

const {id}= req.params;
const sql = `DELETE FROM moveiAdd WHERE id=${id};`;

client.query(sql)
.then((delM)=>{
res.send("The data has been deleted successfully")

})
.catch((error)=>{
  errorHandler(error,req,res)
})
}


function getMov(req, res){
  const {id}= req.params;
  const sql2 = `SELECT * FROM moveiAdd WHERE id=${id};`;
  client.query(sql2)
  .then((data1)=>{
    res.send(data1.rows);
  })
  .catch((error)=>{
    console.log('sorry you have something error',error)
    res.status(500).send(error);})
}




//second way to get request to get a specific movie from the database by using query      <<<<<<<<<<


// server.get('/getMov', getMov)
// function getMov(req, res){
//   const {id}= req.query;
//   const sql2 = `SELECT * FROM moveiAdd WHERE id=${id};`;
//   client.query(sql2)
//   .then((data1)=>{
//     res.send(data1.rows);
//   })
//   .catch((error)=>{
//     console.log('sorry you have something error',error)
//     res.status(500).send(error);})
// }








server.get('*', (req, res) => {
  res.status(404).send({
    "status": 404,
    "responseText": "Sorry, page not found error"
  });
});



function MoviesDa(id, title, release_date, poster_path, overview, ) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}


client.connect()
.then(()=>{

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
  })

})
