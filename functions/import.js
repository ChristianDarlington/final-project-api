const admin = require('firebase-admin')
const creds = require('./credentials.json')


// 1. Create movie API file. Move code / functions for interacting with API there
// 2. require that movieapi file above here
// 3. Call getMovies for all decades and genres you want
// 4. When you get data from API, take it and import it in to firebase
// 
// ref. https://firebase.google.com/docs/firestore/manage-data/add-data for creating data in firestore
// You can check fir Firebase UI (go to Firestore) to see if the data imported, delete it, play with it, etc.

admin.initializeApp({
	credential: admin.credential.cert(creds),
});

const firestore = admin.firestore();

console.log('SCRIPT IS STARTING');







console.log('SCRIPT ENDED');
