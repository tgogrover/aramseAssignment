const jwt=require('jsonwebtoken');

exports.authentication=async(req,res,next)=>{
    var loginEmail=localStorage.getItem('loginEmail')
    if(loginEmail){
        const {authorisation} = req.headers;
        
     if(authorisation){
         
        var header = authorisation.split(' ')[1]
    try{
     var token=  await jwt.verify(header, process.env.SECRET_KEY);
     
     req.user=token
     if(req.user){
        next();
     }
    
    
    }
     catch (err){
       return res.status(400).json
       ({
           message:err.message
    })
     }
    }
    else{
        res.status(400).json({
            Message:' Authorisation Required'
    
        })
    
    }
    }
    else{
        res.status(400).json({
            Message:'You have to login first'
    
        })
    }


}

