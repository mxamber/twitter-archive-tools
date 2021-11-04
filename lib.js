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

function renderTweet(t, username, includeLink = false, includeDate = false) {
  const tweetUrl = `https://twitter.com/${username}/status/${t.id_str}`
  const dateString = includeDate ? ' ' + format(new Date(t.created_at), 'yyyy-MM-dd') : ''
  const quote = '> ' + t.full_text.split('\n').join('\n> ')
  if (includeLink) {
    return `${quote} [🔗${dateString}](${tweetUrl})`
  } else {
    return `${quote}`
  }
}

const findTweetIn = (list, id) => list.find(t => t.id_str === id)

const deleteTweet = t => {
  return new Promise((resolve, reject) => {
    client.post(`statuses/destroy/${t.id_str}`, {}, (err, tweets, response) => {
      if (err) {
        console.log('ERROR', err)
      }
      resolve()
    })
  })
}

const deleteRetweet = t => {
  return new Promise((resolve, reject) => {
    client.post(`statuses/unretweet/${t.id_str}`, {}, (err, tweets, response) => {
      if (err) {
        console.log('ERROR', err)
      }
      resolve()
    })
  })
}

const getFollowers = async (userName) => {
  let followers = []
  let cursor = -1

  do {
    const options = {
      screen_name: userName,
      include_entities: true,
      count: 200,
      cursor
    }
    console.log(options)
    const res = await client.get(`followers/list`, options)
    cursor = res.next_cursor
    console.log("Fetched", res.users.length, "followers\n-----")

    followers = followers.concat(res.users)
    await delay(60*1000)
  } while (cursor != 0)
  
  return followers
}

const logTweet = t => {
  console.log('ID:', t.id_str)
  console.log(t.created_at)
  console.log(`${t.favorite_count} Likes, ${t.retweet_count} Retweets`)
  console.log(t.full_text)
  console.log('---------------')
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const strToInt = s => parseInt(s, 10)

module.exports = {
  renderTweet,
  getTweets,
  getRetweets,
  getTweetById,
  getRepliesForTweet,
  findTweetIn,
  client,
  deleteTweet,
  deleteRetweet,
  getFollowers,
  logTweet,
  delay,
  strToInt
}
