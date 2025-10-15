const express=require('express')
const axios=require('axios')
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const middleware=require(`./middleware`)

const url="http://localhost:3000/todos";
const userUrl="http://localhost:3000/users";

//get
router.get('/',middleware,async (req,res)=>{
    const userInUse=req.user;
   try{
    const dat=await axios.get(`${url}?userId=${userInUse.id}`);
    res.status(200).json(dat.data);
   }
   catch(e){
    res.status(500).json({message:e.message});
   }
})

router.get('/:tid',middleware,async (req,res)=>{
    const userInUse=req.user;
            try{
            const todoid=req.params.tid;
            const dat=await axios.get(`${url}/${todoid}`);
            if(userInUse.id==dat.data.userId)
            {
                res.status(200).json(dat.data);
            }
            else{
                return res.status(400).json({message:"not authorised user to view particular todo"})
            }
        }
        catch(e){
            res.status(500).json({message:e.message});
        }
    
    
})

router.post('/add',middleware,async(req,res)=>{
    const userInUse=req.user;
    try{
        const reqDat=req.body;
        const response=await axios.post(url,{...reqDat,userId:userInUse.id});
        res.status(200).json(response.data);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
})

router.delete('/del/:tid',middleware,async(req,res)=>{
    const userInUse=req.user;
        try{
            const todoid=req.params.tid;
            const todo=await axios.get(`${url}/${tid}`)
            if(userInUse.id==todo.data.userId){
                await axios.delete(`${url}/${todoid}`);
                res.status(200).json({message:"deleted successfully!!"});
            }
            else{
                return res.status(400).json({message:"not authorised for deleting this todo!"})
            }
            
        }
        catch(e){
            res.status(500).json({message:e.message});
        }
    
    
})

router.patch('/patch/:tid',middleware,async (req,res)=>{
    const userInUse=req.user;
        try{
            const todoId=req.params.tid;
            const todo=await axios.get(`${url}/${tid}`)
            if(userInUse.id==todo.data.userId){
                const upTodo=await axios.patch(`${url}/${todoId}`,req.body);
                res.status(200).json(upTodo.data);
            }
            else{
                return res.status(400).json({message:"not authorised for patching this todo!"})
            }
            
        }
        catch(e){
            res.status(400).json({message:e.message});
        }   
})

router.put(`/put/:tid`,middleware,async (req,res)=>{
    const userInUse=req.user;
    
        try{
            const todId=req.params.tid;
            const todo=await axios.get(`${url}/${tid}`)
            if(userInUse.id==todo.data.userId){
                const editRes=await axios.put(`${url}/${todId}`,req.body)
                res.status(200).json(editRes.data);
            }
            else{
                return res.status(400).json({message:"not authorised for editing this todo!"})
            }
        }
        catch(e){
            res.status(400).json({message:e.message});
        }
    
    
})

//____________________REGISTRATION_________________________

router.post('/register', async (req,res)=>{
    try{
    const {username,password}=req.body;
    const allUsers=await axios.get(`${userUrl}`)
    const user=allUsers.data.find(u=>u.username==username);
    if(user){
        return res.status(400).json({message:"user already exist!!"})
    }

    const salt=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(password,salt);

    const newUser={
        id:String(allUsers.data.length+1),
        username,
        password:hashPass
    };

    const savedUser=await axios.post(`${userUrl}`,newUser);
    res.status(200).json(savedUser.data);
    }catch(e){
        res.status(400).json({message:e.message});
    }
})

//________________________________LOGIN____________________________________________

router.post('/login',async (req,res)=>{
    try{
        const {username,password}=req.body;
        const exstUser=await axios.get(`${userUrl}?username=${username}`)
        if(!exstUser){
            return res.status(400).json({message:"no such user!"})
        }
        const passMatch=await bcrypt.compare(password,exstUser.data[0].password);
        if(!passMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        const payLoad={
            user:{
                id:exstUser.data[0].id,
                username:exstUser.data[0].username
            }
        }
        const token=jwt.sign(payLoad,"SECRET",{ expiresIn: '7d' });
        res.status(200).json({token});
    }catch(e){
        res.status(400).json({message:e.message});
    }
})

module.exports=router;

