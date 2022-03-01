const bcryptjs=require('bcryptjs');
const signupModel=require('../DataModels/signupModel');
const jwt=require('jsonwebtoken');

//making scratch folder and storing some information(work like cache) in it 
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body;
   
   const loginAccountCheck= await signupModel.findOne(
     {Email:email}).exec();
       console.log(loginAccountCheck)
      
       if(loginAccountCheck){
           const {Password,_id,Email,Name,Mobile_Number}=loginAccountCheck;
           if(bcryptjs.compareSync(password, Password)){
            var token = jwt.sign({_id:_id,Email:Email}, process.env.SECRET_KEY);
            localStorage.setItem("loginEmail",Email);
            localStorage.setItem('loginToken',token);
        res.status(200).json({
            _id,
            Email,
            Name,
            Mobile_Number
        })
    }
    else{
        res.status(400).json({
            Message:'wrong password, try correct password'
        })
    }
       }
       else{
        res.status(400).json({
            Message:'Account does not found, try signup first'
        })

       }

}catch(err){
    res.status(400).json({
        Message:'Something went wrong'
     })
     console.log(err)
}
       
      
};

exports.authorizedUser=async(req,res)=>{
    return res.status(200).json({
        Message:'You are authorized user'
    })

}

exports.logout=(req,res)=>{
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginToken');
    res.status(200).json({
        Message:'Logout Successfully'
    })

}