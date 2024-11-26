import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeWineLabel(text: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a wine expert. Extract structured information from wine label text."
        },
        {
          role: "user",
          content: `Extract wine information from this label text: ${text}. 
                   Please provide: name, producer, vintage, region, country, varietal, 
                   and any other relevant details you can find.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}