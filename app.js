const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(passport.initialize());
app.use(cookieParser());
app.use(session({ secret: 'dayan' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/'))); // custom css/js files
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: "/books", title: "Books" }, 
  { link: "/authors", title: "Authors" } 
];

const bookRouter = require('./src/routes/bookRouter')(nav);
app.use('/books', bookRouter);

const adminRouter = require('./src/routes/adminRouter')(nav);
app.use('/admin', adminRouter);

const authRouter = require('./src/routes/authRouter')(nav);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', { 
    title: "Dayan", 
    nav
  });
});

app.listen(port, () => {
  debug(`Listening on  port ${port} ${chalk.green('YEEEEEY')}`);
});
