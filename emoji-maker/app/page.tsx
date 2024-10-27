'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EmojiGeneratorForm } from '../components/emoji-generator-form';
import { EmojiGrid } from '../components/emoji-grid';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Emoji } from '../types/emoji';

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newEmoji = {
        id: Date.now().toString(),
        url: data.url,
        prompt: prompt
      };
      console.log('New emoji object:', newEmoji);
      setEmojis((prevEmojis) => [newEmoji, ...prevEmojis]);
    } catch (error) {
      console.error("Error generating emoji:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold">🤖 Emoj maker</h1>
      
      {isSignedIn ? (
        <>
          <p>Welcome, {user.firstName}!</p>
          <EmojiGeneratorForm onGenerate={handleGenerate} />
          {isGenerating && (
            <div className="text-center">
              <p>Generating emoji...</p>
              {/* TODO: Add a nice loading animation here */}
            </div>
          )}
          <EmojiGrid emojis={emojis} />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
