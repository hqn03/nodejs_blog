const Course = require('../models/Course');

class MeController {
    index(req, res, next) {
        res.send('Thong tin nguoi dung');
    }

    // [GET] /me/stored/coursed
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('me/stored-courses', { courses });
            })
            .catch();
    }

    // [GET] /me/trash/coursed
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => {
                res.render('me/trash-courses', { courses });
            })
            .catch();
    }
}

module.exports = new MeController();
