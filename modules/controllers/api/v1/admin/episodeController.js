const BaseController = require("../../../baseController");

module.exports = new class EpisodeController extends BaseController{
    getAllEpisodes(req , res){
        this.model.Episode.find({} , (err , episodes) =>{
            if(err){
                throw err
            }
            if(episodes){
                 return res.json({
                     data: episodes,
                     success : true
                 });
            }
            return res.status(404).json({
                success:false,
                message:"episodes not founded"
            })
        })
    }
    getEpisodeById(req , res){
        req.checkParams('id' , 'آی دی وارد شده صحیح نیست').isMongoId();

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }
        this.model.Episode.findById(req.params.id , (err , episode) =>{
            if(err){
                throw err
            }
            if(episode){
                return res.json({
                    data: episode,
                    success:true
                })
            }
            res.status(404).json({
                success:false,
                massage:'not found'
            })
            

        })
    }
    createEpisode(req , res){
        //validation
        req.checkBody('title' , 'عنوان نمیتواند خالی بماند').notEmpty();
        req.checkBody('body' , 'توضاحات نمیتواند خالی بماند').notEmpty();
        req.checkBody('course_id' , 'آیدی دوره  نمیتواند خالی بماند').notEmpty();
        req.checkBody('videoUrl' , 'ویدیو نمیتواند خالی بماند').notEmpty();
        req.checkBody('number' , 'شماره ویدیو نمیتواند خالی بماند').notEmpty();

        // this.escapeAndTrim(req , 'title body course_id videoUrl number');
        let errors = req.validationErrors();
        if(errors){
            this.showValidationErrors(res , errors)
        }
        //create and store in dbsuccess
        let course = this.model.Course.findById(req.body.course_id , (err , course) =>{
            if(err){
                throw err
            }

            let newEpisode = new this.model.Episode({
                title:req.body.title,
                body: req.body.body,
                course: req.body.course_id,
                videoUrl : req.body.videoUrl,
                number: req.body.number
            })
            
            newEpisode.save(err =>{
                if(err){
                    throw err
                }
                course.episodes.push(newEpisode._id);
                course.save();

                return res.json({
                    massage:'اپیزود با موفقیت ایجاد شد',
                    success: true
                })
            })
        })

    }
    updateEpisode(req , res){
        //* Validation
        req.checkParams('id' , 'آی دی وارد شده صحیح نیست').isMongoId();

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }

        //main update 
        this.model.Episode.findByIdAndUpdate(req.params.id  ,{title: req.body.title} , (err , episode) =>{
            if(err){
                throw err
            }
            if(episode){
                return res.json({
                    massage:"ویدیو با موفقیت آپدیت شد",
                    success: true
                })
            }
            return res.status(404).json({
                massage:"چنین ویدیویی وجود ندارد",
                success:false
            })
        })

    }
    deleteEpisode(req , res){
        res.json("Delete function can not be complete");
    //     req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        
    //     if(this.showValidationErrors(req, res)) 
    //         return;

    //     this.model.Episode.findById(req.params.id).populate('course').exec((err , episode) => {
    //         if(err) throw err;
            
    //         if(episode) {
    //             let course = episode.course;
    //             let pos = course.episodes.indexOf(episode._id);
    //             course.episodes.splice(pos , 1);
    //             course.save(err => {
    //                 if(err) throw err;

    //                 episode.remove();
    //                 res.json({
    //                     data : 'ویدیو شما با موفقیت حذف شد',
    //                     success : true
    //                 });
    //             });
    //             return;
    //         }

    //         res.status(404).json({
    //             data : 'چنین ویدیویی وجود ندارد',
    //             success : true
    //         });
    //     })

    }
}