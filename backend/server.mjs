import express from 'express'
import dotenv from "dotenv"
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3000
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = process.env.MONGO_URI
const client = new MongoClient(url)

// Database Name
const dbName = 'passop'

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})

//Delate a password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})