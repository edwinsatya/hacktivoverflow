const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(`mongodb://localhost:27017/hacktiv-overflow-${process.env.NODE_ENV}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, err => {
        if (err) console.log('Failed To Connect DB');
        else console.log(`Connected To DB hacktiv-overflow-${process.env.NODE_ENV}`);
    })
}