const Message = require("../models/Message");
const { validationResult } = require("express-validator/check");

exports.getMainPage = async (req, res, next) =>{
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('main/main', {
        path: '/',
        pageTitle: 'Welcome!',
        errorMessage: message,
        oldInput: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationErrors: []
    });
}

exports.postMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render("main/main", {
            path: "/",
            pageTitle: "Welcome!",
            errorMessage: errors.array()[0].msg,
            oldInput: {
                name: req.body.name,
                age: req.body.age,
                phone: req.body.phone,
            },
            validationErrors: errors.array()
        })
    }
    const message = new Message({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        userId: req.user.email
    });
    message.save()
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
}