const http = require('http');

http.get('http://localhost:5001/api/packages', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('GET Status:', res.statusCode);
    const packages = JSON.parse(data);
    console.log('Packages count:', packages.length);
    process.exit(0);
  });
}).on('error', err => {
  console.error('HTTP Error:', err.message);
  process.exit(1);
});
