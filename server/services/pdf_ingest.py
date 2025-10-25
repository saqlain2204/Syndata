from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_and_split_pdf(file_path: str, chunk_size: int = 1000, chunk_overlap: int = 200):
    """
    Load a PDF file and split its content into chunks.

    Args:
        file_path (str): The path to the PDF file.
        chunk_size (int): The size of each text chunk.
        chunk_overlap (int): The number of overlapping characters between chunks.
    Returns:
        List[str]: A list of text chunks extracted from the PDF.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", ".", "!", ""]
    )
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    splits = text_splitter.split_documents(documents)
    return [doc.page_content for doc in splits]
