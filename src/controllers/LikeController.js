const Post = require('../models/Post');

module.exports = {

    // método para guardar os likes
    async store(req, res) {
        // req.params tem os parâmetros passados pela url
        // procura um post pelo id
        const post = await Post.findById(req.params.id)

        // incrementa o número de likes
        post.likes += 1;

        // salva o post
        await post.save();

        // emite a mensagem pro socket.io
        req.io.emit('like', post);

        // retorna as informações do post com o like contabilizado
        return res.json(post);
    },
};