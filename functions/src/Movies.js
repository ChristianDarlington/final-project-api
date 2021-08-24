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
    res.send("That's not a valid genre")
    return;
  }
  const decade = req.params.decade
  if (isNaN(decade)) {
    res.send("That's not a valid decade")
    return;
  }
  const db = connectDB()
  console.log(`Genre:${genre} decade:${decade}`)
  db.collection('movies-2')
    .get()
    .then(allMovies => {
      let movies = allMovies.docs.map(doc => doc.data())
      if (genre != "0") // if "0" do NOT filter by genre
      {
        movies = movies.filter(movie => movie.genre_ids.includes(Number(genre)))
      } else {
        // Oh! You DON'T want to filter. That's cool. I won't do anything to the list (I won't filter it)
      }
      if (decade != "0") // if "0" then do NOT filter by decade
      {
        //release_date
        movies = movies.filter(movie => {
          // example decode is 2000
          let releasedate = new Date(movie.release_date); // 1986-03-07
          let decadeStartDate = new Date(`${decade}-1-1`); // 1980-01-01
          let decadeEndDate = new Date(`${Number(decade)+9}-12-31`); // 1989-12-31
          //console.log(`${movie.release_date} ${(releasedate >= decadeStartDate)} ${(releasedate <= decadeEndDate)}`)
          if (   
              (releasedate >= decadeStartDate) && 
              (releasedate <= decadeEndDate )
              )
          {
              return true; // yes the releaseDate is between the start of the decade and the end of the decade
          } else {
              return false; // NOPE! filter out this movie.
          }

        } )
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
