import ProductModel from "../models/productModel.js";

const getProduct = async (req, res) => {
    console.log(req.query)
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

export { getProduct }

// { price: { $gte: 500, $lte: 1000 } }