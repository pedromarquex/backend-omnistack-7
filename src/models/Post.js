const mongoose = require('mongoose');

/* Um model deve exportar uma instância de Schema */

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Post', PostSchema);