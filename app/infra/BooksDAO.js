class BooksDAO {
    constructor(db){
        this._db = db;
    }

    list(){
        return new Promise(function(resolve, reject){
           this._db.all('SELECT * FROM livros', (error, results) => {
                if (error) return reject('Nao foi possivel acessar o banco de dados');
                return resolve(results);
           })
        })
   }

   errorCall(error, app){
        app.send(error)
   }
}

module.exports = BooksDAO;