import { NextResponse } from 'next/server';
// import UrlUnshort from 'url-unshort';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    console.log(url);

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const t_response = await fetch(url);
    console.log(t_response.url);
    const expandedUrl = t_response.url.split('?')[0];
    return NextResponse.json({ url: expandedUrl });
  } catch (error) {
    console.error('Error expanding URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 