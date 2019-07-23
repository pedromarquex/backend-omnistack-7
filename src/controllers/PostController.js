const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path')
const fs = require('fs')

/* um controller deve exportar funções assíncronas que serão
pelas rotas (endpoints) */

module.exports = {
    // metodo que faz a listagem de todos os posts
    async index(req, res) {
        // busca os posts em ordem decrescente de criação
        // mais recentes primeiro
        const posts = await Post.find().sort('-createdAt');

        // retorna todos os posts em formato de json
        return res.json(posts);
    },

    // método que guarda as informações de um post
    async store(req, res) {
        // req.body tem o corpo da requisição
        // req.file tem o arquivo enviado na requisição

        // pega as informações da requisição e guarda em variáveis separadas
        const { author, place, description, hashtags } = req.body;
        // as informações sobre o arquivo que foi passado na requisição
        // vêm separadas do corpo da requisição
        const { filename: image } = req.file;

        // muda a extenção do arquivo de foto e guarda em uma variável
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;


        // manipulando a imagem, mudando o tamanho em pixels, qualidade
        // e guardando em outro diretório
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            );

        // deletando a imagem original
        fs.unlinkSync(req.file.path);

        // cria o Post no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        // emite uma mensagem para o socket.io que vai ser usada na
        // comunicação em tempo real
        req.io.emit('post', post);

        // retorna as informações do post salvo no banco de dados em 
        // formato de json
        return res.json(post);
    },
};