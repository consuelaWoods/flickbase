const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, 'You need a title'],
    },
    content: {
        type: String,
        required: [true, 'You need some content']
    },
    excerpt: {
        type: String,
        required: [true, "Please add an excerpt"],
        maxLength: 500
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true,
        validate: {
            validator: function(array) {
                return array.length >= 3
            },
            message: 'You must add at least 3 actors'
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'public'],
        default: 'draft',
        index: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        default: '6403e7677174846c35d76cd7'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article };