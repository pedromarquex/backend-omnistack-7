/* importando módulos */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/* iniciando o webapp com o express */
const app = express();

/* habilitando o realtime com socket.io */
const server = require('http').Server(app);
const io = require('socket.io')(server);

// connectando ao banco de dados
mongoose.connect('mongodb+srv://admin:admin@cluster0-lkeol.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

// habilitando acessos externos
app.use(cors());

// servindo arquivos staticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

//usando as rotas
app.use(require('./routes'));

server.listen(3333);