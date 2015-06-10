var fs = require('fs');
var request = require('request');
var FormData = require('form-data');
var path = require('path');
var Q = require('q');

var promises = [];
var grammars = [{
    source: 'CMSParser.ebnf',
    destination: 'CMSParser.js',
    command: '-ll 2 -tree -javascript -a cms',
    tz: '-60'
}];

request = request.defaults({'proxy':'http://127.0.0.1:8888'});

grammars.forEach(function(parser){
    var deferred = Q.defer();
    var grammar = fs.readFileSync(parser.source);
    var form = new FormData();
    form.append('tz', parser.tz, { knownLength: new Buffer(parser.tz).length, contentType: 'text/plain'  });
    form.append('command', parser.command, { knownLength: new Buffer(parser.command).length, contentType: 'text/plain' });
    form.append('input', grammar, { knownLength : new Buffer(grammar).length, contentType: 'text/plain', filename: path.basename(parser.source) });
    var length = form.getLengthSync();
    var r = request.post('http://www.bottlecaps.de/rex/', function(err, res, body) {
        if(err) {
            deferred.reject(err);
        } else {
            fs.writeFileSync(parser.destination, body);
            deferred.resolve();
        }
    });
    r._form = form;
    r.setHeader('content-length', length);
    promises.push(deferred.promise);
});
Q.all(promises)
    .then(function(){
        console.log('done');
    })
    .catch(function(error){
        console.error(error);
    });
