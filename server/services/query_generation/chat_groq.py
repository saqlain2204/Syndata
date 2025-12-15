from langchain_groq import ChatGroq
from prompts.prompts import query_prompt
from models.llm_output import QueryOutput

def generate_query_groq(model: str, contexts: str, api_key: str) -> str:
    """
    Generate a query using the Groq model based on the provided prompt and contexts.

    Args:
        prompt (str): The user's prompt or question.
        model (str): The Groq model to use for generation.
        contexts (str): The context information to guide the query generation.

    Returns:
        str: The generated query.
    """
    prompt = query_prompt(contexts=contexts)
    response_format = {
        "type": "json_schema",
        "json_schema": {
            "name": "query_output",
            "schema": QueryOutput.model_json_schema()
        }
    }
    import json
    chat_groq = ChatGroq(model=model, api_key=api_key)
    response = chat_groq.invoke(prompt, response_format=response_format)
    data = json.loads(response.content)
    if isinstance(data, list):
        data = data[0] if data else {}
    parsed = QueryOutput(**data)
    return parsed.input