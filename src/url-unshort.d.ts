declare module 'url-unshort' {
  interface UrlUnshortOptions {
    timeout?: number;
    maxRedirects?: number;
    userAgent?: string;
  }

  interface UrlUnshortResult {
    url: string;
    title?: string;
    description?: string;
    image?: string;
  }

  class UrlUnshort {
    constructor(options?: UrlUnshortOptions);
    expand(url: string): Promise<string | null>;
    expandWithDetails(url: string): Promise<UrlUnshortResult | null>;
  }

  export = UrlUnshort;
} 