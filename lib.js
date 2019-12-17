const format = require('date-fns/format')
const compareAsc = require('date-fns/compareAsc')

global.window = {
  YTD: {
    tweet: {}
  }
}
require(`./archive/tweet.js`)
const tweets = global.window.YTD.tweet.part0.filter(t => !/^RT /.test(t.full_text))

tweets.sort((a, b) => {
  return compareAsc(new Date(a.created_at), new Date(b.created_at))
})

const getTweets = () => tweets

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
  findTweetIn
}
