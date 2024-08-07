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
                res.redirect('/me/stored/courses');
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

    // SOFT-DELETE
    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteById(req.params.id)
            .lean()
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .lean()
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // FORCE-DELETE
    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
