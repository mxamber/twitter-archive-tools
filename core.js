const format = require('date-fns/format')
const compareAsc = require('date-fns/compareAsc')
const Twitter = require('twitter')

const client = new Twitter(require('./twitter-api.js'))


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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const strToInt = s => parseInt(s, 10)


module.exports = {
  client,
  getFollowers,
  delay,
  strToInt
}