const multer = require('multer');
const path = require('path');

/* Esse arquivod de configuração deve exportar um objeto com as 
configurações do multer para upload de arquivos */

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
};