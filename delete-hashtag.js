const { deleteTweet, delay, getTweets, logTweet } = require('./lib')
const [_0, _1, HASHTAG] = process.argv

const tweetHasHashtag = t => t.full_text.indexOf(`#${HASHTAG}`) >= 0

const tweetsToDelete = getTweets().filter(tweetHasHashtag)
console.log('TWEETS to DELETE: ', tweetsToDelete.length)

;(async () => {
  for (t of tweetsToDelete) {
    console.log('DELETING TWEET:')
    logTweet(t)
    await deleteTweet(t)
    await delay(100)
  }
})()
