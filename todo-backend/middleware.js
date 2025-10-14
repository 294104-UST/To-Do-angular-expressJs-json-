const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const authHead=req.header('Authorization')
    if(!authHead){
        return res.status(400).json({message:"no authorisation as no header!!"})
    }
    const token=authHead.split(' ')[1];
    if(!token){
        return res.status(400).json({message:"no authorisation as no token!!"})
    }
    try{
        const dataFromToken=jwt.verify(token,"SECRET");
        req.user=dataFromToken.user;
        next();
    }catch(e){
        res.status(400).json({message:e.message})
    }
}