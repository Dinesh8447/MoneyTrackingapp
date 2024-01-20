import {Route,Routes} from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [name,setname] = useState('')
  const [datatime,setdatetime] =useState('')
  const [description,setdescription] =useState('')
  const [transactiondate,settransactiondate] = useState([])

  useEffect(()=>{
const data= async () =>{
  const response =  await fetch('http://localhost:4000/api/transaction')
  const json = await response.json()
  if(response.ok){
    settransactiondate(json)
  }
}
data()
    
  },[])



  function addnewtransaction(e){
    e.preventDefault()
    const price = name.split(' ')[0];
    fetch('http://localhost:4000/api/transaction',{
      method:'POST',
      body:JSON.stringify({
        name:name.substring(price.length+1),
        datatime,
        description,
        price}),
      headers:{'Content-Type':'application/json'}
    }).then(response=>{
      setname('')
      setdatetime('')
      setdescription('')
      console.log(response.json())
    })
}

let balance = 0 

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }

balance = balance.toFixed(2)
const fraction = balance.split('.')[1]
balance = balance.split('.')[0]
  return (
    <main>
      <h1>{balance}<span>{fraction} </span></h1>
      <form onSubmit={addnewtransaction} >
        
        <div className="basic">
          <input 
          type="text" 
          placeholder='+200 new samsung tv'
          onChange={e=>setname(e.target.value)}
          />
          <input onChange={e=>setdatetime(e.target.value)} type="datetime-local" />
        </div>
        
        <div className="description">
          <input
          onChange={e=>setdescription(e.target.value)} 
          type="text" 
          placeholder='description'
          />
        </div>
        <button type='submit'>Add</button>
      </form>

      <div className="transactions">
        {transactiondate.length > 0 && transactiondate.map(data=>( 
        <div className="transaction">
          <div className="left">
            <div className="name">
            {data.name}
            </div>
            <div className="description">{data.description}</div>
          </div>
          <div className="right">
            <div className={"price"+(data.price < 0 ? 'red' : 'green')}>
              {data.price}
              </div>
            <div className="datatime">{data.datatime} </div>
          </div>
        </div>
))}
      </div>
    </main>
  )
}

export default App
