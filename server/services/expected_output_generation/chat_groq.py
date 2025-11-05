from langchain_groq import ChatGroq
from prompts.prompts import expected_output_prompt
from models.llm_output import ExpectedOutput

import json

def generate_expected_output(model: str, contexts: str, evolved_query: str, api_key: str) -> str:
    """
    Generate the expected output using the Groq model based on the provided contexts.

    Args:
        model (str): The Groq model to use for generation.
        contexts (str): The context information to guide the expected output generation.

    Returns:
        str: The generated expected output.
    """
    prompt = expected_output_prompt(contexts=contexts, evolved_query=evolved_query)
    response_format = {
        "type": "json_schema",
        "json_schema": {
            "name": "expected_output",
            "schema": ExpectedOutput.model_json_schema()
        }
    }
    
    chat_groq = ChatGroq(model=model, api_key=api_key)
    response = chat_groq.invoke(prompt, response_format=response_format)
    data = json.loads(response.content)
    parsed = ExpectedOutput(**data)
    return parsed.expected_output