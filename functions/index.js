const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/test', (req,res) => {
  res.send('🍿 Movie Finder')
})

exports.app = functions.https.onRequest(app)

