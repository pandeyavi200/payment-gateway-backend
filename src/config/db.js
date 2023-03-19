const mongoose = require('mongoose')

// To make connection to DB
function connects() {
    return mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('db conected');
        }).catch((error) => {
            console.log(error);
        })
}
module.exports = connects;
