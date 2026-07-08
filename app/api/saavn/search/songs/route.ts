import { NextResponse } from 'next/server';
import { saavnFetch, transformSong, JIOSAAVN_ENDPOINTS } from '@/lib/saavnApi';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    if (!query) {
        return NextResponse.json({ success: false, error: 'query required' }, { status: 400 });
    }

    try {
        const { data } = await saavnFetch(JIOSAAVN_ENDPOINTS.search.songs, {
            q: query, p: page, n: limit
        });

        if (!data || !data.results) {
            return NextResponse.json({ success: false, error: 'No results found' }, { status: 404 });
        }

        const results = (data.results || []).map(transformSong).filter(Boolean).slice(0, Number(limit));

        return NextResponse.json({
            success: true,
            data: {
                total: data.total || 0,
                start: data.start || 0,
                results
            }
        });
    } catch (e: unknown) {
        console.error('Search songs error:', e instanceof Error ? e.message : String(e));
        return NextResponse.json({ success: false, error: 'Search failed' }, { status: 502 });
    }
}
