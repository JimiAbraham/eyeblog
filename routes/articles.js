const express = require('express');

const { route } = require('express/lib/application');
// import stripHtml from "string-strip-html";

const domPurifier = require('dompurify');

const { JSDOM } = require('jsdom');

const htmlPurify = domPurifier(new JSDOM().window)

const router = express.Router();

const path = require("path");


const multer = require("multer");

const fs = require("fs");

const Article = require('./../models/articles')


// SET STORAGE
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});




router.get('/article-category', async(req, res) => {

    const cat = req.query.category;

    // res.send('page worked but no content');
    const articleCategory = await Article.find({ category: cat })

    //console.log(articleCategory);

    res.render('categoryPost', { category: articleCategory, cat });
});


router.get('/aboutMe', async(req, res) => {

    res.render('jimi');
})



router.get('/contact', async(req, res) => {

    res.render('contact');
})


router.get('/category', (req, res) => {
    res.render('category');
});




router.get('/', async(req, res) => {


    const articles = await Article.find().sort({ createdAt: 'desc' });


    const heroArticles = await Article.find({ articlePosition: '3' });

    const featuredArticles = await Article.find({ articlePosition: '2' });



    //console.log(articles);

    res.render('index', { articles: articles, homeArticles: heroArticles, featuredArticles: featuredArticles })


});




router.get('/admin', (req, res) => {

    res.render('admin/admin')
});

router.get('/admin-add-new-post', (req, res) => {

    res.render('admin/add-post', { oldArticle: new Article() })
});




// db.collection.find({
//     "contractInfo.userid": "yourid"
//   })



router.get('/admin-:id', async(req, res) => {

    const article = await Article.findById(req.params.id)


    //console.log(article);

    if (article == null) res.redirect('/admin')

    res.render('admin/show', { JustSavedData: article });

});


router.post('/', upload.single('pic1'), async(req, res) => {

    let article = new Article({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        markdown: req.body.markdown,


        img: {
            data: fs.readFileSync(path.join("./uploads/" + req.file.filename)),
            contentType: 'image/png'
        }

    });
    // console.log(req.file.filename);

    try {
        article = await article.save()
        res.redirect(`/articles/admin-${article.id}`)
    } catch (e) {
        console.log(e);
        res.render('admin/add-post', { oldArticle: article })

    }


})


// all post on admin panel

router.get('/admin/all-post', async(req, res) => {


    const allArticles = await Article.find().sort({ createdAt: 'desc' });

    res.render('admin/post-list', { allArticles: allArticles })
})





// update post postiion

router.post('/admin/updatePostPosition/:id', async(req, res) => {

    //res.send('i think it worked and here is the ID:' + req.params.id)

    // const UpdatePosition = await Article.findOne({ _id: req.params.id })

    let updatePosition = Article.findByIdAndUpdate(req.params.id, { articlePosition: req.body.position },

        function(err, updatePosition) {
            if (err) {
                res.render('admin/post-list');
            } else {
                console.log('updated')
                res.redirect('/articles/admin/all-post');
            }
        });


    // res.render('admin/post-list', { allArticles: allArticles })
})


router.delete('/admin-:id', async(req, res) => {

    await Article.findByIdAndDelete(req.params.id)

    res.redirect('/articles/admin/all-post')

});



router.get('/:slug', async(req, res) => {

    const articleDetails = await Article.findOne({ slug: req.params.slug })




    //console.log(similar)

    if (articleDetails == null) {
        res.redirect('/')
    } else {
        var similar = await Article.find({ category: { $ne: articleDetails.category } }).limit(3);


        res.render('details', {
            JustSavedData: articleDetails,
            similar: similar
        });
    }

});






// module.exports = router

module.exports = router