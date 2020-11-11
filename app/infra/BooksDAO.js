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

   add(obj){
      return new Promise(function(resolve, reject){
           this._db.run(`INSERT INTO books (
               title, 
               price, 
               discription
          ) values (?,?,?)`
          , 
          [
               obj.titulo,
               obj.preco,
               obj.descricao
          ]
          ,
           (error) => { 
               if(error) return reject('Nao foi possivel inserir no banco de dados os valores informados')
               return resolve('Dados inseridos com sucesso...');
           })
      })
   }

}

module.exports = BooksDAO;