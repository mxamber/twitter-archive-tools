const fs = require('fs')
const { getTweets, getTweetById, getRepliesForTweet, renderTweet } = require('./lib')

const [_0, _1, USERNAME, MINIMUM_THREAD_LENGTH] = process.argv

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
  const md = th.map(t => renderTweet(t, USERNAME)).join('\n\n<!-- -->\n')
  fs.writeFileSync(`./threads/${firstId}.md`, md)
}

const longThreads = threads.filter(th => th.length >= MINIMUM_THREAD_LENGTH)

longThreads.forEach(renderThread)