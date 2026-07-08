const m = require('musicstream-sdk');
async function test() {
  const reg = new m.LyricsRegistry();
  const lyrics = await reg.getLyrics('Shape of You', 'Ed Sheeran');
  console.log(JSON.stringify(lyrics, null, 2));
}
test();
