const Router = require('express').Router;
const security = require('../authenticate');
const Book = require('../book').Book;
const db = require('../index').db;
const BookTable = require('../tables').BookTable;
const Op = require('../tables').Op;


class BookController { //all returns are json objects - sort out format in the front end
    constructor() {
        this.router = Router();
        this.auth = security.passport.authenticate('jwt', { session: false });

        this.router.get(
            '/all',
            this.auth,
            async (req, res) => {
                res.send(await this.getAllBooks());
            }
        );

        this.router.post(
            '/add',
            this.auth,
            async (req, res) => {
                const newBook = new Book(req.query.name, req.query.author, req.query.isbn);
                await this.addBook(newBook);
                res.send('Added book to database!');
            }
        );

        this.router.get(
            '/search',
            this.auth,
            async (req, res) => {
                res.send(await this.search(req.query.name, req.query.author));
            }
        );
        this.router.get(
            '/copies',
            this.auth,
            async (req, res) => {
                res.send(await this.getCopies(req.query.name));
            }
        );
    }

    async getCopies(name) {
        const allCopies = await db.many(
            'SELECT books.*, userid, duedate FROM Books LEFT OUTER JOIN borrowedbooks ON books.bookid = borrowedbooks.bookid WHERE bookname = $1',
            [name]
        );
        return allCopies;
    }

    async search(name, author) {
        const results = await BookTable.findAll(
            {where: {
                [Op.or]: [{'bookname': name}, {'author': author}]
            }}
        );
        
        return results;
    }

    async addBook(info) {
        db.none('INSERT INTO Books (ISBN, BookName, Author) VALUES ($1,$2,$3)', [info.isbn, info.name, info.author]);
    }

    async getAllBooks() {
        const allBooks = [];
        const booksFromDatabase = await db.many('SELECT * FROM public.books ORDER BY bookname;');
        booksFromDatabase.forEach(item => {
            allBooks.push(new Book(item.bookname, item.author, item.isbn, item.bookid));
        });
        return allBooks;
    }
}

module.exports = new BookController().router;