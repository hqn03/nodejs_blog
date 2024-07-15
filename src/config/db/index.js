const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose
            .connect('mongodb://localhost:27017/f8_education_dev')
            .then(function () {
                console.log('Connected');
            });
    } catch (error) {
        console.log('Fail connecting');
    }
}

module.exports = { connect };
