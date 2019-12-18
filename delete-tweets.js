const { client, getTweets, getRetweets } = require('./lib')
const rules = require('./deletion-rules')
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays')
const isBefore = require('date-fns/isBefore')

const applyTweetRules = t => {
  const tweetAge = differenceInCalendarDays(new Date(), new Date(t.created_at))

  if (isBefore(new Date(t.created_at), new Date(rules.earliestDate))) {
    return true
  }

  if (tweetAge <= rules.maxTweetAge) {
    return false
  }

  if (t.favorite_count >= rules.minimumLikes) {
    return false
  }

  if (t.retweet_count >= rules.minimumRetweets) {
    return false
  }

  if (rules.keepTweets.includes(t.id_str)) {
    return false
  }

  return true
}

const applyRetweetRules = t => {
  const tweetAge = differenceInCalendarDays(new Date(), new Date(t.created_at))

  if (isBefore(new Date(t.created_at), new Date(rules.earliestDate))) {
    return true
  }

  if (tweetAge <= rules.maxRetweetAge) {
    return false
  }

  return true
}

const tweetsToDelete = getTweets().filter(applyTweetRules)
const retweetsToDelete = getRetweets().filter(applyRetweetRules)
console.log('TWEETS to DELETE: ', tweetsToDelete.length)
console.log('RTS to DELETE: ', retweetsToDelete.length)

const logDeletion = t => {
  console.log('DELETING:', t.id_str)
  console.log(t.created_at)
  console.log(`${t.favorite_count} Likes, ${t.retweet_count} Retweets`)
  console.log(t.full_text)
  console.log('---------------')
}

const deleteTweets = (cb) => {
  if (tweetsToDelete.length > 0) {
    const t = tweetsToDelete.shift()
    logDeletion(t)
    client.post(`statuses/destroy/${t.id_str}`, {}, (err, tweets, response) => {
      if (err) {
        console.log('ERROR:', err)
      } else {
        console.log('OK')
      }
      setTimeout(deleteTweets, 1000)
    })
  } else {
    deleteRetweets()
  }
}

const deleteRetweets = (cb) => {
  if (retweetsToDelete.length > 0) {
    const t = retweetsToDelete.shift()
    logDeletion(t)
    client.post(`statuses/unretweet/${t.id_str}`, {}, (err, tweets, response) => {
      if (err) {
        console.log('ERROR:', err)
      } else {
        console.log('OK')
      }
      setTimeout(deleteRetweets, 1000)
    })
  } else {
    console.log("DONE!")
  }
}

deleteTweets()