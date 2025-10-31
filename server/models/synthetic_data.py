from pydantic import BaseModel
from typing import Optional, List

class SyntheticData(BaseModel):
    query: str
    expected_output: str
    context: List[str]

class SyntheticDataRequest(BaseModel):
    groq_api_key: str
    hf_api_key: str
    model: str = "qwen/qwen-2.5-72b-instruct"
    query_improvement_steps: int = 3
    total_data_points: int = 5
    chunk_size: int = 1000
    chunk_overlap: int = 200
    
class SyntheticDataResponse(BaseModel):
    status: str
    total_generated: int
    file_path: str
    message: str
    data: Optional[List[dict]] = None



