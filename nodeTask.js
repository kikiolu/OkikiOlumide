const http = require('http');
const { parse } = require('querystring');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // Handle post info...
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Message has been saved to ${result.fname}`);
        });
    } else {
        res.end(`
        <!doctype html>
        <html>
        <body>
            <form action="/message.txt" method="post">
                <textarea type="text" name="fname" ></textarea>
                                
                <button>Submit</button>
            </form>
        </body>
        </html>
      `);
    }
});
server.listen(8080);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}
