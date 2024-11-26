import * as cheerio from 'cheerio';

export async function scrapeWineData(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove script tags, style tags, and comments
    $('script').remove();
    $('style').remove();
    $('comments').remove();
    
    // Extract main content
    const mainContent = $('main, article, .content, #content, .main').first();
    const content = mainContent.length ? mainContent.text() : $('body').text();
    
    // Clean and normalize text
    return content
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2000); // Limit content length
  } catch (error) {
    console.error('Scraping failed:', error);
    return '';
  }
}