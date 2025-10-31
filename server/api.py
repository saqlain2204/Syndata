from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.embeddings_router import router as embeddings_router
from routes.synthetic_data_router import router as synthetic_data_router

app = FastAPI(
    title="Synthetic Data Generator API",
    description="API for generating synthetic question-answer pairs from PDF documents using LLMs",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(embeddings_router)
app.include_router(synthetic_data_router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Synthetic Data Generator API",
        "version": "1.0.0",
        "documentation": "/docs",
        "endpoints": {
            "embeddings": {
                "generate_embeddings": "POST /api/embeddings/pdf",
                "health": "GET /api/embeddings/health"
            },
            "synthetic_data": {
                "generate": "POST /api/synthetic-data/generate",
                "download": "GET /api/synthetic-data/download/{filename}",
                "health": "GET /api/synthetic-data/health"
            }
        }
    }


@app.get("/health")
async def health_check():
    """Global health check endpoint."""
    return {
        "status": "healthy",
        "service": "synthetic-data-generator-api",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )