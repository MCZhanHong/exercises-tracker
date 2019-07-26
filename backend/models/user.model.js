const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, //独一无二的
        trim: true, // 去除头尾的空格
        minlength: 3
    }
}, {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
