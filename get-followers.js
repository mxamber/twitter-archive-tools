const { client, delay, getFollowers } = require('./lib')
const { writeFileSync } = require('fs')

const userName = process.argv[2]

getFollowers(userName)
  .then(data => {
    writeFileSync('followers.json', JSON.stringify(data))
  })
  .catch(e => console.log(e))
