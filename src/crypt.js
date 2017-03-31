var express = require('express');

var app = express();

app.use(express.static(`${__dirname}/resources`));
app.use(express.static(`${__dirname}/app/Presentation`));

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
        helpers: {
            section: function(name, options){
                if(!this._sections) this._sections = {};

                this._sections[name] = options.fn(this);
                return null;
            }
        }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3033);

app.use(require('body-parser').urlencoded({extended: true}));
var credentials = require('./credentials');
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}));
var home = require('./routes/home');
var adventure = require('./routes/adventure');
var gameService = require('./routes/gameService');

app.use('/adventure', adventure);
app.use('/game', gameService);
app.use('/', home);

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`The Crypt is started on http://localhost:${app.get('port')}\npress Ctrl-C to terminate.`);
});