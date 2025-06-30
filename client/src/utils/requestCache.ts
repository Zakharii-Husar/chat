// Simple request cache to prevent duplicate requests
class RequestCache {
  private cache = new Map<string, Promise<any>>();
  private cacheTime = new Map<string, number>();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const now = Date.now();
    
    // Check if we have a cached request that's still valid
    const cachedTime = this.cacheTime.get(cacheKey);
    if (cachedTime && (now - cachedTime) < this.CACHE_DURATION) {
      const cachedRequest = this.cache.get(cacheKey);
      if (cachedRequest) {
        return cachedRequest;
      }
    }

    // Create new request
    const request = fetch(url, options);
    
    // Cache the request
    this.cache.set(cacheKey, request);
    this.cacheTime.set(cacheKey, now);
    
    // Clean up cache after request completes
    request.finally(() => {
      setTimeout(() => {
        this.cache.delete(cacheKey);
        this.cacheTime.delete(cacheKey);
      }, this.CACHE_DURATION);
    });

    return request;
  }

  // Clear cache for specific URL pattern
  clearCache(urlPattern?: string) {
    if (urlPattern) {
      const keys = Array.from(this.cache.keys());
      for (const key of keys) {
        if (key.includes(urlPattern)) {
          this.cache.delete(key);
          this.cacheTime.delete(key);
        }
      }
    } else {
      this.cache.clear();
      this.cacheTime.clear();
    }
  }
}

// Export singleton instance
export const requestCache = new RequestCache();

// Enhanced fetch function that uses caching
export const cachedFetch = (url: string, options?: RequestInit): Promise<Response> => {
  return requestCache.fetch(url, options);
}; 