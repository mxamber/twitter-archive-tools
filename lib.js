const format = require('date-fns/format')
const compareAsc = require('date-fns/compareAsc')
const Twitter = require('twitter')

const client = new Twitter(require('./twitter-api.js'))

global.window = {
  YTD: {
    tweet: {}
  }
}
require(`./archive/data/tweet.js`)
const tweets = []
const retweets = []
global.window.YTD.tweet.part0.forEach(t => {
  const tweet = t.tweet
  if (/^RT @/.test(tweet.full_text)) {
    retweets.push(tweet)
  } else {
    tweets.push(tweet)
  }
})

tweets.sort((a, b) => {
  return compareAsc(new Date(a.created_at), new Date(b.created_at))
})
retweets.sort((a, b) => {
  return compareAsc(new Date(a.created_at), new Date(b.created_at))
})

tweetsById = tweets.reduce((carry, t) => {
  carry[t.id_str] = t
  return carry
}, {})

const getTweets = () => tweets.slice(0)
const getRetweets = () => retweets.slice(0)

const getTweetById = id => tweetsById[id]

const getRepliesForTweet = twt => tweets.filter( t => t.in_reply_to_status_id_str === twt.id_str)

function renderTweet(t, username, includeDate) {
  const tweetUrl = `https://twitter.com/${username}/status/${t.id_str}`
  const dateString = includeDate ? ' ' + format(new Date(t.created_at), 'yyyy-MM-dd') : ''
  const quote = '> ' + t.full_text.split('\n').join('\n> ')
  return `${quote} [🔗${dateString}](${tweetUrl})`
}

const findTweetIn = (list, id) => list.find(t => t.id_str === id)

module.exports = {
  renderTweet,
  getTweets,
  getRetweets,
  getTweetById,
  getRepliesForTweet,
  findTweetIn,
  client
}
