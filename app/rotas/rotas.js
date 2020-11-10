const db = require('../../config/database');
const BooksDAO = require('../infra/BooksDAO');

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log("Request a index capturado...")
        res.marko(require('../views/index.marko'));
    })
    app.get('/livros', function(req, res) {
        let booksDAO = new BooksDAO(db);
        booksDAO.list()
            .then(books => {
                console.log('Tabela de livros listada...')
                res.marko(require('../views/books/listagem/listagem.marko'), {
                    livros: books
                })
            })
            .catch(error => booksDAO.errorCall(error, app));    
    })
}

