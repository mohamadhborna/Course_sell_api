const BaseController = require("../../baseController");
const UserTransform = require("../../../transforms/userTransform")

const bcrypt = require("bcrypt");
module.exports = new class AuthController  extends BaseController{

    register(req ,res){
        //validation
        req.checkBody('name' , 'نام نمیتواند خالی باشد').notEmpty();
        req.checkBody('password' , 'رمز عبور نمیتواند خالی باشد').notEmpty();
        req.checkBody('email' , 'ایمیل نمتواند خالی باشد').notEmpty();
        req.checkBody('email' , 'فرمت ایمیل صحیح نیست').isEmail();

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }

     
        let newUser =  new this.model.User({
            name:req.body.name,
            email: req.body.email,
            password: req.body.password
            }).save(err =>{
                if(err){
                    return res.json(err)
                }
                return res.json({
                    massage:"کاربر با موفقیت عضو وب سایت شد",
                    success :  true
                })
            })
            
            // return res.json({
            //     massage:"کاربری با این ایمیل قبلا ثبت نام کرده است",
            //     success : false
            // })
        }
    



    login(req ,res){
        //validation
        req.checkBody('password' , 'رمز عبور نمیتواند خالی باشد').notEmpty();
        req.checkBody('email' , 'ایمیل نمتواند خالی باشد').notEmpty();

        let errors = req.validationErrors();
        if(errors){
            return this.showValidationErrors(res , errors);
        }

        this.model.User.findOne({email:req.body.email} , (err  , user) =>{
            if(err){
                throw err
            }
            if(user==null){
                return res.status(422).json({
                    massage:"چنین کاربری نداریم که !!!",
                    success:false
                })
            }
            bcrypt.compare(req.body.password , user.password, (err , status) =>{
                if(!status){
                    return res.status(422).json({
                        success:false,
                        massage:"اطلاعات وارد شده صحیح نیست"
                    })
                }
                //produce api token

                return res.json({
                    data: new UserTransform().transform(user ,true),
                    massage:"ورود موفقیت آمیز بود",
                    success : true
                })
            })
        })

    }
}