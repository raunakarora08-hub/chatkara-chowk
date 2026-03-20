const https = require('https');

https.get('https://freeimage.host/i/qOGZ6UG', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
});
