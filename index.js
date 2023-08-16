const { logger } = require('./logger');
const { isAuthorized } = require('./auth');
const path = require('path');
const fs = require('fs');
const http = require('http');
const products = require('./mockData.json');

// logger('some message from index.js');
// console.log(isAuthorized());

// fs.readdir('./', (error, files) => {
//   if (error) console.log('error reading current folder');
//   else console.log(files);
// });

// fs.readFile('./node_demo_file.txt', (err, buf) => {
//   if (err) console.log(error);
//   else console.log(buf.toString());
// });

// fs.writeFile('greeting.txt', '______Hello world from index.js', (err) => {
//   if (err) console.log(err);
//   else console.log('File write successful');
// });

// const pathObj = path.parse('__');

// console.log(pathObj);

// console.log(module);

const localServer = (req, res) => {
  // Додайте ці заголовки для усіх відповідей, не тільки для специфічних URL або методів.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обробка запиту OPTIONS для preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/') {
    fs.readFile(path.join('./public/index.html'), (err, buf) => {
      if (err) console.log(err);
      else {
        res.write(buf.toString());
        res.end();
        return;
      }
    });
  }

  if (req.url === '/api/products') {
    if (req.method.toLowerCase() !== 'get') {
      res.write(`{"errorMessage": "Only GET request are allowed"}`);
      res.end();
    }
    res.write(JSON.stringify(products));
    res.end();
  }

  if (http.req.url === '/longwait') {
    res.write('');
  }

  if (req.url === '/style.css') {
    fs.readFile('./public/style.css', (err, buf) => {
      if (err) console.log(err);
      else {
        res.write(buf.toString());
        res.end();
      }
    });
  }

  if (req.url === '/script.js') {
    fs.readFile('./public/script.js', (err, buf) => {
      if (err) console.log(err);
      else {
        res.write(buf.toString());
        res.end();
      }
    });
  }
};

const server = http.createServer(localServer);
server.on('connection', (socket) => {
  console.log('new connection');
});

server.listen(3000);
console.log('server started on port 3000');
