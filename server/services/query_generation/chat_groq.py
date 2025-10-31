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
    chat_groq = ChatGroq(model=model, api_key=api_key).with_structured_output(QueryOutput)
    response = chat_groq.invoke(prompt)
    return response.input