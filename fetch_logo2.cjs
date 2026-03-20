const https = require('https');

https.get('https://freeimage.host/i/whatsapp-image-2026-03-20-at-10352-pm.qOGZ6UG', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log('LOGO:', match[1]);
    } else {
      const imgMatch = data.match(/<img[^>]+src="([^"]+)"[^>]*>/g);
      console.log('Images:', imgMatch);
    }
  });
});
