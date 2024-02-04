import http from 'http'
import { URL } from 'url'
import fs from 'fs'

// Code to demo POST/GET and templates

const dataStoreDir = `./dataStore/product.json`
const templateDir = `./templates/`

const jsonData = fs.readFileSync(dataStoreDir, 'utf-8')
const parseJSONData = JSON.parse(jsonData) // m
const dashboardTemplate = fs.readFileSync(`${templateDir}dashboard.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${templateDir}product.html`, 'utf-8')
const productTemplateDesc = fs.readFileSync(`${templateDir}productDetails.html`, 'utf-8')

function createProductTemplate(orignalTemplate, productInfo, details = false) {
    console.log('PIN',productInfo)
    orignalTemplate = orignalTemplate.replace(/{\$TITLE\$}/g, productInfo.title)
    orignalTemplate = orignalTemplate.replace(/{\$CATG\$}/g, productInfo.category)
    orignalTemplate = orignalTemplate.replace(/{\$PRICE\$}/g, productInfo.price)
    orignalTemplate = orignalTemplate.replace(/{\$IMAGE\$}/g, productInfo.thumbnail)
    if (!details) {
        orignalTemplate = orignalTemplate.replace(/{\$ID\$}/g, productInfo.id)

    } else {
        orignalTemplate = orignalTemplate.replace(/{\$DESC\$}/g, productInfo.description)
        orignalTemplate = orignalTemplate.replace(/{\$IMAGEA\$}/g, productInfo.images?.[0])
    }
    return orignalTemplate
}

const PORT = 8080

const server = http.createServer((req, res) => {

    const urlExtract = new URL(`http://localhost:8080${req.url}`)
    if (urlExtract.pathname === '/products' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        if (urlExtract.search !== '') {
            // Get specific data ID NAME AGE
            const filteration = {} // n
            urlExtract.searchParams.forEach((val, name) => {
                filteration[name] = val
            })
            const filterKeys = Object.keys(filteration)
            const finalProducts = parseJSONData.products.find(item => {
                let pass = true
                filterKeys.find(key => {
                    if (item[key] != filteration[key]) {
                        pass = false
                        return true
                    }
                    return false
                })
                return pass
            })
            const finalProdListTemplate = createProductTemplate(productTemplateDesc, finalProducts, true)
            console.log('finalProducts',finalProdListTemplate)

            const finalTemplate = dashboardTemplate.replace('{$PRODUCT_ITEMS$}', finalProdListTemplate)
            return res.end(JSON.stringify(finalTemplate))
        }
        const finalProdListTemplate = parseJSONData.products.map(item => createProductTemplate(productTemplate, item)).join('')
        const finalTemplate = dashboardTemplate.replace('{$PRODUCT_ITEMS$}', finalProdListTemplate)
        
        return res.writeHead(200, {
            'Content-type': 'text/html'
        }).end(finalTemplate)
    } else if (urlExtract.pathname === '/products' && req.method === 'POST') {
        let payload = ""
        req.on('data', function (chunkData) {
            payload += chunkData
        })
        req.on('end', function () {
            console.log(payload, 'payload')
            parseJSONData.products.push({ ...JSON.parse(payload), id: parseJSONData.products.length + 1 })
            fs.writeFile(dataStoreDir, JSON.stringify(parseJSONData), (err) => {
                if (err) {
                    console.log("Error writing file:", err.message)
                    res.writeHead(500, 'Failure in writing data at server.')
                    return res.end('Failure')
                }
                res.end('Success')
            })
        })
        req.on('error', function (err) {
            res.writeHead(500, 'Failure capturing payload').end('Failure')
        })
    } else if (urlExtract.pathname.includes('/public/') && req.method === 'GET') {
        if (urlExtract.pathname.includes('/css/')) {
            switch (true) {
                case urlExtract.pathname.includes('/style.css'): {
                    fs.readFile('./public/css/style.css', 'utf-8', (err, data) => {
                        if (err) {
                            console.log('Err', err)
                            return res.writeHead(500, 'Failure').end('Failure')
                        }
                        res.writeHead(200, {
                            'Content-type': 'text/css'
                        }).end(data)
                    })
                    break
                }
                case urlExtract.pathname.includes('/another.css'): {
                    res.end("Hello server!")
                }
                default: {
                    res.end("Hello server!")

                }
            }
        } else if (urlExtract.pathname.includes('/js/')) {
            switch (true) {
                case urlExtract.pathname.includes('/index.js'): {
                    fs.readFile('./public/js/index.js', 'utf-8', (err, data) => {
                        if (err) {
                            console.log('Err', err)
                            return res.writeHead(500, 'Failure').end('Failure')
                        }
                        res.writeHead(200, {
                            'Content-type': 'text/js'
                        }).end(data)
                    })
                    break
                }
                default: {
                    res.end("Hello server!")

                }
            }
        }
    } else {
        res.end("Hello server!")
    }
    // console.log(urlExtract, req.method)
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is listening at port ${PORT}`)
})

// GET, POST, PATCH, DELETE, PUT, OPTIONS
// GET -> /products
// GET -> /products?id=1&name=john
// POST -> /products --> payload { product info }
// PUT --> /products --> 4 --> payload
// DELETE --> /products --> 5 (deleted)