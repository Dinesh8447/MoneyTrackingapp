const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const modelschema = require( './models/model')

app.use(cors())
app.use(bodyParser.json())


app.post('/api/transaction',async(req,res)=>{
const {name,datatime,description,price} = req.body
const response = await modelschema.create({name,datatime,description,price})
res.json(response)
})

app.get('/api/transaction',async(req,res)=>{
    const response = await modelschema.find()
    res.json(response)
})


mongoose.connect('mongodb://localhost:27017/money')
.then(()=>{
    console.log('connect')
})
.catch(e=>console.log(e))


app.listen(4000,()=>{
    console.log('running.....')
})
