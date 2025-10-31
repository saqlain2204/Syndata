from services import context_generation, document_embeddings, pdf_ingest
from services.expected_output_generation import chat_groq as expected_output_groq
from services.query_generation import chat_groq as query_groq
from services.query_evolution import chat_groq as evolution_groq
from models.synthetic_data import SyntheticData
from dotenv import load_dotenv
import os
import pandas as pd
load_dotenv()

def generate_synthetic_data(groq_api_key: str, model: str, embeddings: list, query_improvement_steps: int = 3, total_data_points: int = 5):
    data = []
    for _ in range(total_data_points):
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
            steps=query_improvement_steps
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

        data.append(synthetic_data)
    pd.DataFrame([d.dict() for d in data]).to_csv("synthetic_data_output.csv", index=False)
    print("Synthetic data generated and saved to synthetic_data_output.csv")
        
        





    