'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import ThemeToggle from '@/components/ThemeToggle';
import { generateEmbeddings } from '@/lib/api';
import { EmbeddingsResponse } from '@/types/api';

export default function EmbeddingsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [hfApiKey, setHfApiKey] = useState('');
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<EmbeddingsResponse | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!file || !hfApiKey) {
      setError('Please provide all required fields');
      return;
    }

    setLoading(true);
    setProgress(0);
    setError('');

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    try {
      const data = await generateEmbeddings(file, hfApiKey, chunkSize, chunkOverlap);
      setResult(data);
      setProgress(100);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate embeddings');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Generate Embeddings</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Upload a PDF and generate vector embeddings for each text chunk
            </p>
          </div>

          {/* Upload Section */}
          <div className="space-y-6 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Upload PDF Document</h2>
            
            <FileUpload onFileSelect={setFile} accept=".pdf" maxSize={10} />

            <Input
              label="HuggingFace API Key"
              type="text"
              placeholder="hf_..."
              value={hfApiKey}
              onChange={(e) => setHfApiKey(e.target.value)}
              isPassword
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Chunk Size"
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                min={100}
                max={5000}
              />
              <Input
                label="Chunk Overlap"
                type="number"
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(Number(e.target.value))}
                min={0}
                max={1000}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {loading && <ProgressBar progress={progress} label="Generating embeddings..." />}

            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!file || !hfApiKey || loading}
              className="w-full"
            >
              Generate Embeddings
            </Button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
              <h2 className="text-2xl font-semibold">Results</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Chunks</p>
                  <p className="text-2xl font-bold font-mono">{result.total_chunks}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Chunk Size</p>
                  <p className="text-2xl font-bold font-mono">{result.chunk_size}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Embedding Dimension</p>
                  <p className="text-2xl font-bold font-mono">{result.embeddings[0]?.embedding_dim || 0}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Sample Chunks</h3>
                {result.embeddings.slice(0, 3).map((embedding, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Chunk {embedding.chunk_index + 1}</p>
                    <p className="text-foreground line-clamp-3">{embedding.text}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs font-mono">
                      Vector: [{embedding.embedding.slice(0, 5).map(v => v.toFixed(3)).join(', ')}...]
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
