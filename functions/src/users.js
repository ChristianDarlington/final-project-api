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

