
const URL = require("url");

var URIMiddleware = function (req, res, next) {
    req.uri = req.uri || new URI(req);
    next && next();
    return req.uri;
};
var URI = function (req) {
    let uri = URL.parse(req.url, true);
    let path = uri.pathname;
    if (path.endsWith("/")) {
        path = path.substr(0, path.length - 1);
    }
    path = path.split("/");
    path.shift();
    uri.path = path;
    uri.queries = uri.query;
    uri.querykeys = uri.queryargs = Object.keys(uri.queries);
    return uri;
};
URIMiddleware.URI = URI;

module.exports = URIMiddleware;
