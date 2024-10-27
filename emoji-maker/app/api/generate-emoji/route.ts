import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// Ensure REPLICATE_API_TOKEN is set in your environment variables
if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const MOCKUP_IMAGE_URL = 'https://example.com/mockup-emoji.png'; // Replace with an actual mockup image URL

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Attempt to call Replicate API
    try {
      const output = await replicate.run(
        "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
        {
          input: {
            prompt: prompt,
            apply_watermark: false
          }
        }
      );
      return NextResponse.json({ result: output });
    } catch (apiError) {
      console.error("Replicate API error:", apiError);
      // Return mockup image URL instead of throwing an error
      return NextResponse.json({ result: [MOCKUP_IMAGE_URL] });
    }
  } catch (error) {
    console.error("Error in generate-emoji API route:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}
