const fs = require('fs')
const { getTweets } = require('./lib')

const hashtags = Object.entries(getTweets().reduce((carry, t) => {
  if (!t.entities) {
    return carry
  }
  
  t.entities.hashtags.forEach(h => {
    const text = h.text
    carry[text] = (carry[text] ? carry[text] : 0) + 1
  });
  return carry
}, {}))

hashtags.sort((a, b) => b[1] - a[1])

console.log(hashtags)