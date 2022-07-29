const { client, delay } = require('./lib')

const id = process.argv[2]

const get = async id => {
  const result = await client.get(`statuses/show`, {id})
    .then(data => console.log(data))
    .catch(err => `ERROR: ${err[0].message}`)
}

Promise.resolve().then(async () => {
  return await get(id)
})
