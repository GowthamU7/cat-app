const exp=require('express')
const pt=require('path')
const socket=require('socket.io')
const http=require('http')
const app=exp()
const server=http.createServer(app)
const Filter = require('bad-words')
const msgfun=require('./utils/messages')
const apps=require('./utils/users')

const io=socket(server)

const port=process.env.PORT || 3000
const public=pt.join(__dirname,'../public')

app.use(exp.static(public))



io.on('connection',(socket)=>{
    console.log("New web socket connection")
    socket.on('join',({username,room},callback)=>{
        const {error,user}=apps.adduser({id:socket.id,username,room})
        console.log(user)
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('welcome',msgfun.generatemsg('Adim',`Welcome to ${user.room}`,''))
        socket.broadcast.to(user.room).emit('welcome',msgfun.generatemsg(user.username,` joined joined the Room`,user.roomj))
        io.to(user.room).emit('roomdata',{
            room:user.room,
            users:apps.getUsersinroom(user.room)
        })
        callback()
    })
    
    
    
    
    socket.on('texted',(msg,callback)=>{
        const user=apps.getUser(socket.id)
        const filter=new Filter()
        if(filter.isProfane(msg)){
            return callback('profanilty is not allowed')
        }
        io.to(user.room).emit('welcome',msgfun.generatemsg(user.username,msg))
        callback()
    })
    socket.on('disconnect',()=>{
        const user=apps.removeUser(socket.id)
        console.log(user)
        if(user){
        io.to(user.room).emit('welcome',msgfun.generatemsg('',`${user.username} left the conversation`))
        io.to(user.room).emit('roomdata',{
            room:user.room,
            users:apps.getUsersinroom(user.room)
        })
    }
    })
    socket.on('location',(loc,callback)=>{
        const user=apps.getUser(socket.id)
        const url='https://www.google.com/maps/?q='+loc[0]+','+loc[1]+','+'21z'
        io.to(user.room).emit('Locator',msgfun.generatemsg(user.username,url))
        callback()
    })






})






server.listen(port,()=>{
    console.log(`Listening on port..... ${port}!`)
})