const {Router} = require("express");


const router = new Router();

router.get("/courses" , (req , res) =>{
    res.json({
        data:[
            {
                title:"course 1" ,
                content :"this is course 1 body"
            },
            {
                title:"course 2" ,
                content:"this is course 2 body"
            }
        ]
    })
})



module.exports = router;