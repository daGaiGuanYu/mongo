const { MongoClient } = require('mongodb')
const Event = require('events')

module.exports = function({ user, password, host, db = '' }) {
  const event = new Event()
  
  if(!user)
    throw Error('【mongo】请设置用户名')
  if(!password)
    throw Error('【mongo】请设置密码')
  if(!host)
    throw Error('【mongo】请设置主机（host）')
  if(!db)
    console.warn('【mongo】未设置 database，将使用默认 database；\n如果已通过其他方式设置 database，请忽略此提示')

  console.log(`建立 mongo 连接 ${host}/${db} ...`)

  const uri = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&writeConcern=majority`
  const client = new MongoClient(uri)
  client.connect()
    .then( () => {
      console.log(`已连接 mongo ${host}/${db}`)
      event.emit('connected', client)
    })
    .catch( err => {
      console.error(err)
      event.emit('connected-error')
    })
  
  return {
    onConnectted(cb) {
      event.on('connected', cb)
    },
    close() {
      client.close()
    }
  }
}