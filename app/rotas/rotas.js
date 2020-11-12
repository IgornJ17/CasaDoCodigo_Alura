const db = require('../../config/database');
const BooksDAO = require('../infra/BooksDAO');


/* Definindo todos os rotas a serem aplicadas para cada request que o cliente executar em nossa aplicacao*/

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


    app.get('/livros/form', function(req, res){
        res.marko(require('../views/books/form/form.marko'), { livros: {} })
    })


    app.post('/livros', function(req, res){
        const formData = req.body;

        let booksDAO = new BooksDAO(db);
        booksDAO.add(formData)
        .then(function(sucess){
            console.log(sucess);
            res.redirect('/livros')
        })
        .catch(function(error){
            booksDAO.errorCall(error, app);
            return 1;
        })

    })

    app.put('/livros', function(req, res){
        const formData = req.body;

        let booksDAO = new BooksDAO(db);
        booksDAO.update(formData)
        .then(function(){res.redirect('/livros')})
        .catch(function(error){
            booksDAO.errorCall(error, app);
            return 1;
        })

    })


    app.delete('/livros/:id', function(req, res){
        let id = req.params.id;

        let booksDAO = new BooksDAO(db);
        
        booksDAO.remove(id).then(function(){
            console.log("Remocao de livro efetuada com sucesso")
            res.status(200).end(); //Response com status 200 e finalizacao do state
        })
        .catch(err => booksDAO.errorCall(err, app))
    })

    app.get('/livros/form/:id', function(req, res){
        let id = req.params.id;
        let booksDAO = new BooksDAO(db);

        booksDAO.searchForId(id)
        .then(result => {
            res.marko(require('../views/books/form/form.marko'),
            { livros: result }
            );
        })
        .catch(erro => {
            booksDAO.errorCall(erro, app);
            return 1;
        })
    })
}

