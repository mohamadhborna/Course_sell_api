const BaseTransform = require("./baseTransform");

module.exports =class CourseTransform extends BaseTransform{
    
    transform(item){
        return{
            'title' : item.title,
            'body' : item.body,
            'price' : item.price
        }
    }

}