from prompts.prompts import multi_context_template, reasoning_template, hypothetical_scenario_template
import random
from langchain_groq import ChatGroq
from models.llm_output import QueryOutput
import time

def evolve_query(query: str, api_key: str, model: str, context: str, steps: int):
    current_input = query
    multi_context_template_str = multi_context_template(context, current_input)
    reasoning_template_str = reasoning_template(context, current_input)
    hypothetical_scenario_template_str = hypothetical_scenario_template(context, current_input)
    evolution_prompts = [
        multi_context_template_str,
        reasoning_template_str,
        hypothetical_scenario_template_str
    ]
    response_format = {
        "type": "json_schema",
        "json_schema": {
            "name": "query_output",
            "schema": QueryOutput.model_json_schema()
        }
    }
    import json
    chat_groq = ChatGroq(model=model, api_key=api_key)
    for _ in range(steps):
        chosen_prompt = random.choice(evolution_prompts)
        response = chat_groq.invoke(chosen_prompt, response_format=response_format)
        data = json.loads(response.content)
        parsed = QueryOutput(**data)
        current_input = parsed.input
        time.sleep(5)
    return current_input

      
        