const path = require('path');
const fs = require('fs');
const map = require('./map.json');

const baseDir = path.join(__dirname, 'articles');

const mapFile = path.join(__dirname, 'map.json');

const dirList = fs.readdirSync(baseDir);

map.sections.forEach((section, index) => {
  if (dirList.find(d => d === section.id))
    map.sections[index].articles = 
      fs.readdirSync(path.join(baseDir, section.id));
});

fs.writeFileSync(
  mapFile, 
  JSON.stringify(map, null, 2)
);