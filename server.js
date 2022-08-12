const config = require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const PORT = config.PORT || '5000'

const methodOverride = require('method-override')

const mongo_Db = config.mongoDB || 'mongodb://localhost/eyesCool'

mongoose.connect(mongo_Db)

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.listen(5000);