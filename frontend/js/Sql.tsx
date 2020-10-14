import *as React from 'react'
import {render} from 'react-dom'

import {useState, useContext} from 'react'
import { SQLContext, SQLProvider } from './Context/SqlContext'
import { Login } from './Component/Login'
import { MainApp } from './Component/MainApp'

function Provider() {
    return <SQLProvider>
        <Sql />
    </SQLProvider>
}

function Sql() {

    const [form,setForm]=useState<Boolean>(true)

    return <div>
        {form?<Login setForm={setForm}/>:<MainApp setForm={setForm}/>}
        
    </div>
}


render(<Provider/>,document.getElementById("app"))