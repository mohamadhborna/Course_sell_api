const BaseController = require("../../../controllers/baseController");
const UserTransform = require("../../../transforms/userTransform");

module.exports = new class UserController extends BaseController {
    index(req , res) {
        return res.json({
            data : new UserTransform().transform(req.user)
        })
    }

    uploadImage(req , res){
        if(req.file){
            return res.json({
                massage:"فایل شما با موفقیت آپلود شد",
                data:{
                    imagePath:'https://localhost://'
                }
            })
        }
    }
}