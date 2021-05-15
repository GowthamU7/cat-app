const exp=require('express')
const pt=require('path')
const socket=require('socket.io')
const http=require('http')
const app=exp()
const server=http.createServer(app)
const Filter = require('bad-words')

const io=socket(server)

const port=process.env.PORT || 3000
const public=pt.join(__dirname,'../public')

app.use(exp.static(public))



io.on('connection',(socket)=>{
    console.log("New web socket connection")
    socket.emit('welcome',"welcome User")
    socket.broadcast.emit('welcome','a new user has joined')
    socket.on('texted',(msg,callback)=>{
        const filter=new Filter()
        if(filter.isProfane(msg)){
            return callback('profanilty is not allowed')
        }
        io.emit('welcome',msg)
        callback()
    })
    socket.on('disconnect',()=>{
        io.emit('welcome','A user has left')
    })
    socket.on('location',(loc,callback)=>{
        io.emit('Locator','https://www.google.com/maps/?q='+loc[0]+','+loc[1]+','+'21z')
        callback()
    })
})






server.listen(port,()=>{
    console.log(`Listening on port..... ${port}!`)
})