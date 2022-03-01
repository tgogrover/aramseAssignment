const bcryptjs=require('bcryptjs');
const signupModel=require('../DataModels/signupModel')

exports.signup=async(req,res)=>{
    try{
        const {email,contacts,password,name}=req.body
   const uniqueEmail_Contacts= await signupModel.findOne(
       {$or:[{Email:email},{Mobile_Number:contacts}]}).exec();
      // console.log(uniqueEmail_Contacts)
     
       if(uniqueEmail_Contacts==null){
           console.log(req.body)
         var hashPasword=  bcryptjs.hashSync(password,10);
       //  console.log(hashPasword)
        
            const legalSignup= new signupModel({
                Name:name,
                Email:email,
                Mobile_Number:contacts,
                Password:hashPasword,
            }).save()
         legalSignup.then((data)=>{
            const {_id,Name,Email,Mobile_Number}=data
            res.status(201).json({
                _id,
                Email,
                Mobile_Number,
                Name
            })
           // return  console.log(legalSignup)
         })
       }
       else{
           return res.status(400).json({
            Message:'Try different Email or Mobile Number'
         })
       }
    }catch(err){
        res.status(400).json({
           Message:'Something went wrong'
        })
        console.log(err)
    }
    
}