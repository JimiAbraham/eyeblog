const express = require('express');

const mongoose = require('mongoose');

const PORT  = process.env.PORT || '5000'

const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/eyesCool')

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)


//app.listen(5000);

app.set("port",PORT )
