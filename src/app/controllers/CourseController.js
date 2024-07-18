const { query } = require('express');
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
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => {
                res.render('courses/edit', course);
            })
            .catch((error) => {});
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        Course.findByIdAndUpdate(req.params.id, formData, { lean: true })
            .then((query) => {
                res.redirect('/me/stored/courses');
            })
            .catch();
    }
}

module.exports = new CourseController();
