const { client, strToInt } = require('./core')
const { getTweets, logTweet } = require('./lib')

const [_0, _1, MINLIKES] = process.argv

const tweetHasMinLikes = t => strToInt(t.favorite_count) >= MINLIKES
const sortByFavorites = (a,b) => strToInt(b.favorite_count) - strToInt(a.favorite_count)

const tweets = getTweets().filter(tweetHasMinLikes)
tweets.sort(sortByFavorites)
console.log(`Found ${tweets.length} Tweets with at least ${MINLIKES} likes:\n\n`)

;(async () => {
  for (t of tweets) {
    logTweet(t)
  }
})()
