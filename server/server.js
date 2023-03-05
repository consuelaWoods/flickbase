const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');

const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');

const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const routes = require ('./routes');
const { handleError, convertToApiError } = require('./middleware/apiError');

const mongouri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongouri);

//middleware - parsing
app.use(bodyParser.json())

//middleware - sanitize
app.use(xss());
app.use(mongoSanitize());

//middleware - passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// ROUTES
app.use('/api', routes);
app.use(convertToApiError);
app.use((err, req, res, next) => {
    handleError(err, res)
});

// FOR HEROKU
app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client','build','index.html'))
    })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});