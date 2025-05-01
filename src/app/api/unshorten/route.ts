import { NextResponse } from 'next/server';
import UrlUnshort from 'url-unshort';

const unshortener = new UrlUnshort();

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const expandedUrl = await unshortener.expand(url);
    
    if (!expandedUrl) {
      return NextResponse.json(
        { error: 'Could not expand URL' },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: expandedUrl });
  } catch (error) {
    console.error('Error expanding URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 