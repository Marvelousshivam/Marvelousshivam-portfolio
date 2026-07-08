import forge from 'node-forge';

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
];

const JIOSAAVN_ENDPOINTS = {
    search: {
        songs: 'search.getResults',
    },
    songs: {
        id: 'song.getDetails',
    }
};

export async function saavnFetch(endpoint: string, params: Record<string, string>, context = 'web6dot0') {
    const url = new URL('https://www.jiosaavn.com/api.php');
    url.searchParams.append('__call', endpoint);
    url.searchParams.append('_format', 'json');
    url.searchParams.append('_marker', '0');
    url.searchParams.append('api_version', '4');
    url.searchParams.append('ctx', context);

    Object.entries(params).forEach(([key, val]) => url.searchParams.append(key, String(val)));

    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

    try {
        const response = await fetch(url.toString(), {
            headers: { 'Content-Type': 'application/json', 'User-Agent': ua },
            signal: AbortSignal.timeout(10000)
        });

        return { data: await response.json(), ok: response.ok };
    } catch (err: unknown) {
        console.error('saavnFetch error:', err instanceof Error ? err.message : String(err));
        return { data: null, ok: false };
    }
}

function decryptMediaUrl(encryptedUrl: string) {
    if (!encryptedUrl) return [];

    const qualities = [
        { id: '_12', bitrate: '12kbps' },
        { id: '_48', bitrate: '48kbps' },
        { id: '_96', bitrate: '96kbps' },
        { id: '_160', bitrate: '160kbps' },
        { id: '_320', bitrate: '320kbps' }
    ];

    try {
        const key = '38346591';
        const iv = '00000000';
        const encrypted = forge.util.decode64(encryptedUrl);
        const decipher = forge.cipher.createDecipher('DES-ECB', forge.util.createBuffer(key));
        decipher.start({ iv: forge.util.createBuffer(iv) });
        decipher.update(forge.util.createBuffer(encrypted));
        decipher.finish();
        const decryptedLink = decipher.output.getBytes();

        return qualities.map(q => ({
            quality: q.bitrate,
            url: decryptedLink.replace('_96', q.id)
        }));
    } catch (e: unknown) {
        console.error('Decrypt failed:', e instanceof Error ? e.message : String(e));
        return [];
    }
}

function createImageLinks(link: string) {
    if (!link) return [];
    const qualities = ['50x50', '150x150', '500x500'];
    return qualities.map(q => ({
        quality: q,
        url: link.replace(/150x150|50x50/, q).replace(/^http:\/\//, 'https://')
    }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArtists(artistMap: any) {
    if (!artistMap) return { primary: [], featured: [], all: [] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapFn = (a: any) => ({ id: a.id, name: a.name, role: a.role, type: a.type, image: createImageLinks(a.image), url: a.perma_url });
    return {
        primary: (artistMap.primary_artists || []).map(mapFn),
        featured: (artistMap.featured_artists || []).map(mapFn),
        all: (artistMap.artists || []).map(mapFn)
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformSong(song: any) {
    if (!song || !song.id) return null;
    return {
        id: song.id,
        name: song.title,
        type: song.type,
        year: song.year || null,
        releaseDate: song.more_info?.release_date || null,
        duration: song.more_info?.duration ? Number(song.more_info.duration) : null,
        label: song.more_info?.label || null,
        explicitContent: song.explicit_content === '1',
        playCount: song.play_count ? Number(song.play_count) : null,
        language: song.language,
        hasLyrics: song.more_info?.has_lyrics === 'true',
        lyricsId: song.more_info?.lyrics_id || null,
        url: song.perma_url,
        copyright: song.more_info?.copyright_text || null,
        album: {
            id: song.more_info?.album_id || null,
            name: song.more_info?.album || null,
            url: song.more_info?.album_url || null
        },
        artists: mapArtists(song.more_info?.artistMap),
        image: createImageLinks(song.image),
        downloadUrl: decryptMediaUrl(song.more_info?.encrypted_media_url)
    };
}

export { JIOSAAVN_ENDPOINTS };
