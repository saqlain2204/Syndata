'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FileText, Sparkles, Download, ArrowRight, Github } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-black dark:text-white" />,
      title: 'PDF Processing',
      description: 'Upload and process PDF documents to extract meaningful content chunks',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-black dark:text-white" />,
      title: 'AI-Powered Generation',
      description: 'Generate synthetic question-answer pairs using advanced LLM models',
    },
    {
      icon: <Download className="w-8 h-8 text-black dark:text-white" />,
      title: 'Easy Export',
      description: 'Download generated data in CSV format for immediate use',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/syndata.png" alt="SynData Logo" width={44} height={44} className="rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:scale-110" />
              <h1 className="text-xl font-bold font-mono">SynData</h1>
            </div>
            <span className="hidden md:inline-block px-3 py-1 text-sm font-semibold tracking-wide bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-500 bg-clip-text text-transparent rounded-xl">
              Data for tomorrow, <span className="font-bold">generated today.</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <Image src="/syndata.png" alt="SynData Logo" width={180} height={180} className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 mb-4 transition-transform duration-300 hover:scale-110" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
              Generate High-Quality
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent">
                Synthetic Data
              </span>
            </h2>
            <span className="mt-4 px-4 py-2 inline-block text-lg font-semibold tracking-wide bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-500 bg-clip-text text-transparent rounded-xl shadow-sm">
              Data for tomorrow, <span className="font-bold">generated today.</span>
            </span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your PDF documents into structured question-answer pairs
            using state-of-the-art language models
          </p>
          <p className="text-base font-semibold text-black dark:text-white mt-2">Open for contributions! Join us and help shape the future of synthetic data.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>

          {/* Open Source & Contributions Section (inline, after Get Started button, larger size) */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-10 flex flex-col items-center text-center shadow-lg transition-all duration-300">
              <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">Open Source & Contributions</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                Syndata is <span className="font-semibold">open source</span> and <span className="font-semibold">open for contributions</span>! Whether you want to fix bugs, add features, improve documentation, or share feedback, your input is valued.
              </p>
              <a
                href="https://github.com/saqlain2204/syndata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                Contribute on GitHub
              </a>
            </div>
          </section>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors text-black dark:text-white">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Use Cases</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">RAG Evaluation</h4>
            <p className="text-gray-600 dark:text-gray-400">Assess and optimize Retrieval-Augmented Generation pipelines by generating targeted synthetic queries and answers for robust evaluation.</p>
          </div>
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">Model Benchmarking</h4>
            <p className="text-gray-600 dark:text-gray-400">Compare the performance of different LLMs using custom synthetic datasets tailored to specific domains and tasks.</p>
          </div>
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">Data Augmentation</h4>
            <p className="text-gray-600 dark:text-gray-400">Enrich real-world datasets with diverse synthetic samples to improve model generalization and reduce overfitting.</p>
          </div>
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">QA System Testing</h4>
            <p className="text-gray-600 dark:text-gray-400">Stress-test question-answering systems with edge-case and domain-specific synthetic Q&A pairs.</p>
          </div>
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">Enterprise Knowledge Validation</h4>
            <p className="text-gray-600 dark:text-gray-400">Validate and audit internal knowledge bases by simulating user queries and expected responses from enterprise documents.</p>
          </div>
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h4 className="text-xl font-semibold mb-3 text-black dark:text-white">Educational Content Creation</h4>
            <p className="text-gray-600 dark:text-gray-400">Automatically generate quizzes, study guides, and practice questions from textbooks and course materials for e-learning platforms.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
        <h3 className="text-3xl font-bold text-center mb-16 text-black dark:text-white">How It Works</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Upload PDF', description: 'Upload your PDF document to begin processing' },
            { step: '2', title: 'Configure Settings', description: 'Set parameters like model, chunk size, and data points' },
            { step: '3', title: 'Generate Data', description: 'AI processes your document and creates synthetic Q&A pairs' },
            { step: '4', title: 'Download Results', description: 'Export your generated data as CSV for immediate use' },
          ].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 h-full w-full shadow-lg dark:shadow-gray-900/50 transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg mb-6">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 dark:text-gray-500 flex flex-col items-center">
          <p className="mb-2 text-base font-semibold text-black dark:text-white">Data for tomorrow, generated today.</p>
          <p className="flex items-center justify-center gap-2 mb-2">© 2025 SynData. Open source on
            <a
              href="https://github.com/saqlain2204/syndata"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center underline hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5 mr-1" aria-hidden="true" />
              GitHub
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Open for contributions! Join us and help shape the future of synthetic data.</p>
        </div>
      </footer>
    </div>
  );
}
