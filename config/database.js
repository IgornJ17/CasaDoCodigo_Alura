const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db');

const SCHEMA_USERS = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name VARCHAR(40) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
    )
`;

const INSERT_USER_1 = `
        INSERT INTO user (
            full_name,
            email,
            senha
        ) SELECT 'Joao Batista', 'joaobatista@hotmail.com', '1234' WHERE NOT EXIST (SELECT * FROM users WHERE email = 'joaobatista@hotmail.com')
`;

const BOOKS_SCHEMA = `
        CREATE TABLE IF NOT EXIST books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(50) NOT NULL,
            autor VARCHAR(100),
            ano DATE,
            price REAL NOT NULL,
            discription VARCHAR(255) 
        )
`;

const INSERT_BOOK_1 = `
    INSERT INTO books (
        title,
        price,
        discription
    ) SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Node na prática')
`;

const INSERT_BOOK_2 = `
    INSERT INTO books (
        title, 
        price,
        discription
    ) SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'JavaScript na prática')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(SCHEMA_USERS);
    db.run(INSERT_USER_1);
    db.run(BOOKS_SCHEMA);
    db.run(INSERT_BOOK_1);
    db.run(INSERT_BOOK_2);

    db.each("SELECT * FROM users", (err, user) => {
        console.log('Usuario: ');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('db encerrado!');
        process.exit(0);
    })
);


module.exports = db;