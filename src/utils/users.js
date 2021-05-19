const users=[]
const Existingrooms=[]
const adduser=({id,username,room})=>{
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    if(!username || !room){
        return {
            error:'Username and Room are required'
        }
    }
    const existinguser=users.find((us)=>{
        return username.room===room && username.username===username
    })
    if(existinguser){
        return {
            error:'Username in use'
        }
    }
    const user={id,username,room}
    users.push(user)
    return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id)
    if(index!=-1)
    {
        return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    return users.find((user)=>user.id===id)
}

const getUsersinroom=(room)=>{
    const usersinroom=[]
    users.forEach((user)=>{
            if(user.room==room){
                usersinroom.push(user.username)
            }
    })
    return usersinroom 
}



module.exports={
    adduser,
    removeUser,
    getUser,
    getUsersinroom
}