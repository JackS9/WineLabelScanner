import { createWorker } from 'tesseract.js';
import { analyzeWineLabel } from './openai';
import { searchWineInfo } from './search';
import { scrapeWineData } from './scraper';

export async function scanWineLabel(imageSource: string | File): Promise<any> {
  // Initialize Tesseract.js
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  // Convert File to base64 if needed
  let imageData = imageSource;
  if (imageSource instanceof File) {
    imageData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageSource);
    });
  }

  try {
    // Perform OCR
    const { data: { text } } = await worker.recognize(imageData);
    await worker.terminate();

    // Analyze text with GPT
    const wineInfo = await analyzeWineLabel(text);
    if (!wineInfo) return null;

    // Search for additional information
    const links = await searchWineInfo(`${wineInfo.name} ${wineInfo.producer} ${wineInfo.vintage} wine`);
    
    // Scrape content from found links
    const scrapedData = await Promise.all(
      links.map(link => scrapeWineData(link))
    );

    return {
      ...wineInfo,
      links,
      scrapedData: scrapedData.join('\n\n'),
      imageUrl: typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource)
    };
  } catch (error) {
    console.error('Scanning failed:', error);
    if (worker) await worker.terminate();
    return null;
  }
}