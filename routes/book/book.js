const express = require('express');
const router = express.Router();


// GET /test route to test the server is working properly 

router.get('/', (req, res) => {
    res.json({ message: 'Test route is working properly' });
    }
);

function routes(Book){
        const kitapController = require('../../controllers/BookController')(Book);

        // route to get all books.
        router.route('/books')
            .get(kitapController.index);

        // route to post a book.
        router.route('/books')
            .post(kitapController.post);

            // route to update a book by id.
        router.use('/books/:bookId', (req, res, next) => {
            Book.findById(req.params.bookId, (err, book) => {
                if(err) return res.send(err);
                if(book){
                    req.book = book;
                    return next();
                }
                return res.sendStatus(404);
            });
        });

        // get book by genre.
        router.route('/books/:bookId')
            .get(kitapController.getByGenre);

        // delete book by id.
        router.route('/books/:bookId')
            .delete(kitapController.deleteBook);
            
        return router;
    
}

module.exports = routes;