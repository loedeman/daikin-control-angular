var http = require('http');
var url = require('url');

function get(ip, path, successCallback, errorCallback) {
    var options = {
        host: ip,
        port: 80,
        path: path
    };

    console.log(options);
    http.get(options, successCallback).on("error", errorCallback).end();
}

function transformResponseData(responseData) {
    var result = {};

    var keyValuePairs = responseData.split(',');
    keyValuePairs.forEach(function (keyValuePairString) {
        var keyValuePair = keyValuePairString.split('=');
        result[keyValuePair[0]] = keyValuePair[1];
    }, this);

    return result;
}

http.createServer(function (request, response) {
    var method = request.method;
    var queryData = url.parse(request.url, true).query;

    if (!queryData.ip) {
        console.error('No IP adress specified.');
        response.writeHead(400, 'Bad Request');
        response.end('');
        return;
    }

    if (method === 'POST') {
        response.writeHead(204, 'No content');
        response.end('');
        return;
    }

    else if (method === 'GET') {
        if (!queryData.uri) {
            console.error('No URL specified.');
            response.writeHead(400, 'Bad Request');
            response.end('');
            return;
        }
        else if (queryData.uri !== '/aircon/get_sensor_info' && queryData.uri !== '/aircon/get_control_info') {
            console.error('Unexpected URL specified.');
            response.writeHead(405, 'Method Not Allowed');
            response.end('');
            return;
        }

        get(queryData.ip, queryData.uri, function (resp) {
            console.log(resp);
            response.writeHead(200, { 'content-type': 'text/html, level=1' });
            var responseData = '';
            resp.on('data', function (chunk) {
                console.log(chunk);
                //do something with chunk
                responseData += chunk;
            });
            resp.on('end', function () {
                console.log('end called');
                var responseObj = transformResponseData(responseData);
                var responseJson = JSON.stringify(responseObj);
                response.write(responseJson);
                response.end('');
            });
        }, function (error) {
            console.log("Got error: " + error.message);
        });
    }

    else {
        response.writeHead(405, 'Method Not Allowed');
        response.end('');
    }

}).listen(process.env.PORT);

// Console will print the message
console.log('Server running at http://127.0.0.1:' + process.env.PORT + '/');