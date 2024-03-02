import axios from 'axios'
import ProductModel from '../models/productModel.js'

export default function exporting() {
    axios.get('https://dummyjson.com/products')
        .then(res => {
            console.log(res.data)
            insertProduct(res.data.products)
        })

    const insertProduct = async function(data) {
        const out = await ProductModel.create(data)
    }

}