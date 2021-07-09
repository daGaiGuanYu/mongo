const Express = require('express')

const modelConnection = require('./model/connection')

const express = Express()

modelConnection.onConnectted(function() {
  express.listen(8080, () => {
    console.log('应用已开启')
  })
})

// 下面的代码应该写在别的文件，毕竟不能把所有代码都写在一个文件里
const User = require('./model/user')

express.get('/', async function(req, res) {
  res.json(await User.find())
})