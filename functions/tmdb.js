const admin = require('firebase-admin')
const fetch = require('node-fetch')
const creds = require('./credentials.json')

const apikey = `7432733ca0b97edebd21bdd62d35ddd5`

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getMovies = (startDate, endDate, page, genre) => {
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${genre}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=primary_release_date.desc&with_original_language=en`;
  //const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=primary_release_date.desc&with_original_language=en&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=${page}`; // &page=10
    console.log(`fectching page: ${page}`)
    console.log(`waited fectching page: ${page}`)

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&with_original_language=en&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=${page}&with_genres=${genre}`; // &page=10
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
        // connect to db
        total_pages = data["total_pages"]        
        admin.initializeApp({
          credential: admin.credential.cert(creds),
        })
        const db = admin.firestore()
        // now we can loop through each movie and add it to our movies collection
        data.results.forEach(movie => {
          // console.log('Adding movie ' + movie.title)
          db.collection('movies-2').add(movie)
        })
      })
}

const getMoviesAllPages = (startDate, endDate, page, genre) => {

  while(page < 100000){
    setTimeout( getMovies(startDate, endDate, page, genre), 500)
  }

}


let PageToDownload = process.argv[2];
console.log("Fetching page",PageToDownload)
getMovies('2020-01-01', '2021-01-01',PageToDownload, 10749);



const getGenres = () => {
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${genre}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=primary_release_date.desc&with_original_language=en`;
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=primary_release_date.desc&with_original_language=en&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=10`;
  const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7432733ca0b97edebd21bdd62d35ddd5&language=en-US'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // connect to db
      admin.initializeApp({
        credential: admin.credential.cert(creds),
      })
      const db = admin.firestore()
      // now we can loop through each movie and add it to our movies collection
      data.genres.forEach(movie => {
        // console.log('Adding movie ' + movie.title)
        db.collection('genres').add(movie)
      })
    })
}
// getGenres()



// exports.getMovies
