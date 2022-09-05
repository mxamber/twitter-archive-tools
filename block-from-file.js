const { client, delay } = require('./core')
const { readFileSync } = require('fs')

const fileName = process.argv[2]

const block = async id => {
  const result = await client.post('blocks/create', {user_id : id})
    .then(() => 'OK')
    .catch(err => `ERROR: ${err[0].message}`)

  console.log(`Blocking ${id} ... ${result}`)
}

const userList = JSON.parse(readFileSync(`./${fileName}`))

const idsToBlock = userList.map(user => user.id_str)

Promise.resolve()
  .then(async () => {
    for (id of idsToBlock) {
      await block(id)
      await delay(100)
    }
})
