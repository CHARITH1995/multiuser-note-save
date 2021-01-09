var Joi = require('joi');
const { response } = require('../..');
const { NotExtended } = require('http-errors');
const { ValidationError } = require('joi');


//file adding validation
module.exports.fileValidations = (req,res,next)=>{
    let file = Joi.object({
        userId:Joi.number().required(),
        textBody:Joi.string().required()
    }).unknown();

    const validate = file.validate(req.body);
    
    if(validate.error){
        return res.status(500).send(validate.error.message)
    }else{
        next()
    }
}

//userid validation
module.exports.userIdValidations = (req,res,next)=>{
    let file = Joi.object({
        userId:Joi.number().required()
    }).unknown();

    const validate = file.validate(req.body);
    
    if(validate.error){
        return res.status(500).send(validate.error.message)
    }else{
        next()
    }
}
