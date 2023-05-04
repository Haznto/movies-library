"use strict"
const data = require('./data.json')
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()) // not necessary now. But remember it when used post method and getting info JSON from client.

app.use(cors())
app.get('/', getLibaray )
app.get('/favorite', getFavorite )
app.get('/error', (req,res)=> { // testing error handler! go to the route so it shows
    chicken.fly()
})

app.use('*', notFoundPage)
app.use(function(err,req,res,next){
    console.log("ERROR 500")
    res.status(500).json({
        "status": 500,
        "responseText": "Sorry, something went wrong"
    })  
    // next(err) no other errorhandling middlewares to pass to .
    
})

function notFoundPage(req,res) {
    res.status(404).json({
        "status": 404,
        "responseText": "Sorry, Page Not Found"
    })
}
function getLibaray(req,res) {
    let movie = new Movie (data.title,data.genre_ids,data.original_language,data.original_title,data.poster_path,data.video,data.vote_average,data.overview,data.release_date,data.vote_count,data.id,data.adult,data.backdrop_path,data.popularity,data.media_type)
    res.status(200).json(movie)
}
function getFavorite (req,res){
    res.send("Welcome to Favorite Page")
}

function Movie(title,genre_ids,original_language,original_title,poster_path,video,vote_average,overview,release_date,vote_count,id,adult,backdrop_path,popularity,media_type){
    this.title = title;
    this.genre_ids = genre_ids;
    this.original_language = original_language;
    this.original_title = original_title;
    this.poster_path = poster_path;
    this.video = video;
    this.vote_average = vote_average;
    this.overview = overview;
    this.release_date = release_date;
    this.vote_count = vote_count
    this.id = id;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.popularity = popularity;
    this.media_type = media_type; // !!!!!!!!Waleed told us to include all the data inside our response!!!!!!!
    // Movie.allMovies.push(this); Not needed now cause we have a single data obejct
}
// Movie.allMovies = [];Not needed now cause we have a single data obejct
app.listen(3000,() => console.log('ran successfully'))