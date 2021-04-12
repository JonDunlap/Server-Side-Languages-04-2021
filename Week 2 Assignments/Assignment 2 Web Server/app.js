const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const hostName = 'localhost';
const port = 8080;

http
  .createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${hostName}:${port}`);
    const parsedPath = path.parse(parsedUrl.pathname);

    const fileName = parsedPath.name ? parsedPath.name : 'index';
    const extension = parsedPath.ext ? parsedPath.ext : '.html';
    const directory = parsedPath.dir ? '' : '/';
    const page = parsedPath.name ? parsedPath.name : 'index.html';

    const fullPath = `${directory}${fileName}${extension}`.replace('/', '');

    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
    };

    fs.readFile(fullPath, (err, data) => {
      res.writeHead(200, {
        'Content-Type': mimeTypes.hasOwnProperty(extension),
      });
      // Write to the html file
      // res.write(`<script>const page = '${page}';</script>`);
      res.end(data, 'utf-8');
    });
  })
  .listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}`);
  });
