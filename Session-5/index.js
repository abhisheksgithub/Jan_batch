import express from 'express'
import fs from 'fs'
import { recurssiveUpdate } from './utils/common.js'

const app = express()

app.use(express.json()) // middleware

const getUsers = (req, res) => {
    const { id } = req.query
    fs.readFile('./stubData/users.json', (err, data) => {
        if(err) {
            res.status(500)
            return res.send({
                error: err.message
            })
        }
        let jsonData = JSON.parse(data)
        res.send({
            data: jsonData,
            count: jsonData.length
        })
    })
}

const insertUser = (req, res) => {
    console.log(req.body)
    res.send('success!')
}

const updateUser = (req, res) => {
    const payload = req.body 
    fs.readFile('./stubData/users.json', (err, data) => {
        if(err) {
            res.status(500)
            return res.send({
                error: err.message
            })
        }
        let jsonData = JSON.parse(data)
        let personObject = jsonData.find(item => item.id == req.query.id)
        // logic in place
        Object.keys(payload).forEach(item => {
            recurssiveUpdate(personObject, item, payload[item])
        })
        console.log(personObject)
    })
    res.send("success")
}

app.route('/api/v1/users').get(getUsers).post(insertUser).patch(updateUser)

app.listen(8080, () => {
    console.log('Server is listening to port...')
})


// REST

// user information 

// /getAllUsers --> all -- GET
// /getUserbyId?id=2
// /addUser -- > Post {payload}
// /updateUser --> Put / Patch
// /deletebyUser?id=45 --> delete


// File -- saving the data 

// /users // GET 
// /users?id=2 // GET 
// /users // POST --> id not to be send from the client --> auto incremented --> response the same data along with id
// /users?id=3 // Put / Patch  { all the data } / { "address.zipcode": "783856", "website": "www.yud.com" }
// /users?id=3 // Delete --> del particular record

