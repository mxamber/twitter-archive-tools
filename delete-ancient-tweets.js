const { deleteTweet, delay, getTweets, logTweet } = require('./lib')
const config = require('./config')
const isBefore = require('date-fns/isBefore')
const parseIsoDate = require('date-fns/parseISO')

const isTweetAncient = t => isBefore(new Date(t.created_at), parseIsoDate(config.ancient))

const tweetsToDelete = getTweets().filter(isTweetAncient)
console.log('TWEETS to DELETE: ', tweetsToDelete.length)

;(async () => {
  for (t of tweetsToDelete) {
    console.log('DELETING TWEET:')
    logTweet(t)
    await deleteTweet(t)
    await delay(100)
  }
})()
