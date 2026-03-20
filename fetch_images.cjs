const https = require('https');

https.get('https://ibb.co/7Nj9n6NS', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log('IMG1 (Figurines):', match[1]);
  });
});

https.get('https://ibb.co/mKPHVPL', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log('IMG2 (Handkerchiefs):', match[1]);
  });
});
