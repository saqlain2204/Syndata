from prompts.prompts import multi_context_template, reasoning_template, hypothetical_scenario_template
import random
from langchain_groq import ChatGroq
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
    for _ in range(steps):
        chosen_prompt = random.choice(evolution_prompts)
        current_input = ChatGroq(model=model, api_key=api_key).invoke(chosen_prompt)
        time.sleep(5)
    return current_input.content

      
        