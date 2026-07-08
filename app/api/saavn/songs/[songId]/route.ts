import { NextResponse } from 'next/server';
import { saavnFetch, transformSong, JIOSAAVN_ENDPOINTS } from '@/lib/saavnApi';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ songId: string }> }
) {
    const { songId } = await params;

    try {
        const { data } = await saavnFetch(JIOSAAVN_ENDPOINTS.songs.id, {
            pids: songId
        });

        if (!data || !data.songs || data.songs.length === 0) {
            return NextResponse.json({ success: false, error: 'Song not found' }, { status: 404 });
        }

        const song = transformSong(data.songs[0]);
        return NextResponse.json({ success: true, data: [song] });
    } catch (e: any) {
        console.error('Get song error:', e.message);
        return NextResponse.json({ success: false, error: 'Song fetch failed' }, { status: 502 });
    }
}
