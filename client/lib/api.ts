import axios from 'axios';
import { EmbeddingsResponse, SyntheticDataResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const generateEmbeddings = async (
  file: File,
  hfApiKey: string,
  chunkSize: number = 1000,
  chunkOverlap: number = 200
): Promise<EmbeddingsResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('hf_api_key', hfApiKey);
  formData.append('chunk_size', chunkSize.toString());
  formData.append('chunk_overlap', chunkOverlap.toString());

  const response = await apiClient.post<EmbeddingsResponse>(
    '/api/embeddings/pdf',
    formData
  );
  return response.data;
};

export const generateSyntheticData = async (
  file: File,
  groqApiKey: string,
  hfApiKey: string,
  model: string = 'openai/gpt-oss-20b',
  queryImprovementSteps: number = 3,
  totalDataPoints: number = 5,
  chunkSize: number = 1000,
  chunkOverlap: number = 200
): Promise<SyntheticDataResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('groq_api_key', groqApiKey);
  formData.append('hf_api_key', hfApiKey);
  formData.append('model', model);
  formData.append('query_improvement_steps', queryImprovementSteps.toString());
  formData.append('total_data_points', totalDataPoints.toString());
  formData.append('chunk_size', chunkSize.toString());
  formData.append('chunk_overlap', chunkOverlap.toString());

  const response = await apiClient.post<SyntheticDataResponse>(
    '/api/synthetic-data/generate',
    formData
  );
  return response.data;
};

export const downloadCSV = async (filename: string): Promise<Blob> => {
  const response = await apiClient.get(`/api/synthetic-data/download/${filename}`, {
    responseType: 'blob',
  });
  return response.data;
};
