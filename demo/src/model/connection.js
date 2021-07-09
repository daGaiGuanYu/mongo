const ClientConnection = require('@ppzp/mongo').ClientConnection

module.exports = ClientConnection({
  user: '你的用户名',
  password: '你的密码',
  host: '你的 host',
  db: '你的 db'
})