const fs = require('fs');
const glob = require('glob');
const axios = require('axios').default;

glob('src/pages/**/*.md', async (err, files) => {
  if (err) {
    throw err;
  }
  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    let latestFileChange = fileContent;
    const gistSlugs = fileContent.match(/{% gist .*? %}/g) || [];

    for (const gistSlug of gistSlugs) {
      const gistLink = gistSlug.match(
        /(?:(?:https?):\/\/|www\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
      );

      if (gistLink.length > 0) {
        const res = await axios.get(`${gistLink[0]}/raw`);
        latestFileChange = latestFileChange.replace(
          gistSlug,
          '```js\n' + `${res.data}` + '\n```'
        );

        if (res.status === 200) {
          fs.writeFileSync(file, latestFileChange);
        }
      }
    }

    if (gistSlugs.length > 0) {
      console.info(`${file} github gist links converted to markdown`);
    }
  }
});
