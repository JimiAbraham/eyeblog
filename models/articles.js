const mongoose = require('mongoose')


var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);


const articleSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    markdown: {
        required: true,
        type: String
    },

    status: {
        default: 1,
        type: String
    },

    articlePosition: {
        default: 1,
        type: String
    },

    views: {
        default: 0,
        type: Number
    },



    videoUrl: String,

    category: String,

    img: {

        data: Buffer,
        contentType: String
    },

    img2: {

        data: Buffer,
        contentType: String
    },

    slug: { type: String, slug: "title" },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

// articleSchema.pre('validate', function(next) {

//     if (this.body) {
//         this.body = htmlPurify.sanitize(this.body);
//         this.snippet = stripHtml(this.body.substring(0, 50)).result
//     }

//     next();

// });

module.exports = mongoose.model('Article', articleSchema)