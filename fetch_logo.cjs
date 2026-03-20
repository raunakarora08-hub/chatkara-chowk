const https = require('https');

https.get('https://freeimage.host/i/qOGZ6UG', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log('LOGO:', match[1]);
    } else {
      console.log('No og:image found');
    }
  });
});
