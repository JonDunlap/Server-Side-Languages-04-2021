const fs = require('fs'),
  http = require('http'),
  path = require('path'),
  { URL } = require('url');

// Variable for the hostname and port that the server is listening on
const hostName = 'localhost',
  port = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
};

// Create the server
http
  .createServer((request, response) => {
    // Replaced url.parse with the new WHATWG URL API
    // url.parse was replaced in version 15.13.0, see: https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
    const parsedUrl = new URL(request.url, `http://${hostName}:${port}`);

    // Example from: https://adrianmejia.com/building-a-node-js-static-file-server-files-over-http-using-es6/,
    // this method sanitizes the path and prevents traversal attacks by limiting the path to the current directory
    const sanitizePath = path
      .normalize(parsedUrl.pathname)
      .replace(/^(\.\.[\/\\])+/, '');
    // Join the sanitized path with the directory name of the current module
    let pathName = path.join(__dirname, sanitizePath);

    // Check if the path name is the current directory and if so set the path name to /index.html
    if (fs.statSync(pathName).isDirectory()) {
      pathName += '/index.html';
    }

    // Basename of the file i.e... "index.html"
    const baseName = path.basename(pathName);
    // Get the extension of the file from the path name
    const extension = path.parse(pathName).ext;

    fs.readFile(pathName, (error, data) => {
      response.writeHead(200, {
        'Content-Type': mimeTypes[extension] || 'text/plain',
      });
      // Write to the html file
      response.write(`<script>const page = '${baseName}';</script>`);
      response.end(data, 'utf-8');
    });
  })
  .listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}`);
  });
