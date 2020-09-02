const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 4000
const index = require('./routes/index')

const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('new socket', socket.id)
  socket.on('new mode', (mode) => {
    console.log('new mode', mode)
    io.emit('new mode', { mode: mode.name, buttons: mode.buttons })
  })
  socket.on('button press', (button) => {
    console.log('button press', button)
    io.emit('button press', button)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
