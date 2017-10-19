/* jshint esversion: 6 */
const clients = require('restify-clients');

module.exports = (config) => {
    return (query, callback) => {
        const client = clients.createJsonClient({ url: `https://${config.searchName}.search.windows.net/` });
        var urlPath = `/indexes/${config.indexName}/docs?api-key=${config.searchKey}&api-version=2015-02-28&${query}`;

        client.get(urlPath, (err, request, response, result) => {
            if (!err && response && response.statusCode == 200) {
                callback(null, result);
            } else {
                callback(err, null);
            }
        });
    };
};
