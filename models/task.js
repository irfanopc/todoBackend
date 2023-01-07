
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
activity:{
    type:String,
    required:true,
},
status:{
    type: String,
    default:"pending",
},
time:{
    type:String
},
action:{
     type:String,
     default:"end"
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}

})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;