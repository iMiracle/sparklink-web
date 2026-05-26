import { NextRequest, NextResponse } from 'next/server';

interface FeedbackRequest {
  email?: string;
  message: string;
  locale?: string;
  platform?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();

    if (!body.message) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Feedback received:', body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}