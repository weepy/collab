const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')



const ROOT = path.resolve(`${__dirname}/`)
app.use(express.static(ROOT+'/public'))


io.on('connection', (socket) => {


    let id 
    socket.on('join', (_id) => {
        id = _id
    })

    socket.on('cursor', (x, y) => {
        
        io.emit('cursor', id, x, y)
    })
    
    socket.on("disconnect", () => {
        io.emit('cursor', id, null, null)
    })
    
})
    

const PORT = 4444
http.listen(PORT, () => console.log('listening on *:'+PORT))

