const express=require('express')
const axios=require('axios')
const router=express.Router();

const url="http://localhost:3000/todos";

//get
router.get('/',async (req,res)=>{
   try{
    const dat=await axios.get(url);
    res.status(200).json(dat.data);
   }
   catch(e){
    res.status(500).json({message:e.message});
   }
})

router.get('/:tid',async (req,res)=>{
   try{
    const todoid=req.params.tid;
    const dat=await axios.get(`${url}/${todoid}`);
    res.status(200).json(dat.data);
   }
   catch(e){
    res.status(500).json({message:e.message});
   }
})

router.post('/add',async(req,res)=>{
    try{
        const reqDat=req.body;
        const response=await axios.post(url,reqDat);
        res.status(200).json(response.data);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
})

router.delete('/del/:tid',async(req,res)=>{
    try{
        const todoid=req.params.tid;
        await axios.delete(`${url}/${todoid}`);
        res.status(200).json({message:"deleted successfully!!"});
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
})

router.patch('/patch/:tid',async (req,res)=>{
    try{
        const todoId=req.params.tid;
        const upTodo=await axios.patch(`${url}/${todoId}`,req.body);
        res.status(200).json(upTodo.data);
    }
    catch(e){
        res.status(400).json({message:e.message});
    }
})

router.put(`/put/:tid`,async (req,res)=>{
    try{
        const todId=req.params.tid;
        const editRes=await axios.put(`${url}/${todId}`,req.body)
        res.status(200).json(editRes.data);
    }
    catch(e){
        res.status(400).json({message:e.message});
    }
})


module.exports=router;

