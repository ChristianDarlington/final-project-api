const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getMovies, getAllMovies } = require("./src/Movies");

const app = express()
app.use(cors())
app.use(express.json())


app.get('/movies/:genre/:decade', getMovies)
app.get('/movies', getAllMovies)

// app.use('/movies', APIRouter)
exports.app = functions.https.onRequest(app)




