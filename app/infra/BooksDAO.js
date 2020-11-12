/*Aplicando o padrao de projeto DAO - Data Acess Object*/

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
     
     searchForId(id){
          return new Promise(function(resolve, reject){
               
               this._db.all(`SELECT * FROM books WHERE id=${id}`, function(error, result){
                    if (error) return reject("Nao foi possivel localizar o Livro informado");
                    return resolve(result);
               }) 
          })
     }

     update(obj){
          return new Promise((resolve, reject) => {
               this._db.run(`
               UPDATE books SET
               title = ?,
               price = ?,
               discripiton = ?
               WHERE id = ?
               `,
               [
               obj.titulo,
               obj.preco,
               obj.descricao,
               obj.id
               ],
               erro => {
               if (erro) {
                    return reject('Não foi possível atualizar o livro!');
               }

               resolve();
               });
          });
     }

     remove(id) {
          return new Promise((resolve, reject) => {
               this._db.run(
               `
                    DELETE 
                    FROM books
                    WHERE id = ?
               `,
               [id],
               (erro) => {
                    if (erro) {
                         return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
               }
               );
          });
     }
     
}

module.exports = BooksDAO;