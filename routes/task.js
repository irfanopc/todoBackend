const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');

router.post("/addItem",async(req,res)=>{
    try {
        const {email} =  req.body;
        let user = await User.findOne({email});
        let {activity} = req.body
        const task = await Task.create({
            activity:activity // taking all fields from user
        });
       user.tasks.push(task)
        await user.save()
        res.status(200).json({
            status: "Success",
            task
        })
      } catch (error) {
        res.status(500).json({ msg: error });
      }
})


module.exports = router;