
module.exports = class BaseTransform {

    transformCollection(items){
        return items.map(this.transform.bind(this))
    }

}