const mongoose = require('mongoose');
const { ObjectID } = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            lowercase: true
        },
        content: {
            type: {},
            required: true,
            min: 20,
            max: 2000000
        },
        user: {
            type: String,
            default: 'Admin'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);