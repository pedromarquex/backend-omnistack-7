// importando módulos úteis
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController');

// iniciando o router
const routes = new express.Router();

// iniciando o middleware multer pra receber multpart form data
const upload = multer(uploadConfig);

// rotas para os posts
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

// rotas para os likes
routes.post('/posts/:id/like', LikeController.store);

// exportando as rotas
module.exports = routes;