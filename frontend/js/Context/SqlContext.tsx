import * as React from 'react'
import { useEffect, useState } from 'react'
import { postier } from '../Postier'
const { createContext } = React

export const SQLContext = createContext<any|null>(null)

export const SQLProvider = ({children})=> {

    const [request, setrequest] = useState("")
    const [result, setresult] = useState<string>(null)
    const [database,setDatabase]=useState<string>("")


    useEffect(()=>{
        postier.getResult(setresult)
    },[])

    return<SQLContext.Provider value={{
        request, setrequest,
        result, setresult,
        database,setDatabase
    }}>

    {children}

    </SQLContext.Provider>
}
