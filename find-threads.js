const fs = require('fs')
const { getTweets, renderTweet } = require('./lib')

const [_0, _1, USERNAME, MINIMUM_THREAD_LENGTH] = process.argv

const tweets = getTweets()
const threads = []

function newThread(twt) {
  threads.push({
    tweets: [twt],
    lastId: twt.id_str
  })
}

function addToThread(twt) {
  const thread = threads.find(
    t => t.lastId === twt.in_reply_to_status_id_str
  )
  if (thread) {
    thread.tweets.push(twt)
    thread.lastId = twt.id_str
  }
}

const renderThread = th => {
  const firstId = th.tweets[0].id_str
  const md = th.tweets.map(t => renderTweet(t, USERNAME)).join('\n\n')
  fs.writeFileSync(`./threads/${firstId}.md`, md)
}

tweets.forEach(t => {
  if(t.in_reply_to_status_id_str) {
    addToThread(t)
  } else {
    newThread(t)
  }
})

const longThreads = threads.filter(t => t.tweets.length >= MINIMUM_THREAD_LENGTH)

longThreads.forEach(renderThread)