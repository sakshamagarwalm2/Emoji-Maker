import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      console.log("Received prompt:", prompt);

      // Simulate emoji generation (replace with actual logic later)
      const newEmoji = {
        id: Date.now().toString(),
        url: 'https://via.placeholder.com/100',
        prompt,
      };

      res.status(200).json({ emoji: newEmoji });
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: 'Failed to generate emoji' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
