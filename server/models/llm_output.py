from pydantic import BaseModel, Field

class QueryOutput(BaseModel):
    """Schema for query generation and evolution outputs"""
    input: str = Field(description="The generated or evolved query/question")

class ExpectedOutput(BaseModel):
    """Schema for expected output generation"""
    expected_output: str = Field(description="The generated answer to the query")
