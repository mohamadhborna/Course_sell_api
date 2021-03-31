const mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const Schema = mongoose.Schema

const CourseSchema = new Schema({
    user:{type :Schema.Types.ObjectId , ref : 'User'},
    title:{type : String  , trim : true},
    body:{type : String ,  trim : true},
    price :{type : Number },
    image : {type: String },
    episodes:[{type :Schema.Types.ObjectId , ref:'Episode'}]

})

CourseSchema.plugin(timeStamps);

module.exports =  mongoose.model('Course' , CourseSchema);



