const express=require('express');
const router=express.Router();
const {signup}=require('../controllers/signup');
const {signupValidation,Validator}=require('../validators/validations')

router.post('/api/signup',signupValidation,Validator,signup)


module.exports=router