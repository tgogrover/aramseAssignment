const express=require('express');
const router=express.Router();
const {login,logout,authorizedUser}=require('../controllers/login');
const {loginValidation,Validator}=require('../validators/validations');
const {authentication}=require('../authMiddleware/authentication')

router.post('/api/login',loginValidation,Validator,login)
router.get('/api/logout',logout)
router.get('/api/authorizedUser',authentication,authorizedUser)

module.exports=router