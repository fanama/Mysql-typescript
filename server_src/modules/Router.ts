import express from 'express'
import {Data} from './Sql'
import {Socket} from 'socket.io'

export const router = express.Router()

router.get('/',(req,res)=>{

    res.send('sql is Live')
    
})

export const client = (socket:Socket)=>{

    let box:Data
    let index:Number

    socket.on("start",body=>{
        const {host,user,password,database} = body
        box = new Data(host,user,password,database)
    })

    const res = {
        send:(data:any)=>{
            socket.emit("response",data)
        }
    }

    socket.on("request",request=>{
        box?box.sql(request,res):res.send(null)
    })
}


