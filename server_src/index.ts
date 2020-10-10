import express from 'express'
import { router,client } from './modules/Router'
import {resolve} from 'path'

import * as socketIO from 'socket.io'

const server = express()

server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(express.static(resolve(__dirname)+'/public'))
server.use('/sql',router)

server.get('/',(req,res)=>{
    console.log("cahnge")
    res.sendFile(__dirname+'/public/sql.html')
})

const app = server.listen(3000,()=>{console.log("Sql_node is on 3000")})

const io = socketIO.listen(app)

io.on("connection",client)