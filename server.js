const config = require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const PORT = process.env.PORT || '5000'

const methodOverride = require('method-override')

//const MONGO_DB = config.MONGO_DB || 'mongodb://localhost/eyesCool'

//console.log(process.env.MONGO_DB)

const MONGO_DB = process.env.MONGO_DB
    // LfU2nFTRrUPHWsUE    eyeBlog

mongoose.connect(MONGO_DB)

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)


app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});