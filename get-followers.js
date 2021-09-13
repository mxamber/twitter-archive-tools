const { client, delay } = require('./lib')
const { writeFileSync } = require('fs')

const userName = process.argv[2]

const followers = async (userName) => {
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

followers(userName)
  .then(data => {
    writeFileSync('followers.json', JSON.stringify(data))
  })
  .catch(e => console.log(e))
