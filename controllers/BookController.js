function bookController(Book){
    function index(req, res){
        const query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if(err) return res.status(500).send(err);
            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
                return newBook;
            });
            return res.json(returnBooks);
        });

    }

    function post(req, res){
        const book = new Book(req.body);
        if(!req.body.title){
            res.status(400);
            return res.send('Kitap başlığı girilmelidir.');
        }if(!req.body.author){
            res.status(400);
            return res.send('Kitap yazarı girilmelidir.');
        }if(!req.body.genre){
            res.status(400);
            return res.send('Kitap türü girilmelidir.');
        }if(!req.body.year){
            res.status(400);
            return res.send('Kitap yılı girilmelidir.');
        }
        book.save();
        res.status(201);
        return res.json(book);
    }

    function getByGenre(req, res){
        const returnBook = req.book.toJSON();
        returnBook.links = {};
        const genre = req.book.genre.replace(' ', '%20');
        returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
        res.json(returnBook);
    }

    function updateBook(req, res){
        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.year = req.body.year;
        book.read = req.body.read;
        req.book.save((err) => {
            if(err) return res.send(err);
            return res.json(book);
        });
    }

    function deleteBook(req, res){
        req.book.remove((err) => {
            if(err) return res.send(err);
            return res.sendStatus(204);
        });
    }

    function patchBook(req, res){
        const { book } = req;
        if(req.body._id){
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        req.book.save((err) => {
            if(err) return res.send(err);
            return res.json(book);
        });
    }



    return { index, post, getByGenre , updateBook, deleteBook, patchBook};

}

module.exports = bookController;