

const express = require('express');
const server = express();
const data = require('./Movie Data/data.json')
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const apKey = process.env.APIkey;

const PORT = 3003;






server.get('/',(req, res)=>{

  res.send({"title": data.title, "poster_path": data.poster_path, "overview": data.overview})

})


//trending
server.get('/trending', trendingMov);
//search
server.get('/search', searchMov);
//What movies are in theatres?
server.get('/movies-theatres', theatresMov);
//What are the most popular movies?
server.get('/movies-popular', popularMov);

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



server.listen(PORT, () => {
  console.log(`Listening on ${PORT}: I'm ready`)
})