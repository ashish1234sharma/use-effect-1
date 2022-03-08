import {useState, useEffect } from "react"
import axios from "axios"

export const Groceries = ()=>{

    const [text,setText]=useState("")
    const [groceries,setGroceries]=useState([])
    const [page,setPage] = useState(1)
    
    useEffect(()=>{
        getdata()
    },[page])

    const getdata= ()=>{
        axios.get(`http://localhost:3001/groceries?_limit=3&_page=${page}`).then((res)=>{
            setGroceries(res.data)
        })
    }
   
    
    return (
        <div>
            <input type="text" onChange={(e)=>setText(e.target.value)}/>
            <button onClick={()=>{
                
                fetch("http://localhost:3001/groceries",{
                    method : "POST",
                    body : JSON.stringify({title:text,purchased:false}),
                    headers:{
                        "Content-type": "Application/json"
                    }
                }).then(()=>{
                    getdata();
                })
            }} >Save</button>

           {groceries.map((g) => <div key={g.id}>{g.title}</div>)} 

           <button onClick={()=>{
               if(page-1>0){
                setPage(page-1);
               }
               
                console.log("ashish")
           }} >prev</button>
            <button onClick={()=>{
                if(page-1<4){
                    setPage(page+1)
                }
              
               console.log("sharma")
           }} >next</button>

        </div>
    )

    
}