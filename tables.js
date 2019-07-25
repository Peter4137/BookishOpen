const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'postgres://postgres:@localhost:4000/Bookish',
    {define : {timestamps : false}});

const Op = Sequelize.Op;


const Model = Sequelize.Model;
class User extends Model {}
class Book extends Model {}
class BorrowedBook extends Model {}

User.init({
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey : true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});




Book.init({
    bookid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey : true
    },
    isbn: {
        type: Sequelize.STRING,
        allowNull: false
    },
    barcode: {
        type: Sequelize.STRING
    },
    bookname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'book'
});


BorrowedBook.init({
    userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'userid',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
    },
    bookid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    duedate: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'borrowedbook'
});




exports.UserTable = User;
exports.BookTable = Book;
exports.BorrowedBookTable = BorrowedBook;
exports.Op = Op;

Book.findAll(
    {where: {
        bookname: 'test'
    }}
).then(books => {
    console.log('All books:', JSON.stringify(books, null, 4));
});


