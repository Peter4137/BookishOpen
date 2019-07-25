const express = require('express');
const security = require('./authenticate');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:@localhost:4000/Bookish');
exports.db = db;
const BookRoutes = require('./controllers/BookController');
const UserRoutes = require('./controllers/UserController');

  
class Library {
    async run() {
        const app = express();
        const port = 2000;
       
        app.use(security.passport.initialize());
        app.use(security.passport.session());

        app.use('/books', BookRoutes);
        app.use('/user', UserRoutes);
        
        app.post('/login', 
            async (req, res) => {
                if (await this.checkPassword(req.query.userID, req.query.password)) {
                    res.send(jwt.sign({userID: req.query.userID}, security.opts.secretOrKey));
                }
                else {
                    res.send('Invalid username or password');
                }
            });

        app.listen(port, () => console.log(`Example app listening on port ${port}!`));

    }

    async checkPassword(userID, inputPassword) {
        const password = await db.one(`SELECT Password FROM public.users WHERE UserID = ${userID}`);

        if (password.password === inputPassword) {
            return true;

        }
        return false;
    }
}

const library = new Library();
library.run();

