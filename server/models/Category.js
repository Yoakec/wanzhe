const uuid = require('uuid')

module.exports = class Category{
    
    constructor(category_name){
        this.id = uuid.v4()
        this.category_name = category_name
    }
}
