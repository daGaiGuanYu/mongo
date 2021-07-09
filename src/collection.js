module.exports = function({ clientConnection, client, name }) {
  if(!name)
    throw Error('请传入 collection 的 name')

  let collection

  if(client) {
    collection = client.db().collection(name)
  } else if(clientConnection) {
    collection = new Proxy({}, {
      get() {
        throw Error('mongo 未完成连接')
      }
    })
    clientConnection.onConnectted( client => {
      collection = client.db().collection(name)
    })
  } else {
    throw Error('请传入 ClientConnection 或 MongoClient 对象')
  }

  return new Proxy({}, {
    get(tar, name) {
      return {
        // demo found at https://docs.mongodb.com/drivers/node/current/usage-examples/find/
        async find() {
          const result = await collection.find(...arguments)
          return result.toArray()
        }
      }[name]
      || (
        collection[name] instanceof Function
        ? collection[name].bind(collection)
        : collection[name]
      )
    }
  })
}