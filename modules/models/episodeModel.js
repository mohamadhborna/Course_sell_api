const mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const Schema = mongoose.Schema

const EpisodeSchema = new Schema({
    course :{type :Schema.Types.ObjectId , ref : 'Course'},
    title:{type : String , required:true , trim : true},
    body : {type : String , required:true , trim : true},
    videoUrl: {type: String , required : true},
    number :{type :  Number , required : true} ,
    viewCount :{type :  Number , default : 0} ,
    commentCount :{type :  Number , default :  0} ,
})

EpisodeSchema.plugin(timeStamps);

module.exports =  mongoose.model('Episode' , EpisodeSchema);



  