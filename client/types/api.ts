export interface EmbeddingData {
  chunk_index: number;
  text: string;
  embedding: number[];
  embedding_dim: number;
}

export interface EmbeddingsResponse {
  filename: string;
  total_chunks: number;
  chunk_size: number;
  chunk_overlap: number;
  embeddings: EmbeddingData[];
}

export interface SyntheticDataItem {
  query: string;
  expected_output: string;
  context: string[];
}

export interface SyntheticDataResponse {
  status: string;
  total_generated: number;
  file_path: string;
  message: string;
  data?: SyntheticDataItem[];
}

export interface GenerateRequest {
  groq_api_key: string;
  hf_api_key: string;
  model?: string;
  query_improvement_steps?: number;
  total_data_points?: number;
  chunk_size?: number;
  chunk_overlap?: number;
}
