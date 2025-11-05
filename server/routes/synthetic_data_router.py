from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import os
import tempfile
from pathlib import Path
import pandas as pd
import logging

from fastapi import Request

logger = logging.getLogger(__name__)

from .limiter import limiter

from data_generation import generate_synthetic_data
from services import document_embeddings

from models.synthetic_data import SyntheticDataResponse


router = APIRouter(prefix="/api/synthetic-data", tags=["synthetic-data"])


@router.post("/generate", response_model=SyntheticDataResponse)
@limiter.limit("2/minute")
async def generate_synthetic_data_from_pdf(
    request: Request,
    file: UploadFile = File(...),
    groq_api_key: str = Form(...),
    hf_api_key: str = Form(...),
    model: str = Form("openai/gpt-oss-20b"),
    query_improvement_steps: int = Form(3),
    total_data_points: int = Form(5),
    chunk_size: int = Form(1000),
    chunk_overlap: int = Form(200)
):
    """
    Upload a PDF and generate synthetic question-answer pairs.
    
    Args:
        file: PDF file to process
        groq_api_key: Groq API key for LLM operations
        hf_api_key: HuggingFace API key for embeddings
        model: LLM model to use
        query_improvement_steps: Number of query evolution steps
        total_data_points: Number of synthetic data points to generate
        chunk_size: Size of text chunks
        chunk_overlap: Overlap between chunks
        
    Returns:
        Generated synthetic data and CSV file path
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        # Generate embeddings from PDF
        embeddings = document_embeddings.embed_pdf(
            pdf_path=tmp_path,
            hf_api_key=hf_api_key,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        
        # Generate synthetic data
        generate_synthetic_data(
            groq_api_key=groq_api_key,
            model=model,
            embeddings=embeddings,
            query_improvement_steps=query_improvement_steps,
            total_data_points=total_data_points
        )
        
        # Read the generated CSV to include in response
        df = pd.read_csv("synthetic_data_output.csv")
        data_list = df.to_dict(orient='records')
        
        # Parse context field from string representation back to list
        import ast
        for item in data_list:
            if isinstance(item.get('context'), str):
                try:
                    item['context'] = ast.literal_eval(item['context'])
                except (ValueError, SyntaxError):
                    item['context'] = [item['context']]
        
        return SyntheticDataResponse(
            status="success",
            total_generated=total_data_points,
            file_path="synthetic_data_output.csv",
            message=f"Generated {total_data_points} synthetic data points from {file.filename}",
            data=data_list
        )
    except Exception as e:
        # Log the exception and return its message in the HTTP response for easier debugging
        logger.exception("Error generating synthetic data")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up temporary file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        # Clean up temporary file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


@router.get("/download/{filename}")
@limiter.limit("2/minute")
async def download_csv(request: Request, filename: str):
    """
    Download the generated synthetic data CSV file.
    
    Args:
        filename: Name of the CSV file to download
        
    Returns:
        File download response
    """
    file_path = Path(filename)
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "synthetic-data-generation"}