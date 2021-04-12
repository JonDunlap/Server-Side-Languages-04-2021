const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

http
  .createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost:8080');
    const pathName = path.parse(parsedUrl.pathname);
    const fileName = pathName.name ? pathName.name : 'index';

    console.log(fileName);

    fs.readFile(`${fileName}.html`, (err, data) => {
      res.writeHead(200);
      // Write to the html file
      res.write(`<script>let name = 'Jon';</script>`);
      res.end(data);
    });
  })
  .listen('8080');
