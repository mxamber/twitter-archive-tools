// load dependencies
const { client, delay } = require('./core')

// parse target username from params
const userName = process.argv[2]

console.log(`Blocking @${userName} and all their followers ...`)

// asnyc function: block user (POST request)
const block = async id => {
  const result = await client.post('blocks/create', {user_id : id})
    .then(() => 'OK')
    .catch(err => `ERROR: ${err[0].message}`)

  console.log(`Blocking ${id} ... ${result}`)
}

// GET request (returns promise): fetch target's followers
const _followerUserIds = client.get(`followers/ids`, {screen_name: userName, stringify_ids: true})
  .then(data => {
    console.log(`Found ${data.ids.length} followers`)
    return data.ids
  })

// GeT request (returns promise): get target's id
const _targetUserId = client.get('users/show', {screen_name: userName})
.then(data => {
  console.log(`Target user_id: ${data.id_str}`)
  return data.id_str
})

// additional GET request: verify user credentials and read username and id from result
// (if anyone knows a better way to get own username and id, let me know)
const _myUser = client.get('account/verify_credentials', {})
  .then(data => {
    console.log(`\n\nMy user_id: ${data.id_str}\nMy username: ${data.name}\n\n`);
    return [data.id_str, data.name];
  })

// resolve only once all promises have been resolved
Promise.all([_targetUserId, _followerUserIds, _myUser])
  .then(async idLists => {
    // compile results of all promises into array of results, then separate into variables
    const [targetUserId, followerUserIds, myUser] = idLists
    const idsTemp = [targetUserId].concat(followerUserIds) 
    
    // get all my follows
    client.get(`friends/ids`, {screen_name: myUser.name, stringify_ids: true}).then(async function(data) {
      const myFollows = data.ids;
      let usersExcluded = 0;
      
      // remove all ids from the  blocklist that I follow
      const idsToBlock = idsTemp.filter(el => {
        if(myFollows.indexOf(el) == -1) {
          return true;
        }
        usersExcluded++;
        return  false;
      });
      
      console.log(`Excluded ${usersExcluded} users you follow from blocking.\n`);
      
      // block one every 100ms
      for (id of idsToBlock) {
        await block(id)
        await delay(100)
      }
    })
  })