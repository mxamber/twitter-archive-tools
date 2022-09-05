const { client } = require('./core')

const blocks = async (cursor = -1) => {
  let ids = []

  do {
    const res = await client.get(`blocks/ids`, {include_entities: false, stringify_ids: true, cursor})
    cursor =  res.next_cursor
    ids = ids.concat(res.ids)
  } while (cursor != 0)
  
  return ids
}

blocks().then(ids => {
  console.log(`BLOCKED: ${ids. length}`)
})


