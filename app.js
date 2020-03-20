const https = require('https');
const http = require('http');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/daihocgiadinh.vn/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/daihocgiadinh.vn/fullchain.pem')
};
// Passport Config
require('./config/passport')(passport);
//require('./config/passportForAdmin')(passport);

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 5001;
var httpsServer = https.createServer(options, app);
var httpServer = https.createServer(app);


httpsServer.listen(PORT, console.log(`Server started on port ${PORT}`));
httpServer.listen(PORT2, console.log(`Server started on port ${PORT2}`));
