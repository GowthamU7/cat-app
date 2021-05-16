const socket=io()
//elements

const $messegeform=document.querySelector('#form')
const $messegefrominput=$messegeform.querySelector('#msg')
const $messegeformbutton=$messegeform.querySelector('#but')
const $locationbut=document.querySelector("#loc")
const $messeags=document.querySelector('#mg-container')
//template variables

const msgs=document.querySelector("#message-template").innerHTML
const loci=document.querySelector("#location-template").innerHTML
//options
const {username,room}= Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('welcome',(fmt)=>{
      const html=Mustache.render(msgs,{message:fmt.msg,created:moment(fmt.createdat).format('h:mm a'),name:fmt.username})
      $messeags.insertAdjacentHTML('beforeend',html)
})
socket.on('Locator',(loc)=>{
    console.log("My location ",loc)
    const html=Mustache.render(loci,{loc:loc.msg,created:moment(loc.createdat).format('h:mm a'),name:loc.username})
    $messeags.insertAdjacentHTML('beforeend',html)
})
$messegeform.addEventListener('submit',(e)=>{
    e.preventDefault()
    $messegeformbutton.setAttribute('disabled','disabled')
    socket.emit('texted',e.target.elements.msg.value,(error)=>{
        $messegeformbutton.removeAttribute('disabled')
        $messegefrominput.value=''
        $messegefrominput.focus()
        if(error){
           return  console.log(error)
        }
        console.log('msg has been deliverd ')
    })

})



document.querySelector("#loc").addEventListener('click',()=>{
    $locationbut.setAttribute('disabled','disabled')
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by ur browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('location',[position.coords.latitude,position.coords.longitude],()=>{
        })
    })
    $locationbut.removeAttribute('disabled')
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

socket.on('roomdata',({room,users})=>{
    console.log(room,users)
})
