const BaseController = require("../../baseController");
const CourseTransform = require("../../../transforms/courseTransform"); 

module.exports = new class CourseController extends BaseController{

    index(req ,res) {
        this.model.Course.find({} , (err , courses) =>{
            if(err){
                throw err
            }
            if(courses){
                return res.json({
                    data: new CourseTransform().transformCollection(courses),
                    succsess:true
                })
            }

            res.json({
                massage:"Courses Empty",
                succsess:false
            })
        })
    }
}