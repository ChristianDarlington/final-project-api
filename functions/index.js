const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getMovies } = require("./src/Movies");
const admin = require('firebase-admin')
const creds = require('./credentials.json')

const app = express()
app.use(cors())
app.use(express.json())

function connectDB() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    })
  }
  return admin.firestore()
}



app.get('/movies/:genre/:decade', getMovies)
app.get('/movies', getMovies)

app.get('/genres', (req, res) =>
  {
    const db = connectDB();
    db.collection('genres')
    .get()
    .then(allGenres => {
      let genre = allGenres.docs.map(doc => doc.data())
      res.json(genre)

    })
});

// app.use('/movies', APIRouter)
exports.app = functions.https.onRequest(app)




