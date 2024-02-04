import Events from 'events'
import http from 'http'
import fs from 'fs'

const server = http.createServer()

server.on('request', (req, res) => {
    // fs.readFile('./text.txt', (err, data) => {
    //     if(err) {
    //         return res.writeHead(500, 'Retrieval of data failed').end('Failed')
    //     }
    //     res.end(data)
    // })
    // const readStream = fs.createReadStream('./text.txt')
    // readStream.on('data', chunk => {
    //     res.write(chunk)
    // })
    // readStream.on('end', () => {
    //     res.end()
    // })
    // readStream.on('error', err => {
    //     res.writeHead(500)
    //     res.end(err.message)
    // })
    const readStream = fs.createReadStream('./text.txt')
    readStream.pipe(res)
    // backpressure

})

server.listen(8080, '127.0.0.1', () =>{
    console.log('Server is listening to the port 8080')
})

// const customEvent = new Events()

// class Micheal extends Events {
//     constructor() {
//         super()
//     }
// }

// const jackson = new Micheal() 

// jackson.on('break', (req, res) => {
//     console.log('Moon walk', req, res)
// })

// jackson.emit('break', 67, 90)

// customEvent.on("request", (person, goodDancer) => {
//     console.log("Someone is dancing!", person, 'goodDancer', goodDancer)
// })

// customEvent.on("request", () => {
//     console.log("On the dance floor.")
// })

// customEvent.emit("request", { name: 'Jack', age: 78 }, true)