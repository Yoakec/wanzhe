module.exports = opitons =>{
    return async (req, res, next) => {
        const Model_name = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${Model_name}`)
        next()
    }
}