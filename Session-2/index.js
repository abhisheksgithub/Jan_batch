import crypto from 'crypto'
const start = Date.now()
process.env.UV_THREADPOOL_SIZE=2


const dataA = crypto.pbkdf2("passcode", "crazy",2000000, 124, 'sha512', (err, buff) => {
    console.log(Date.now() - start)
}) 

const dataB = crypto.pbkdf2("passcode", "crazy",2000000, 124, 'sha512', (err, buff) => {
    console.log(Date.now() - start)
}) 

const dataV = crypto.pbkdf2("passcode", "crazy",2000000, 124, 'sha512', (err, buff) => {
    console.log(Date.now() - start)
}) 

const dataG = crypto.pbkdf2("passcode", "crazy",2000000, 124, 'sha512', (err, buff) => {
    console.log(Date.now() - start)
}) 