const mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{type : String , required:true , trim : true},
    email : {type : String , required : true , trim : true , unique: true} , 
    password:{type : String , required : true  , trim : true },
    courses :[{type: Schema.Types.ObjectId , ref:'Course'}]
})

UserSchema.plugin(timeStamps);

UserSchema.pre("save" , function(next){
    const user = this;
    bcrypt.hash(user.password , 10 , (err , hash) =>{
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
})

module.exports =  mongoose.model('User' , UserSchema);



