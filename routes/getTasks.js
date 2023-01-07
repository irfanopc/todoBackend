
const Task = require('../models/task');

const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/userdetails/:id', async(req,res)=>{
    try{
        // const { id: userId } = req.params;
        // console.log(req.params);
        // const task = await Task.findById({ _id: userId });
        const { id: userId } = req.params;
    // console.log(req.params);
        const userTasks = await User.find({_id:userId}).populate("tasks")
    
        if(!userTasks){
            
            return res.status(400).json({
                success:false,
                message:"add some tasks"
            })
        }
        
       if(userTasks){
        res.status(200).json({
            success:true,
            userTasks: userTasks.reverse()

        })
        //console.log(userProperties);
       } 
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
   
})




module.exports = router