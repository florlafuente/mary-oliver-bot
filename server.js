const express = require('express');
const app = express()
const Twit = require('twit')
const axios = require('axios')

require('dotenv').config()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tweet', async (req, res) => {
  try {
    const makeTweet = await getQuote()
  } catch (err) {
    console.log(err)
    res.send("Something didn't work out :(")
  }
})

// Twitter app config
const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

// Fetch quote from API
const getQuote = async() => {
  try {
    const maxPoems = process.env.MAX_NUMBER
    console.log(maxPoems)
    const number = Math.floor(Math.random() * maxPoems) + 1
    console.log(number)
    const apiUrl = `${process.env.API_URL}/poemas/${number}`

    const res = await axios.get(apiUrl)
    const poem = res.data
    console.log(poem)
  } catch (err) {
    console.error(err)
  }
}


app.listen(port, () => {
  console.log('App started!')
})