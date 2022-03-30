const uuid = require('uuid')

module.exports = class Category{
    
    constructor(name){
        this.id = uuid.v4()
        this.name = name
    }
}
