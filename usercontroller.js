const Router = require('express').Router;
const security = require('../authenticate');
const db = require('../index').db;
const Sequelize = require('sequelize');

class UserController { //all returns are json objects - sort out format in the front end
    constructor() {
        this.router = Router();
        this.auth = security.passport.authenticate('jwt', { session: false });

        this.router.get(
            '/mybooks',
            this.auth,
            async (req, res) => {
                res.send(await this.getUserBooks(req.query.userid));
            }
        );
    }

    async getUserBooks(userid) {
        const userBooks = await db.any('SELECT borrowedbooks.bookid, duedate, bookname from borrowedbooks JOIN books ON books.bookid = borrowedbooks.bookid WHERE userid = $1',[userid]);
        return userBooks; 
    }
}

module.exports = new UserController().router;