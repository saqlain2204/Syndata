# SynData - Frontend

A modern Next.js frontend for generating synthetic question-answer pairs from PDF documents.

## Features

- 🎨 Clean black & white design
- 📄 PDF document upload and processing
- 🤖 AI-powered synthetic data generation
- 📊 Real-time progress tracking
- 💾 CSV export functionality
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
cd client
npm install
```

2. Create `.env.local` file (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
client/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── embeddings/        # Embeddings generation page
│   └── generate/          # Synthetic data generation page
├── components/            # Reusable components
│   ├── FileUpload.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ProgressBar.tsx
│   └── DataTable.tsx
├── lib/                   # Utilities
│   └── api.ts            # API client functions
├── types/                 # TypeScript types
│   └── api.ts
└── public/               # Static assets
```

## About SynData

SynData is an open-source platform for generating high-quality synthetic data from PDF documents using state-of-the-art language models.

## API Endpoints

The frontend connects to these backend endpoints:

- `POST /api/embeddings/pdf` - Generate embeddings from PDF
- `POST /api/synthetic-data/generate` - Generate synthetic data
- `GET /api/synthetic-data/download/{filename}` - Download CSV file

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
