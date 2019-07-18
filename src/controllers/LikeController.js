const Post = require('../models/Post');

module.exports = {

    async store(req, res) {
        // req.params tem os parâmetros passados pela url
        const post = await Post.findById(req.params.id)

        post.likes += 1;

        await post.save();

        req.io.emit('post', post);

        return res.json(post);
    },
};