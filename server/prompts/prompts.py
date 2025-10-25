
def query_prompt(contexts: str):
    return f"""I want you act as a copywriter. Based on the given context, 
        which is list of strings, please generate a list of JSON objects 
        with a `input` key. The `input` can either be a question or a 
        statement that can be addressed by the given context.

        contexts:
        {contexts}"""