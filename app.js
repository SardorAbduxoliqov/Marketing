const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/User');

const MONGODB_URI =
              'mongodb+srv://sardornode:davom.1996*@cluster0.sxtoo.mongodb.net/marketing';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRouter = require("./routes/main");
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const csrfProtection = csrf();
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(mainRouter);
app.use(errorController.get404);


mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`${port} portni eshitishni boshladim!`)
        });
    })
    .catch(err => {
        console.log(err, "Ulanishda xatolik yuzaga keldi!");
    });

