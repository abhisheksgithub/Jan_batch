import express from 'express'
import { getProduct, aggregateProduct,aggregateProductUnwind } from '../controllers/productController.js'

const router = express.Router()

router
    .route('/')
    .get(getProduct)

router
    .route('/aggregate')
    .get(aggregateProduct)

router
.route('/aggregate/unwind')
.get(aggregateProductUnwind)

export default router