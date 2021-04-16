const { deleteTweet, delay, getTweets, logTweet } = require('./lib')
const config = require('./config')
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays')

const isTweetOlderThanAllowed  = t => differenceInCalendarDays(new Date(), new Date(t.created_at)) > config.maxTweetAge

const shouldTweetBeDeleted = t => {
  if (config.keepTweets.includes(t.id_str)) {
    return false
  }
  
  if (t.favorite_count >= config.minimumLikes) {
    return false
  }

  if (t.retweet_count >= config.minimumRetweets) {
    return false
  }

  if (isTweetOlderThanAllowed(t)) {
    return true
  }
  
  return false
}

const tweetsToDelete = getTweets().filter(shouldTweetBeDeleted)
console.log('TWEETS to DELETE: ', tweetsToDelete.length)

;(async () => {
  for (t of tweetsToDelete) {
    console.log('DELETING TWEET:\n')
    logTweet(t)
    await deleteTweet(t)
    await delay(100)
  }
})()
