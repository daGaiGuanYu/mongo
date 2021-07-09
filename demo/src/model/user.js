const Collection = require('@ppzp/mongo').Collection

module.exports = Collection({
  clientConnection: require('./connection'),
  name: 'user'
})