const { delay } = require('./core')
const { deleteRetweet, getRetweets, logTweet } = require('./lib')
const config = require('./config')
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays')

const isReweetOlderThanAllowed  = t => differenceInCalendarDays(new Date(), new Date(t.created_at)) > config.maxRetweetAge

const retweetsToDelete = getRetweets().filter(isReweetOlderThanAllowed)
console.log('RTS to DELETE: ', retweetsToDelete.length)

;(async () => {
  for (t of retweetsToDelete) {
    console.log('DELETING RT:')
    logTweet(t)
    await deleteRetweet(t)
    await delay(100)
  }
})()
