const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const tasks = require('./routes/task');
const signin = require('./routes/signin')
const userRoute = require('./routes/user')
const logout = require('./routes/Logout')
const getTask = require('./routes/getTasks')
app.use(express.urlencoded({ extented: true }));
app.use(express.json());
app.use(cookieParser()); 

mongoose.set('strictQuery', false)
app.use(cors());
app.use("/",tasks)
app.use('/',signin)
app.use('/',userRoute)
app.use("/",logout)
app.use("/",getTask)



mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})


app.listen(port, () => console.log(`Server running......${port}`));
