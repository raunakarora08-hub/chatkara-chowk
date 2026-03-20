const https = require('https');

https.get('https://ibb.co/LX4mpfff', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log('IMG1:', match[1]);
  });
});

https.get('https://ibb.co/FLzdHJg3', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log('IMG2:', match[1]);
  });
});
