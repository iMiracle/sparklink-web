import { NextRequest, NextResponse } from 'next/server';

interface DownloadRequest {
  platform: 'android' | 'ios' | 'windows' | 'mac';
  channel?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DownloadRequest = await request.json();

    console.log('Download recorded:', body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}