const admin = require('firebase-admin')
const creds = require('../credentials.json')

function connectDB() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    })
  }
  return admin.firestore()
}

exports.getMovies = (req, res) => {
  console.log('We are getting it')
  // /movies/:genre/:decade
  const genre = req.params.genre
  if (isNaN(genre)) {
    res.send("that's not a valid genre")
    return;
  }
  const decade = req.params.decade
  if (isNaN(decade)) {
    res.send("that's not a valid decade")
    return;
  }
  const db = connectDB()
  console.log(`Genre:${genre} decade:${decade}`)
  const decadeStartDate = new Date(`${decade}-1-1`); // 1980-01-01
  const decadeEndDate = new Date(`${Number(decade)+9}-12-31`); // 1989-12-31
  db.collection('movies-2')
    .where('release_date', '>', decadeStartDate)
    .where('release_date', '<', decadeEndDate)
    // .where('popularity', '>', 10)
    // .orderBy('popularity', 'desc')
    .limit(100)
    .get()
    .then(allMovies => {
      let movies = allMovies.docs.map(doc => doc.data())
      if (genre != "0") // if "0" do NOT filter by genre
      {
        movies = movies.filter(movie => movie.genre_ids.includes(Number(genre)))
      } else {
        // Oh! You DON'T want to filter. That's cool. I won't do anything to the list (I won't filter it)
      }

      // Randomize the list and return up to 6.
      movies = movies.sort(() => (Math.random() > .5) ? 1 : -1); // Math.random() returns between 0-1 and just use for sort.

      // return top 6
      movies = movies.slice(0,4);


      res.json(movies)
      //  console.log('movies.',movies)
    })
    .catch(err => console.log(err))
}

exports.getAllMovies = (req, res) => {
  console.log('We are getting it')
  // /movies
  const db = connectDB()
 
  db.collection('movies-2')
    .limit(50)
    .get()
    .then(allMovies => {
      let movies = allMovies.docs.map(doc => doc.data())

      // Randomize the list and return up to 6.
      movies = movies.sort(() => (Math.random() > .5) ? 1 : -1); // Math.random() returns between 0-1 and just use for sort.

      // return top 6
      movies = movies.slice(0,4);


      res.json(movies)
      //  console.log('movies.',movies)
    })
    .catch(err => console.log(err))
}
