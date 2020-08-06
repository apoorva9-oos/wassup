const express = require('express')    //express ko import kiya
const app = express()                 //express ko call kiya
const http = require('http').createServer(app)     //http ko import kiya nd createServer() method ko call kiya

const PORT = process.env.PORT || 3000         //deploy krne pr ager .env nhi milta h to 3000 chlega

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


app.use(express.static(__dirname + '/public'))     //express ka middleware he static wo use kiya h 

app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
}) 

//setup socket.io in server

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        //console.log(msg)           ye likhne se terminal pr bhi show hoga msg
        socket.broadcast.emit('message', msg)
    })
})