const {Schema, model, default: mongoose} = require('mongoose');

const noteSchema = new Schema ({
    title :{
        type: String,
        require: true,
    },
    description :{
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require: true,
    }
},{timestamps: true});

module.exports = model('note',noteSchema);