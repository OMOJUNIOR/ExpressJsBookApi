const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model for BookList collection in MongoDB.

const BookListSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Kitap başlığı girilmelidir.']
    },

    author: {
        type: String,
        required: [true, 'Kitap yazarı girilmelidir.']
    },

    genre: {
        type: String,
        required: [true, 'Kitap türü girilmelidir.']
    },

    read: {
        type: Boolean,
        default: false
    },

    year: {
        type: Number,
        required: [true, 'Kitap yılı girilmelidir.']

    }
});
    
   