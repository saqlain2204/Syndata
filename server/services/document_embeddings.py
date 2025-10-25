from typing import List, Tuple, Union
import os
import requests
from pathlib import Path

from .pdf_ingest import load_and_split_pdf


def embed_texts(
    texts: List[str],
    hf_api_key: str,
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
    batch_size: int = 16,
) -> List[List[float]]:
    """
    Embed a list of texts using a Hugging Face inference API.

    Args:
        texts (List[str]): The texts to embed.
        hf_api_key (str): Hugging Face API key.
        model_name (str): The model to use for embeddings.
        batch_size (int): Number of texts to process in each batch.

    Returns:
        List[List[float]]: A list of embeddings corresponding to the input texts.
    """
    headers = {"Authorization": f"Bearer {hf_api_key}"}
    url = f"https://router.huggingface.co/hf-inference/models/{model_name}/pipeline/feature-extraction"

    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        response = requests.post(url, headers=headers, json={"inputs": batch})
        if response.status_code != 200:
            raise RuntimeError(f"Failed to get embeddings: {response.text}")
        batch_embeddings = response.json()
        # Handle both list and dict response formats
        if isinstance(batch_embeddings, list) and isinstance(batch_embeddings[0], dict):
            batch_embeddings = [item["embedding"] for item in batch_embeddings]
        embeddings.extend(batch_embeddings)

    return embeddings


def embed_pdf(
    pdf_path: Union[str, Path],
    hf_api_key: Union[str, None] = None,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
    batch_size: int = 16,
) -> List[Tuple[str, List[float]]]:
    """
        Load a PDF, split it into chunks, and embed each chunk.
        
        Args:
            pdf_path (str | Path): Path to the PDF file.
            hf_api_key (str | None): Hugging Face API key. If None, will look for HF_API_KEY env var.
            chunk_size (int): Size of each text chunk.
            chunk_overlap (int): Overlap between text chunks.
            batch_size (int): Number of texts to process in each batch.
        Returns:
            List[Tuple[str, List[float]]]: A list of tuples containing text chunks and their embeddings.
    """
    
    if hf_api_key is None:
        hf_api_key = os.environ.get("HF_API_KEY")
    if not hf_api_key:
        raise RuntimeError("Hugging Face API key required (pass hf_api_key or set HF_API_KEY env var)")

    chunks = load_and_split_pdf(str(pdf_path), chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    vectors = embed_texts(chunks, hf_api_key=hf_api_key, batch_size=batch_size)
    if len(vectors) != len(chunks):
        raise RuntimeError("Mismatch between number of chunks and returned embeddings")
    return [(chunk, vector) for chunk, vector in zip(chunks, vectors)]
