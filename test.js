var CMSParser = require('./CMSParser').CMSParser;
var JSONParseTreeHandler = require('./JSONParseTreeHandler').JSONParseTreeHandler;
var TreeOps = require('./TreeOps').TreeOps;

var source = 'Faqs[@title=~"NoSQL"]{@title}.answers{@score}';
var handler = new JSONParseTreeHandler(source);
var parser = new CMSParser(source, handler);
parser.parse_Query();
console.log(TreeOps.astAsXML(handler.getParseTree()));
