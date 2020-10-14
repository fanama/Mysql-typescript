import * as React from 'react'
import { useContext } from 'react'
import { SQLContext } from '../Context/SqlContext'
import { socket } from '../Postier'

export function Login({setForm}) {

    const {setDatabase} = useContext(SQLContext)

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

    return <form method="post" onSubmit={useSubmit} action="/sql/login">

        <div className="line"><label>host</label><input name="host" id="host" /></div>
        <div className="line"><label>user</label><input name="user" id="user" /></div>
        <div className="line"><label>password</label><input name="password" id="password"  type="password"/></div>
        <div className="line"><label>database</label><input name="database" id="database" /></div>
        <div className="line"><button>connection</button></div>
    </form>
}
