const {Router} =require("express");

const router = new Router();

router.get("/" , (req , res) =>{
    res.json("Welcome to Home page");
});
router.get("/about" , (req , res) =>{
    res.json("Welcome to about page ");
})

module.exports = router;