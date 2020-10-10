import *as React from 'react'
import {render} from 'react-dom'

import {useState,useEffect} from 'react'
import {postier,socket} from './Postier'

function Sql() {

    const [form,setForm]=useState<Boolean>(true)

    const [database,setDatabase]=useState<string>("")

    const [request, setrequest] = useState("")
    const [result, setresult] = useState<string>(null)

    useEffect(()=>{

        postier.getResult(setresult)

    },[])

    const submit = (e)=>{
        e.preventDefault()
        socket.emit("request",request)
    }

    const useSubmit = e=>{
        e.preventDefault()

        const session={
            host:document.getElementById("host").value,
            user:document.getElementById("user").value,
            password:document.getElementById("password").value,
            database:document.getElementById("database").value
        }

        setDatabase(session.database)

        socket.emit("start",session)
        setForm(false)
    }

    return <div>
        {form?<form method="post" onSubmit={useSubmit} action="/sql/login">

            <div className="line"><label>host</label><input name="host" id="host" /></div>
            <div className="line"><label>user</label><input name="user" id="user" /></div>
            <div className="line"><label>password</label><input name="password" id="password"  type="password"/></div>
            <div className="line"><label>database</label><input name="database" id="database" /></div>
            <div className="line"><button>connection</button></div>
        </form>:null}

        {(!form)?<div>
            <div className="line" style={{justifyContent:"space-between"}}><h1>Request</h1><button onClick={()=>{setForm(true)}}>deconnexion</button></div>

            <div className="Formulaire">
                <div>
                    <h1>{database}</h1>
                    <Form submit={submit} request={request} setrequest={setrequest} />
                </div>
                
                <Buttons setrequest={setrequest}/>
            </div>

            <div className="form-response">
                <div className="line"><h1>Response</h1></div>
                    <div className="form-response">
                        <div className="result">{result}</div>
                    </div>
            </div>
        </div>:null}
        
    </div>
}


const Form =({submit,request,setrequest}) => {
    return <form method="post" onSubmit={submit}>
        <textarea cols={50} rows={20} name="request" value={request} onChange={e => { setrequest(e.target.value) } } />
        <button>send</button>
    </form>
}

const Buttons = ({setrequest}) => {

    const [columns, setColumns] = useState<string>("*")
    const [tables, Settables] = useState<string>("")


    const getTables = ()=>{
        setrequest("show tables")
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

    render(<Sql/>,document.getElementById("app"))