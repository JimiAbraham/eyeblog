const config = require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const PORT = config.PORT || '5000'

const methodOverride = require('method-override')

const MONGO_DB = config.MONGO_DB || 'mongodb://localhost/eyesCool'


// LfU2nFTRrUPHWsUE    eyeBlog

mongoose.connect(MONGO_DB)

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.listen(5000);