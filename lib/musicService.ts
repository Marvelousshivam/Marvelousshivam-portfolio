export const SAAVN_API = process.env.NEXT_PUBLIC_SAAVN_API || "https://jiosaavn-api.shivamrajuniverse616.workers.dev/api";
export const YTM_API = process.env.NEXT_PUBLIC_YTM_API || "https://music-cgd8.onrender.com/api";

export interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  src: string;
  duration?: number;
  source: 'saavn' | 'ytm';
}

export interface LyricWord {
  time: number;
  text: string;
  duration?: number;
}

export interface LyricLine {
  time: number;
  text: string;
  words?: LyricWord[];
  duration?: number;
}

export const fetchHomePlaylists = async () => {
  try {
    const [enRes, hiRes, trRes] = await Promise.allSettled([
      fetch(`${SAAVN_API}/search/playlists?query=top english&limit=8`).then(r => r.json()),
      fetch(`${SAAVN_API}/search/playlists?query=top hindi&limit=8`).then(r => r.json()),
      fetch(`${SAAVN_API}/search/playlists?query=trending&limit=8`).then(r => r.json())
    ]);
    const sections = [];
    if (enRes.status === 'fulfilled' && enRes.value.success) {
      sections.push({ title: 'Top English', items: enRes.value.data.results });
    }
    if (hiRes.status === 'fulfilled' && hiRes.value.success) {
      sections.push({ title: 'Top Hindi', items: hiRes.value.data.results });
    }
    if (trRes.status === 'fulfilled' && trRes.value.success) {
      sections.push({ title: 'Trending', items: trRes.value.data.results });
    }
    return sections;
  } catch (e) {
    console.error("Home fetch failed", e);
    return [];
  }
};

export const searchMusic = async (query: string): Promise<Track[]> => {
  if (!query) return [];
  try {
    const [saavnRes, ytmRes] = await Promise.allSettled([
      fetch(`${SAAVN_API}/search/songs?query=${encodeURIComponent(query)}&limit=10`).then(r => r.json()),
      fetch(`${YTM_API}/search?q=${encodeURIComponent(query)}&filter=songs`).then(r => r.json())
    ]);

    let combined: Track[] = [];

    if (saavnRes.status === 'fulfilled' && saavnRes.value.success) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sTracks = saavnRes.value.data.results.map((t: any) => {
        return {
          id: `saavn-${t.id}`,
          name: t.name,
          artist: t.primaryArtists || t.artists?.primary?.[0]?.name || "Unknown",
          albumArt: t.image?.[2]?.link || t.image?.[t.image?.length - 1]?.url || "",
          src: t.downloadUrl?.[t.downloadUrl?.length - 1]?.link || t.downloadUrl?.[t.downloadUrl?.length - 1]?.url || "",
          duration: t.duration,
          source: 'saavn' as const
        };
      }).filter((t: Track) => t.src !== "");
      combined = [...combined, ...sTracks];
    }

    if (ytmRes.status === 'fulfilled' && Array.isArray(ytmRes.value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const yTracks = ytmRes.value.slice(0, 5).map((t: any) => {
        return {
          id: `ytm-${t.videoId}`,
          name: t.title,
          artist: t.artists?.map((a: { name: string }) => a.name).join(', ') || "Unknown",
          albumArt: t.thumbnails?.[t.thumbnails?.length - 1]?.url || "",
          src: `${YTM_API}/stream/${t.videoId}`,
          source: 'ytm' as const
        };
      });
      combined = [...combined, ...yTracks];
    }

    return combined;
  } catch (error) {
    console.error("Search failed", error);
    return [];
  }
};

export const fetchPlaylistTracks = async (id: string): Promise<Track[]> => {
  try {
    const res = await fetch(`${SAAVN_API}/playlists?id=${id}&limit=20`);
    const data = await res.json();
    if (data.success && data.data && data.data.songs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.data.songs.map((t: any) => {
        return {
          id: `saavn-${t.id}`,
          name: t.name,
          artist: t.primaryArtists || "Unknown",
          albumArt: t.image?.[2]?.link || "",
          src: t.downloadUrl?.[t.downloadUrl?.length - 1]?.link || "",
          source: 'saavn' as const
        };
      }).filter((t: Track) => t.src !== "");
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const parseLrc = (lrc: string): LyricLine[] => {
  const lines = lrc.split('\n');
  const parsed: LyricLine[] = [];
  const lineTimeRegex = /\[(\d+):(\d+\.\d+)\]/;
  const wordRegex = /<(\d+):(\d+\.\d+)>\s*([^<]*)/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = lineTimeRegex.exec(line);
    if (match) {
        const min = parseInt(match[1]);
        const sec = parseFloat(match[2]);
        const lineTime = min * 60 + sec;
        
        const textContent = line.replace(lineTimeRegex, '').trim();
        
        const words: LyricWord[] = [];
        let wordMatch;
        let hasWords = false;
        
        wordRegex.lastIndex = 0; 
        while ((wordMatch = wordRegex.exec(textContent)) !== null) {
          hasWords = true;
          const wMin = parseInt(wordMatch[1]);
          const wSec = parseFloat(wordMatch[2]);
          words.push({ time: wMin * 60 + wSec, text: wordMatch[3].trim() });
        }

        const cleanText = textContent.replace(/<\d+:\d+\.\d+>/g, '').trim();
        
        parsed.push({ 
          time: lineTime, 
          text: cleanText,
          words: hasWords ? words : undefined
        });
    } else if (line.trim() && !line.startsWith('[')) {
        parsed.push({ time: -1, text: line.trim() });
    }
  }

  // Process line durations and fake word-by-word if missing
  for (let i = 0; i < parsed.length; i++) {
    if (parsed[i].time !== -1 && i < parsed.length - 1 && parsed[i+1].time !== -1) {
        parsed[i].duration = parsed[i+1].time - parsed[i].time;
    } else {
        parsed[i].duration = 5; // fallback 5 sec
    }

    // Automatically generate fake word-by-word sync if provider only gave line-sync
    if (!parsed[i].words && parsed[i].text.length > 0 && parsed[i].time !== -1) {
        const textWords = parsed[i].text.split(' ');
        const timePerWord = (parsed[i].duration! * 0.8) / textWords.length;
        const generatedWords: LyricWord[] = [];
        let currentTime = parsed[i].time;
        
        for (const w of textWords) {
          generatedWords.push({ time: currentTime, text: w });
          currentTime += timePerWord;
        }
        parsed[i].words = generatedWords;
    }
  }

  return parsed;
};

export const fetchTrackLyrics = async (track: Track): Promise<LyricLine[] | 'error'> => {
  try {
    if (track.source === 'ytm') {
      const res = await fetch(`https://music-cgd8.onrender.com/api/lyrics/${track.id.replace('ytm-', '')}`);
      if (res.ok) {
          const data = await res.json();
          if (data.lyrics && data.lyrics !== "Lyrics not available for this track.") {
              return parseLrc(data.lyrics);
          }
      }
    }
    
    const cleanName = track.name.replace(/\(.*\)/g, '').trim();
    const res = await fetch(`https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanName)}&artist_name=${encodeURIComponent(track.artist.split(',')[0])}`);
    if (res.ok) {
        const data = await res.json();
        if (data.syncedLyrics) {
          return parseLrc(data.syncedLyrics);
        } else if (data.plainLyrics) {
          return [{ time: -1, text: data.plainLyrics }];
        } else {
          return 'error';
        }
    } else {
        return 'error';
    }
  } catch {
    return 'error';
  }
};
