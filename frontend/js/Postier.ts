import axios from 'axios'
import socketIOClient from 'socket.io-client';

import 'regenerator-runtime/runtime'


class Postier{
    
    async getResult(setResult:React.Dispatch<string>){

        socket.on("response",(data)=>{
            setResult(JSON.stringify(data))
        })


    }

}

export const socket= socketIOClient()
export const postier = new Postier()