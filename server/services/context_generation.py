import random
import numpy as np

def generate_context(similarity_threshold: float, document_embeddings: list, content) -> list:
    """
    Generate a context string based on document embeddings and a similarity threshold.

    Args:
        similarity_threshold (float): The threshold for selecting relevant document sections.
        document_embeddings (list): A list of tuples containing document sections and their embeddings.

    Returns:
        list: A list of selected document sections as context.
    """
    reference_index = random.randint(0, len(document_embeddings) - 1)
    reference_embedding = document_embeddings[reference_index]
    contexts = [content[reference_index]]
    
    similar_indices = []
    for idx, embedding in enumerate(document_embeddings):
        if idx != reference_index:
            product = np.dot(reference_embedding, embedding)
            norm = np.linalg.norm(reference_embedding) * np.linalg.norm(embedding)
            similarity = product / norm if norm != 0 else 0
            if similarity >= similarity_threshold:
                similar_indices.append(idx)
                contexts.append(content[idx])
    return contexts

