import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { SQLContext } from '../Context/SqlContext'
import { socket } from '../Postier'

export function MainApp({setForm}) {

    const {database} = useContext(SQLContext)

    return <div>
    <div className="line" style={{justifyContent:"space-between"}}>
        <h1>Request</h1>
        <button onClick={()=>{setForm(true)}}>deconnexion</button>
    </div>

    <div className="Formulaire">
        <div>
            <h1>{database}</h1>
            <Form/>
        </div>
        
        <Buttons/>
    </div>

    <Response />
</div>

}

function Response(){

    const {result} = useContext(SQLContext)

    const [table,setTable] = useState([])


    useEffect(() => {
    const R = result?JSON.parse(result).map(r=><div>{JSON.stringify(r)}</div>):null;
        console.log({R})

        setTable(R)

    }, [result])



    return <div className="form-response">
    <div className="line"><h1>Response</h1></div>
        <div className="form-response" style={{flexDirection:"row"}}>
            <div className="result">{result}</div>
            <div className="result" >
                {table?table:null}
            </div>
        </div>
</div>
}

const Buttons = ({}) => {

    const [columns, setColumns] = useState<string>("*")
    const [tables, Settables] = useState<string>("")

    const {setrequest} = useContext(SQLContext)

    const getTables = ()=>{
        const request = "show tables"
        setrequest(request)
        submit(request)
    }

    const submit = (request:string)=>{
        socket.emit("request",request)
    }

    const select = ()=>{
        setrequest(`select ${columns} from ${tables}`)
    }

    return <div className="buttons">
        <h1>Default Request</h1>
        <div style={{overflowY:"scroll"}}>
            <div className="line"><button onClick={getTables}>get tables</button></div>
            <div className="line">
                <label>select</label>
                <input value={columns} onChange={e=>setColumns(e.target.value)} />
                <label>from</label><input onChange={e=>Settables(e.target.value)} />
                <br/><button onClick={select}>show</button>
            </div>
            <div className="line"><label>select</label><input value={tables} onChange={e=>Settables(e.target.value)}/><button>show</button></div>
            </div>
            
        </div>
}

const Form =() => {

    const {request,setrequest} = useContext(SQLContext)

    const submit = (e)=>{
        e.preventDefault()
        socket.emit("request",request)
    }

    return <form method="post" onSubmit={submit}>
        <textarea cols={50} rows={20} name="request" value={request} onChange={e => { setrequest(e.target.value) } } />
        <button>send</button>
    </form>
}