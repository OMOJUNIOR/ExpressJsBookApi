const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const testRouter = require('./routes/test');
const mongoose = require('mongoose');
const Book = require('./model/BookList');
const bookRouter = require('./routes/book/book')(Book);




const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', testRouter);
app.use('/api', bookRouter);

module.exports = app;
