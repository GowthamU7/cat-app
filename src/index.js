const exp=require('express')
const pt=require('path')
const socket=require('socket.io')
const http=require('http')
const app=exp()
const server=http.createServer(app)

const io=socket(server)

const port=process.env.PORT || 3000
const public=pt.join(__dirname,'../public')

app.use(exp.static(public))



io.on('connection',(socket)=>{
    console.log("New web socket connection")
    socket.emit('welcome',"welcome user")
    socket.on('texted',(msg)=>{
        io.emit('welcome',msg)
    })
})





server.listen(port,()=>{
    console.log(`Listening on port..... ${port}!`)
})