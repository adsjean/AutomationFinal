const mongoose = require('mongoose');
//const connect = mongoose.connect("mongodb+srv://admin:123456789admin@automationnode.pwqpvww.mongodb.net/Node-API?retryWrites=true&w=majority&appName=AutomationNode");

// // Check database connected or not
// connect.then(() => {
//     console.log("Database Connected Successfully");
// })
// .catch(() => {
//     console.log("Database cannot be Connected");
// })

// Create Schema
const Loginschema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
},
{
    timestamps: true
});

// collection part
const collection = mongoose.model("users", Loginschema);

module.exports = collection;