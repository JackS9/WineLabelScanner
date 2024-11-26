export async function searchWineInfo(query: string): Promise<string[]> {
  try {
    // In a real app, you'd use a proper search API
    // This is a placeholder that returns example wine-related URLs
    return [
      'https://www.wine.com/product/example',
      'https://www.vivino.com/wines/example',
      'https://www.cellartracker.com/wine/example'
    ];
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
}