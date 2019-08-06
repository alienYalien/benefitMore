var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var configs = require('./configs');//require(process.argv[2]);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type");
    next();
});
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** session */
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge: configs.config.session.time // default session expiration is set to 1 hour
    }
}));

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//根据文件名自动整体配置 routes 文件夹  ps:文件命名规则要规范
var fs = require('fs');
var routesPath = path.join(__dirname,'routes');
var files = fs.readdirSync(routesPath);
files.forEach(function(item) {
    var file = item.toString();
    var fileName = file.substr(0, file.indexOf("."));
    console.log("add Routes:"+fileName);
    var routes = require('./routes/'+fileName);
    app.use('/', routes);
});

//mysql

var db = require('./utils/db');
db.init(configs.config.mysql);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
