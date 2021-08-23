const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getMovies } = require("./src/Movies");

const app = express()
app.use(cors())
app.use(express.json())



app.get('/movies/:genre/:decade', getMovies)

app.get('/genres', (req, res) =>
  {
    db.collection('genres')
    .get()
    .then(allGenres => {
      let genre = allGenres.docs.map(doc => doc.data())
      res.json(genre)

    })
});

// app.use('/movies', APIRouter)
exports.app = functions.https.onRequest(app)




