const { response } = require('express');
const admin = require('firebase-admin');
const { app } = require('firebase-functions/v1');
const fetch = require('node-fetch')
const creds = require('./credentials.json')

const apikey = `7432733ca0b97edebd21bdd62d35ddd5`;

const getMovies = (startDate = '2000-01-01', endDate = '2000-03-31') => {
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${genre}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=primary_release_date.desc&with_original_language=en`;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=primary_release_date.desc&with_original_language=en&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=10`;
  fetch(url)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      // connect to db
      admin.initializeApp({
        credential: admin.credential.cert(creds),
      })
      const db = admin.firestore()
      // now we can loop through each movie and add it to our movies collection
      data.results.forEach(movie => {
        console.log('Adding movie '+ movie.title)
        db.collection('movies').add(movie)
      })
    })
}
getMovies('1999-01-01', '2000-01-01')


// const getGenres = () => {
//   const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`;
//   return fetch(url)
//   .then((response) => response.json());
// };
// getGenres()

// function getMovies(page){
//   fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`)
//   .then(response => response.json())
//   .then(movieResults => {
//     const bulkMovies = movieResults.results.name(movies => {
//       return{
//         name: movie.name,
//         adult: movie.adult,
//         video: movie.video
//       }
//     })
//     movie.insertMany(bulkMovies)
//   })
//   .catch(er => console.log(err))
// }

// getMovies("2010-01-01", "2019-12-31").then((data) => {
  // console.log("@@@ getMovies @@@");
  // console.log(data);
// });

// exports.getMovies
