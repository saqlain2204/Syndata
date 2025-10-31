from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict
import os
import tempfile
from pathlib import Path

from services.document_embeddings import embed_pdf

from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/embeddings", tags=["embeddings"])


@router.post("/pdf")
async def generate_pdf_embeddings(
    hf_api_key: str,
    file: UploadFile = File(...),
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
):
    """
    Upload a PDF file and get embeddings for each chunk.
    
    Args:
        file: PDF file to process
        chunk_size: Size of text chunks (default: 1000)
        chunk_overlap: Overlap between chunks (default: 200)
    
    Returns:
        JSON with embeddings and metadata
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        embeddings = embed_pdf(
            pdf_path=tmp_path,
            hf_api_key=hf_api_key,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        
        result = {
            "filename": file.filename,
            "total_chunks": len(embeddings),
            "chunk_size": chunk_size,
            "chunk_overlap": chunk_overlap,
            "embeddings": [
                {
                    "chunk_index": idx,
                    "text": chunk,
                    "embedding": vector,
                    "embedding_dim": len(vector)
                }
                for idx, (chunk, vector) in enumerate(embeddings)
            ]
        }
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
    

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "embeddings"}