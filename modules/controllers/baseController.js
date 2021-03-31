const Course = require('../models/courseModel');
const Episode = require("../models/episodeModel");
const User = require("../models/userModel");

module.exports =  class BaseController{
    constructor(){
        this.model = {Course , Episode , User}
    }

    showValidationErrors(res , errors){
        return res.status(422).json({
            massage:errors.map(error =>{
                return{
                    'field': error.param,
                    'massage' : error.msg
                }
            }),
            success:false
        })
    }

    escapeAndTrim(req , items){
        items.split(' ').forEach(element => {
            req.sanitize(element);
        });
    }
}