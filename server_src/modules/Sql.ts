import {createPool, Pool} from 'mysql'


export class Data {
    pool: Pool

    constructor(host:string,user:string,password:string,database:string){
        this.pool = createPool({
            host,
            user,
            password,
            database
        })

        this.pool.getConnection(err=>{
            if(err){console.log(err)}else{
                console.log(`new connection on ${host}`)
            }
        })
    }

    sql(req:string,res:{send:Function}){

        // console.log({con:con.config})

        this.pool.query(req,(err,result)=>{
                    if(err){console.log(err)}
                    res.send(result)
                })
    }

}
