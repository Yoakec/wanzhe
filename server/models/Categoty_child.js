const uuid = require('uuid')

module.exports = class Category_child  {
    constructor(parentid,name){
        this.category_child_id = uuid.v4()
        this.category_part_id = parentid
        this.category_child_name = name
    }
}