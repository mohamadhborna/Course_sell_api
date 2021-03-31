const BaseTransform = require("./baseTransform");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = class UserTransform extends BaseTransform{

    transform(item , createToken = false){
        this.createToken = createToken
        return{
            'email' : item.email,
            'name' : item.name,
            ...this.withToken(item)
        }


    }
    withToken(item){
        if(item.token){
            return {token:item.token}
        }
        if(this.createToken){

            let token = jwt.sign({user_id:item._id} ,config.SECRET ,{
                expiresIn:'110h',
                // algorithm:'HS384'
            })

            return{
                token:token
            }
        }

        return {};
    }
}