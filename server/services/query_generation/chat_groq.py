from langchain_groq import ChatGroq

def generate_query_groq(prompt: str, model: str, contexts: str):
    """
    Generate a query using the Groq model based on the provided prompt and contexts.

    Args:
        prompt (str): The user's prompt or question.
        model (str): The Groq model to use for generation.
        contexts (str): The context information to guide the query generation.

    Returns:
        str: The generated query.
    """
    chat_groq = ChatGroq(model=model)
    response = chat_groq.invoke(prompt, context=contexts)
    return response