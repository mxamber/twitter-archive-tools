const { strToInt } = require('./core')
const { getTweets, logTweet } = require('./lib')

const [_0, _1, MINRETWEETS] = process.argv

const tweetHasMinRetweets = t => strToInt(t.retweet_count) >= MINRETWEETS
const sortByRetweets = (a,b) => strToInt(b.retweet_count) - strToInt(a.retweet_count)

const tweets = getTweets().filter(tweetHasMinRetweets)
tweets.sort(sortByRetweets)
console.log(`Found ${tweets.length} Tweets with at least ${MINRETWEETS} retweets:\n\n`)

;(async () => {
  for (t of tweets) {
    logTweet(t)
  }
})()
