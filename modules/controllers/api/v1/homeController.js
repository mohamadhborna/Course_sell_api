module.exports = new class HomeController{

    index(req , res){
        res.status(200).json("Welcome to home page");
    }

    version(req , res) {
        res.status(200).json("version 1");
    }
}
