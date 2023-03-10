const User = require("../models/user");
const router = require("express").Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    // if(req.body.email =="" ||req.body.password==""||req.body.confirmpassword==""){
    //     return res.status(400).json({ message: "fill the fileds" });
    // }
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "password doesnt match" });
    }

    
    user = await User.create({email, password});
    res.status(200).json({user});
  } catch (error) {
    return res.status(400).json({ message: "user name should be a valid email id" });
  }
});

module.exports = router;
