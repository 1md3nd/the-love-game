const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    name :{
        type: String,
        require: true,
    },
    username :{
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {timestamps : true});

module.exports = model('users',userSchema);