const socket=io()

socket.on('welcome',(msg)=>{
    console.log(msg)
})

document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault()
    socket.emit('texted',e.target.elements.msg.value)

})