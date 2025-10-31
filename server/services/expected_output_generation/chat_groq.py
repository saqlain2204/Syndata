from langchain_groq import ChatGroq
from prompts.prompts import expected_output_prompt

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
    chat_groq = ChatGroq(model=model, api_key=api_key)
    response = chat_groq.invoke(prompt)
    return response.content