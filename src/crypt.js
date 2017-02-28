var express = require('express');

var app = express();

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

var index = require('./routes/index');

app.use('/', index);

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