const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require("../../../models/userModel");

module.exports = (req , res , next) =>{
    let token = req.body.token || req.query.token ||req.headers['x-access-token'];

    if(token){
        return jwt.verify(token , config.SECRET , (err , decode) =>{
            if(err){
                return res.json({
                    success:false,
                    massage:"ورود نامعتبر"
                })
            }
            User.findById(decode.user_id , (err , user) =>{
                if(err){
                    throw err
                }
                if(user){
                    req.user = user;
                    console.log(req.user)
                    next();
                }
                else{
                    return res.json({
                        success:false,
                        massage :"همچنین کاربری نداریم لطفا ابتدا وارد شوید"
                    })
                }

            })
            // console.log(decode)
            // next();
            // return
        })
        return
    }
    return res.status(403).json({
        massage:'برای دسترسی به این قسمت باید ابتدا وارد سابت شوید',
        success:false
    })
}