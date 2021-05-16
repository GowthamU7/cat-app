const generatemsg=(username,msg)=>{
    fmt={username,msg,createdat:new Date().getTime()}
    return fmt

}

module.exports={
    generatemsg
}