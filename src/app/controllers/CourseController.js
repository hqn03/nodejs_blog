const Course = require('../models/Course');

class CourseController {
    //[GET] /courses/:slug
    async show(req, res, next) {
        await Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('courses/show', course);
            })
            .catch(next);
    }

    //[GET] //courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] //courses/store
    async store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new Course(formData);
        course.save();
        res.send(course);
    }
}

module.exports = new CourseController();
