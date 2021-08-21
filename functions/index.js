const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getMovies } = require("./src/Movies");

const app = express()
app.use(cors())
app.use(express.json())

app.get('/test', (req,res) => {
  res.send('🍿 Movie Finder')
})

app.get('/movies', (req, res) => {
  for(let i=0; i < 2; i++){
    getMovies(i)
  }
  res.send('OK')
})
// 1. Pull movies from firebase
// 2. URL parameters or query string should let you pass in genre and decade
app.get('/movies/:genre/:decade', getMovies)


exports.app = functions.https.onRequest(app)




