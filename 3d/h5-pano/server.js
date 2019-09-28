const express = require('express');
const path = require('path');
const app = express();
const url = require('url');
const fs = require('fs');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/'));
app.engine('.html', require('ejs').__express);
app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Visit http://localhost:' + app.get('port') + ' to run app');
});

app.use(express.static(path.join(__dirname, '/')));