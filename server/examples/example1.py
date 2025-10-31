from services import context_generation, document_embeddings, pdf_ingest, data_generation
from services.expected_output_generation import chat_groq as expected_output_groq
from services.query_generation import chat_groq as query_groq
from services.query_evolution import chat_groq as evolution_groq
from models.synthetic_data import SyntheticData
from dotenv import load_dotenv
import os
import pandas as pd
load_dotenv()


groq_api_key = os.getenv("GROQ_API_KEY")
hf_api_key = os.getenv("HF_API_KEY")
model = "openai/gpt-oss-20b"
# Ingest PDF and generate document embeddings
pdf_path = "tests/environment_data_report.pdf"
embeddings = document_embeddings.embed_pdf(pdf_path, hf_api_key=hf_api_key)
# Generate context based on embeddings
context = context_generation.generate_context(
    similarity_threshold=0.8,
    document_embeddings=[vec for _, vec in embeddings],
    content=[chunk for chunk, _ in embeddings]
)

final_query = query_groq.generate_query_groq(
    model=model,
    contexts="\n".join(context),
    api_key=groq_api_key
)

evolved_query = evolution_groq.evolve_query(
    api_key=groq_api_key,
    model=model,
    context="\n".join(context),
    query=final_query,
    steps=3
)

# Generate the expected output
expected_output = expected_output_groq.generate_expected_output(
    model=model,
    contexts="\n".join(context),
    evolved_query=final_query,
    api_key=groq_api_key
)

synthetic_data = SyntheticData(
    query=evolved_query,
    expected_output=expected_output,
    context=context
)

query = synthetic_data.query
expected_output = synthetic_data.expected_output
context = synthetic_data.context

# Convert to DataFrame for better visualization
df = pd.DataFrame({
    "query": [query],
    "expected_output": [expected_output],
    "context": [context]
})

df.to_csv("synthetic_data_output.csv", index=False)
print("Synthetic data generated and saved to synthetic_data_output.csv")




    