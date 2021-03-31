
const baseController = require("../../../baseController");

module.exports = new class CourseController extends baseController{
    getAllCourses(req , res){
        this.model.Course.find({}, (err , courses) =>{
            if(err){
                throw err;
            }
            return res.json(courses);
        });
    }
    getCourseById(req , res){
        this.model.Course.findById(req.params.id , (err ,course) =>{
            if(err)
            {
                throw err
            }
            if(!course){
                res.json("Not Found");
            }
            res.json(course);
        })
    }
    
    createCourse(req  , res){
    //validation
        req.checkBody('title' , 'لطفا عنوان راپر کنید').notEmpty();
        req.checkBody('body' , 'لطفا بدنه را پر نمایید').notEmpty();

        // this.escapeAndTrim(req , 'title price');

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }

        let newCourse = new this.model.Course({
            title: req.body.title,
            body: req.body.body ,
            price : req.body.price , 
            image : req.body.image
        }).save((err) =>{
            if(err){
                throw err
            }
            res.json("Course created");
        })
        // res.json(req.body);
    }

    updateCourse(req , res){
        req.checkParams('id' , 'آی دی وارد شده صحیح نیست').isMongoId();

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }


        this.model.Course.findByIdAndUpdate(req.params.id , {title : req.body.title , body: req.body.body} , (err , course) =>{
            if(err){
                throw err
            }
            res.json("course has been updated!! SOLTAN");
        })
    }

    deleteCourse(req , res){
        this.model.Course.findByIdAndRemove(req.params.id ,(err , course)  =>{
            if(err){
                throw err
            }
            res.json("course has been deleted")
        })
    }


}


