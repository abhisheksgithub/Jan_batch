import ProductModel from "../models/productModel.js";

const getProduct = async (req, res) => {
    try {
        let queryFilter = {...req.query}

        const excludeList = ["limit", "sort", "page", "fields"]
        excludeList.forEach(item => delete queryFilter[item])

        let query = ProductModel.find(queryFilter)

        // Sorting logic
        if (req.query.sort) {
            const finalSort = req.query.sort.split(',').join(' ')
            query = query.sort(finalSort)
        }
        
        // Pagination logic
        if (req.query.limit && req.query.page && req.query.page > 0) {
            const { limit, page} = req.query
            const skip = (page - 1) * limit
            query = query.skip(skip).limit(limit)
        }

        // Fields logic
        if(req.query.fields) {
            const finalFields = req.query.fields.split(',').join(' ')
            query = query.select(finalFields)
        }

        const data = await query

        res.send({
            status: 'success',
            data,
            count: data.length
        })

    } catch (e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

const aggregateProductUnwind = async (req, res) => {
    try {
        // Stage 1 -> filter category not equal to skincare
        // Stage 2 -> 
        const aggr = await ProductModel.aggregate([
            {
                $unwind: '$date'
            },
            {
                $match: {
                    date: {
                        $gte: new Date('2020-01-01')
                    }
                }
            },
            {
                $group: {
                    _id: { $year : '$date' },
                    products: {
                        $push: { "title": '$title', "date": "$date"}
                    }
                }
            }
        ])

        res.send({
            status: 'success',
            data: aggr,
            count: aggr.length
        })
    } catch(e){
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}


const aggregateProduct = async (req, res) => {
    try {
        // Stage 1 -> filter category not equal to skincare
        // Stage 2 -> 
        const aggr = await ProductModel.aggregate([
            {
                $match: { category : { $ne: 'skincare' }}
            },
            {
                $group: {
                    _id: '$category',
                    maxStock: { $max: '$stock' },
                    avgPrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' },
                    totalPrice: { $sum: '$price' },
                    totalProducts: { $sum: 1 }
                }
            },
            {
                $sort: { totalPrice: -1 }
            },
            {
                $match: { _id: { $ne: 'fra'} }
            },
            {
                $addFields: { category: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ])

        res.send({
            status: 'success',
            data: aggr,
            count: aggr.length
        })
    } catch(e){
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

export { getProduct, aggregateProduct, aggregateProductUnwind }

// { price: { $gte: 500, $lte: 1000 } }