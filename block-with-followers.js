const { client, delay } = require('./core')

const userName = process.argv[2]

console.log(`Blocking @${userName} and all their followers ...`)

const block = async id => {
  const result = await client.post('blocks/create', {user_id : id})
    .then(() => 'OK')
    .catch(err => `ERROR: ${err[0].message}`)

  console.log(`Blocking ${id} ... ${result}`)
}

const _followerUserIds = client.get(`followers/ids`, {screen_name: userName, stringify_ids: true})
  .then(data => {
    console.log(`Found ${data.ids.length} followers`)
    return data.ids
  })

const _targetUserId = client.get('users/show', {screen_name: userName})
.then(data => {
  console.log(`Target user_id: ${data.id_str}`)
  return data.id_str
})

Promise.all([_targetUserId, _followerUserIds])
  .then(async idLists => {
    const [targetUserId, followerUserIds] = idLists
    const idsToBlock = [targetUserId].concat(followerUserIds) 

    for (id of idsToBlock) {
      await block(id)
      await delay(100)
    }
  })
