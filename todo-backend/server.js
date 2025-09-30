const express=require('express')
const cors=require('cors')
const routes=require('./routes.js')
const app=express();

const PORT=8080

app.use(express.json())
app.use(cors())
app.use("/api/todo",routes);

// app.get('/',async (req,res)=>{
//     res.status(200).json("Hello");
// })
app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
})