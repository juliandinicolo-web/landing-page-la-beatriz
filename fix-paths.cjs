const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace objects array strings
  // '/fotos_generales/...' -> import.meta.env.BASE_URL + 'fotos_generales/...'
  content = content.replace(/'\/(fotos_generales|cabana_\d|video_[^/]+|logo_la_beatriz)[^']*'/g, (match) => {
    return "import.meta.env.BASE_URL + '" + match.substring(2);
  });

  // Replace JSX src attribs
  // src="/video_panoramico/..." -> src={import.meta.env.BASE_URL + 'video_panoramico/...'}
  content = content.replace(/src="\/([^"]+)"/g, (match, p1) => {
    if (p1.startsWith('fotos_generales') || p1.startsWith('video_') || p1.startsWith('logo_la_beatriz')) {
      return `src={import.meta.env.BASE_URL + "${p1}"}`;
    }
    return match;
  });

  // Replace React style urls
  // "url('/fotos...')" -> `url('${import.meta.env.BASE_URL}fotos...')`
  content = content.replace(/"url\('\/([^']+)'\)"/g, (match, p1) => {
    return "`url('${import.meta.env.BASE_URL}" + p1 + "')`";
  });

  fs.writeFileSync(file, content, 'utf8');
});
console.log('Done replacing base paths');
