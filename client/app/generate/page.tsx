'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import DataTable from '@/components/DataTable';
import ThemeToggle from '@/components/ThemeToggle';
import { generateSyntheticData, downloadCSV } from '@/lib/api';
import { SyntheticDataResponse } from '@/types/api';

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [groqApiKey, setGroqApiKey] = useState('');
  const [hfApiKey, setHfApiKey] = useState('');
  const [model, setModel] = useState('openai/gpt-oss-20b');
  const [querySteps, setQuerySteps] = useState(3);
  const [dataPoints, setDataPoints] = useState(5);
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SyntheticDataResponse | null>(null);
  const [error, setError] = useState('');

  // Models that support structured outputs on Groq
  const supportedModels = [
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B' },
  ];

  const handleGenerate = async () => {
    if (!file || !groqApiKey || !hfApiKey) {
      setError('Please provide all required fields');
      return;
    }

    setLoading(true);
    setProgress(0);
    setError('');

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 1000);

    try {
      const data = await generateSyntheticData(
        file,
        groqApiKey,
        hfApiKey,
        model,
        querySteps,
        dataPoints,
        chunkSize,
        chunkOverlap
      );
      setResult(data);
      setProgress(100);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate synthetic data');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      const blob = await downloadCSV(result.file_path);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.file_path;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download CSV file');
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

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Generate Synthetic Data</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Upload a PDF and generate synthetic question-answer pairs using AI
            </p>
          </div>

          {/* Configuration Section */}
          <div className="space-y-6 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Configuration</h2>
            
            <FileUpload onFileSelect={setFile} accept=".pdf" maxSize={10} />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Groq API Key"
                type="text"
                placeholder="gsk_..."
                value={groqApiKey}
                onChange={(e) => setGroqApiKey(e.target.value)}
                isPassword
              />
              <Input
                label="HuggingFace API Key"
                type="text"
                placeholder="hf_..."
                value={hfApiKey}
                onChange={(e) => setHfApiKey(e.target.value)}
                isPassword
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white transition-colors"
              >
                {supportedModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only models that support structured outputs are listed
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Query Improvement Steps"
                type="number"
                value={querySteps}
                onChange={(e) => setQuerySteps(Number(e.target.value))}
                min={1}
                max={10}
              />
              <Input
                label="Total Data Points"
                type="number"
                value={dataPoints}
                onChange={(e) => setDataPoints(Number(e.target.value))}
                min={1}
                max={100}
              />
            </div>

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

            {loading && (
              <ProgressBar 
                progress={progress} 
                label="Generating synthetic data... This may take a few minutes" 
              />
            )}

            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!file || !groqApiKey || !hfApiKey || loading}
              className="w-full"
            >
              Generate Synthetic Data
            </Button>
          </div>

          {/* Results Section */}
          {result && result.data && (
            <div className="space-y-6 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Results</h2>
                  <p className="text-gray-600 dark:text-gray-400">{result.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Generated</p>
                  <p className="text-3xl font-bold font-mono text-black dark:text-white">{result.total_generated}</p>
                </div>
              </div>

              <DataTable data={result.data} onDownload={handleDownload} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
