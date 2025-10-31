
def query_prompt(contexts: str):
    return f"""I want you act as a copywriter. Based on the given context, 
        which is list of strings, please generate a list of JSON objects 
        with a `input` key. The `input` can either be a question or a 
        statement that can be addressed by the given context.

        contexts:
        {contexts}
        
        Return the output in the following JSON format:
        {{
            "input": "your generated question or statement here"
        }}
        
        """

def multi_context_template(context: str, original_input: str):
    return f"""I want you to rewrite the given `input` so that it requires readers to use information from all elements in `Context`.

        1. `Input` should require information from all `Context` elements. 
        2. `Rewritten Input` must be concise and fully answerable from `Context`. 
        3. Do not use phrases like 'based on the provided context.'
        4. `Rewritten Input` should not exceed 15 words.
        
        Give only the Rewritten Input as output and nothing else.

        Context: {context}
        Input: {original_input}
        
        Return the output in the following JSON format:
        {{
            "input": "Rewritten Input here"
        }}
        """

def reasoning_template(context: str, original_input: str):
    return f"""I want you to rewrite the given `input` so that it explicitly requests multi-step reasoning.

        1. `Rewritten Input` should require multiple logical connections or inferences.
        2. `Rewritten Input` should be concise and understandable.
        3. Do not use phrases like 'based on the provided context.'
        4. `Rewritten Input` must be fully answerable from `Context`.
        5. `Rewritten Input` should not exceed 15 words.
        
        Give only the Rewritten Input as output and nothing else.

        Context: {context}
        Input: {original_input}

        Return the output in the following JSON format:
        {{
            "input": "Rewritten Input here"
        }}
        """

def hypothetical_scenario_template(context: str, original_input: str):
    return f"""I want you to rewrite the given `input` to incorporate a hypothetical or speculative scenario.

        1. `Rewritten Input` should encourage applying knowledge from `Context` to deduce outcomes.
        2. `Rewritten Input` should be concise and understandable.
        3. Do not use phrases like 'based on the provided context.'
        4. `Rewritten Input` must be fully answerable from `Context`.
        5. `Rewritten Input` should not exceed 15 words.
        
        Give only the Rewritten Input as output and nothing else.

        Context: {context}
        Input: {original_input}
        Return the output in the following JSON format:
        {{
            "input": "Rewritten Input here"
        }}
        """
def expected_output_prompt(contexts: str, evolved_query: str):
    return f"""I want you to generate an answer for the given `input`. This answer has to be factually aligned to the provided context.

        Give only the final answer as output and nothing else.
        
        Context: {contexts}
        Input: {evolved_query}
        Return the output in the following JSON format:
        {{
            "expected_output": "Your generated answer here"
        }}
        """