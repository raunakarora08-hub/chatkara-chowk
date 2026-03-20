const fs = require('fs');
const data = fs.readFileSync('output.html', 'utf8');
const urls = data.match(/https:\/\/[^"'\s]+\.(png|jpg|jpeg|gif|webp)/g);
if (urls) {
  console.log([...new Set(urls)]);
} else {
  console.log("No image URLs found.");
}
