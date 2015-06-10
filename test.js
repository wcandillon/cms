var CMSParser = require('./CMSParser').CMSParser;
var JSONParseTreeHandler = require('./JSONParseTreeHandler').JSONParseTreeHandler;
var TreeOps = require('./TreeOps').TreeOps;

//var source = 'Faqs[@title=~"NoSQL"]{@title}.answers{@score}';
var source = 'ApplicationService[@name="srp-app:Raptor"]{@name, @activeManifestDiff, @updateStrategies}';
//var source = 'Rack[@resourceId="LVS:LVS01:01-400:16:05"].assets[@assetType="Server"]{@resourceId,@assetType,@healthState,@healthState._lastmodified,@manufacturer,@locationCode}.asset!AssetServer{*}';
var handler = new JSONParseTreeHandler(source);
var parser = new CMSParser(source, handler);
parser.parse_Query();
console.log(TreeOps.astAsXML(handler.getParseTree()));
