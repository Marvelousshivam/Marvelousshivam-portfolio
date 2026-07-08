async function run() {
  try {
    console.log("Fetching Apple Music browse page...");
    const htmlRes = await fetch("https://music.apple.com/us/browse", {
       headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/html"
       }
    });
    const html = await htmlRes.text();
    const jsPathMatch = html.match(/\/assets\/index[~\-][a-zA-Z0-9]+\.js/);
    if (!jsPathMatch) {
       console.log("No js file found");
       return;
    }
    const jsUrl = "https://music.apple.com" + jsPathMatch[0];
    console.log("Found JS:", jsUrl);
    
    const jsRes = await fetch(jsUrl, {
       headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const js = await jsRes.text();
    const tokenMatch = js.match(/"(eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6[^"]+)"/) || js.match(/"(eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,})"/);
    if (!tokenMatch) {
       console.log("No token found");
       return;
    }
    const token = tokenMatch[1];
    console.log("Token:", token.substring(0, 50) + "...");
    
    // Now try to search
    console.log("Testing search...");
    const searchUrl = `https://amp-api.music.apple.com/v1/catalog/us/search?types=songs&limit=1&term=${encodeURIComponent("Shape of You Ed Sheeran")}`;
    const searchRes = await fetch(searchUrl, {
       headers: {
          "Authorization": `Bearer ${token}`,
          "Origin": "https://music.apple.com"
       }
    });
    const searchData = await searchRes.json();
    console.log("Search Result keys:", Object.keys(searchData.results));
    
    const songId = searchData.results.songs.data[0].id;
    console.log("Found Song ID:", songId);
    
    // Now try to fetch lyrics
    console.log("Testing lyrics...");
    const lyricsUrl = `https://amp-api.music.apple.com/v1/catalog/us/songs/${songId}/lyrics`;
    const lyricsRes = await fetch(lyricsUrl, {
       headers: {
          "Authorization": `Bearer ${token}`,
          "Origin": "https://music.apple.com"
       }
    });
    
    console.log("Lyrics HTTP Status:", lyricsRes.status);
    if (lyricsRes.status === 200) {
       const lyricsData = await lyricsRes.json();
       console.log("Lyrics returned successfully!");
       console.log(lyricsData.data[0].attributes.ttml.substring(0, 200));
    } else {
       const errorData = await lyricsRes.text();
       console.log("Lyrics Error:", errorData);
    }
    
  } catch (e) {
     console.error(e);
  }
}
run();
