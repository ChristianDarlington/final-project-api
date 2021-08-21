const admin = require('firebase-admin')
const creds = require('../credentials.json')

function connectDB(){
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    })
  }
  return admin.firestore()
}

exports.getMovies = (req, res) => {
  // /movies/:genre/:decade
  const genre = req.params.genre
  const decade = req.params.decade
  const db = connectDB

  db.collection('events')
    .get()
    .then(allMovies => {
      allMovies.docs.map(doc => {
        console.log(doc.data())
      })
      res.send('got all movies')
    })
    .catch(err => console.log(err))
}

