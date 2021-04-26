const fs = require('fs')
const { screenName } = require('./config')
const { getTweets, getTweetById, getRepliesForTweet, renderTweet } = require('./lib')

const [_0, _1, MINIMUM_THREAD_LENGTH] = process.argv

const tweets = getTweets()
const threads = []
const threadedIds = []

const buildThread = (thread, t) => {
  thread.push(t)
  threadedIds.push(t.id_str)
  const replies = getRepliesForTweet(t)
  replies.forEach(r => buildThread(thread, r))
  return thread
}

tweets.forEach(t => {
  if (!threadedIds.includes(t.id_str)) {
    threads.push(buildThread([], t))
  }
})


const renderThread = th => {
  const firstId = th[0].id_str
  let md = `(archived <a href="https://www.twitter.com/${screenName}/${firstId}">Twitter thread</a>)\n\n`
  md += th.map(t => renderTweet(t, screenName)).join('\n\n<!-- -->\n')
  fs.writeFileSync(`./threads/${firstId}.md`, md)
}

const longThreads = threads.filter(th => th.length >= MINIMUM_THREAD_LENGTH)

longThreads.forEach(renderThread)