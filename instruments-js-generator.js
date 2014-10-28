/**
 * Created by Chris on 10/25/2014.
 */
var fs = require('fs');
var inflection = require('inflection');

var file = fs.readFileSync('instruments.csv', {
    encoding: 'UTF-8'
});

var lines = file.split('\n');
console.log('module.exports = {');
lines.forEach(function(line){
    var row = line.split(',');
    console.log('    %s: %s,', inflection.underscore(row[0])
        .replace(' ', '')
        .replace(' ', '')
        .replace('(', '_')
        .replace('-', '_')
        .replace(')', '')
        .replace('f_x', 'fx')
        .replace(' + ', '_'), row[1]);
});
console.log('}');