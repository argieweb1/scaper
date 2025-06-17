const express = require('express');
const app = express()
const PORT = process.env.PORT || 3001;
const Routes = require('./Controllers/api/api');
const path = require('path');

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // ✅ Serves static files

//Use api routes
app.use('/api');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build', 'index.html')));

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
      });
}

app.listen(PORT, function(err) {
    if (err) console.log(err);
    console.log('API server is listening on port ' + PORT);
});




