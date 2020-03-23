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
    const newPoem = await getQuote()
    const tweetPoem = await postTweet(newPoem)
    res.send(tweetPoem)
  } catch (err) {
    console.log(err)
    res.send("Something didn't work out :(")
  }
})

// Fetch quote from API
const getQuote = async() => {
  try {
    const maxPoems = process.env.MAX_NUMBER
    const number = Math.floor(Math.random() * maxPoems) + 1
    const apiUrl = `${process.env.API_URL}/poemas/${number}`

    const res = await axios.get(apiUrl)
    const poem = res.data.frase
    
    return poem
  } catch (err) {
    console.error(err)
  }
}

// Twitter app config
const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const postTweet = async (poem) => {
  try {
    const tweet = await T.post('statuses/update', {
      status: poem
    })
    console.log(tweet.resp.toJSON().statusCode)
    return 'Tweet sent :)'
  } catch (err) {
    console.error(err)
    return 'Error while tweeting :('
  }
}


app.listen(port, () => {
  console.log('App started!')
})