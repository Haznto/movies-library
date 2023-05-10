"use strict"
// IMPORTING DATA
const data = require('./data.json')
const express = require('express');
const cors = require('cors');
const axios  = require('axios');
const app = express();
require('dotenv').config();
app.use(express.json()) // not necessary now. But remember it when used post method and getting info JSON from client.
const pg = require('pg');
const client = new pg.Client(process.env.DBURL)
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

//Executing paths
app.use(cors())
app.get('/', getLibaray )
app.get('/favorite', getFavorite )
app.get('/error', (req,res)=> { // testing error handler! go to the route so it shows
    chicken.fly()
})
app.get('/trending', handleTrendingMovies) // rout 1
app.get('/search',handleSearch)  // rout 2
app.get('/upcoming',handleUpcoming)  // rout 3
app.get('/top-rated',handleTopRated)  // rout 4
app.get('/getMovies',handleDbMovies)
app.post('/addMovie',handleAddingMovie)
app.use('*', notFoundPage)
app.use(errorHandling)
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//Functions
function errorHandling(err,req,res,next){
    
        console.log("ERROR 500")
        res.status(500).json({
            "status": 500,
            "responseText": err.message || err
        })  
        // next(err) no other errorhandling middlewares to pass to .
        
    
}
function notFoundPage(req,res) {
    res.status(404).json({
        "status": 404,
        "responseText": "Sorry, Page Not Found"
    })
}
  function getLibaray(req,res) {
    let movie = new Movie (data.title,data.poster_path,data.overview,data.release_date,data.id)
    res.status(200).json(movie)
}
function getFavorite (req,res){
    res.send("Welcome to Favorite Page")
}
async function handleTrendingMovies(req,res) {
    let axiosData = await axios.get(`${process.env.APISITE}trending/all/week?api_key=${process.env.APIKEY}`);
    Movie.allMovies = []
    axiosData.data.results.map(movie => new Movie(movie.name,movie.title,movie.poster_path,movie.overview,movie.release_date,movie.first_air_date,movie.id))
    res.status(200).json({
        trending : Movie.allMovies
    })

}
function handleSearch(req,res) {
    const searchMovie = req.query.query
    console.log(searchMovie)
    let axiosSearchData = axios.get(`${process.env.APISITE}search/movie?api_key=${process.env.APIKEY}&query=${searchMovie}`)
    Movie.allMovies = []
    // axiosSearchData.data.results.map(movie => new Movie(movie.name,movie.title,movie.poster_path,movie.overview,movie.release_date,movie.first_air_date,movie.id))
    axiosSearchData.then(result =>{
        result.data.results.map(movie => new Movie(movie.name,movie.title,movie.poster_path,movie.overview,movie.release_date,movie.first_air_date,movie.id))
        if (searchMovie === undefined) {
            res.status(200).json({
                Message: "pass your search in the url after the word (search) as '?query=<the Name of your movie without the angle signs> , if your search is composed of more than one word seperate it with + sign' ",
                Example: "http://localhost:3000/search?query=naruto"
            })
        }
        else {
            res.status(200).json({
                ResultOfSearch: Movie.allMovies
            })
        }
    });
}
async function handleUpcoming(req,res) {
    const axiosData = await axios.get(`${process.env.APISITE}movie/upcoming?api_key=${process.env.APIKEY}`);
    Movie.allMovies = []
    axiosData.data.results.map(movie => new Movie(movie.name,movie.title,movie.poster_path,movie.overview,movie.release_date,movie.first_air_date,movie.id))
    res.status(200).json({
        Upcoming : Movie.allMovies
    })
}
async function handleTopRated(req,res) {
    const axiosData = await axios.get(`${process.env.APISITE}movie/top_rated?api_key=${process.env.APIKEY}`);
    Movie.allMovies = []
    axiosData.data.results.map(movie => new Movie(movie.name,movie.title,movie.poster_path,movie.overview,movie.release_date,movie.first_air_date,movie.id))
    res.status(200).json({
        Upcoming : Movie.allMovies
    })
}
function handleDbMovies(req,res){
    const sql = 'select * from movies_list';
    client.query(sql).then(selectedMovies =>{
        res.json({
            count: selectedMovies.rowCount,
            movies: selectedMovies.rows
        })
    })

}
function handleAddingMovie(req,res) {
 const userInput = req.body;
 console.log(userInput)
 const sql = `insert into movies_list(movie_id,title,overview,poster_path) values ($1,$2,$3,$4) returning *`;
 const handleSqlInjection = [userInput.movie_id,userInput.title,userInput.overview,userInput.poster_path]
 client.query(sql,handleSqlInjection).then(addedByUser =>{
    res.status(201).json(addedByUser.rows)
 })
}
function Movie(name,title,poster_path,overview,release_date,first_air_date,id){
    this.name = name;
    this.id = id;
    this.title = title;   
    this.release_date = release_date;
    this.first_air_date = first_air_date;
    this.poster_path = poster_path;    
    this.overview = overview;    
    Movie.allMovies.push(this)
}
Movie.allMovies = []
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------


client.connect().then(()=>{
    app.listen(process.env.PORTAL,() => console.log('ran successfully'))
})
