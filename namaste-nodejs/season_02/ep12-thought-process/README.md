# Thought Process of writing APIs

- Ensure you covered all the corner cases before writing the code
- Ensure you are clear in your head that what are you going to write
- Try to put comments first of steps as part of planning before writting code
- After all planning only, we should process to write the code for the API
- Always focus on the security of the API
- POST / PUT / PATCH APIs need data sanitization to keep database safe and secure.
- GET APIs must be written in such a way to ensure there is no sensitive data leakage

> We developers are the security guard of the API. We are responsible for incoming data sanitization and prevent exposing sensitive info from outgoing data.

- A good backend engineer doesn't rely on frontend. He develop and test his APIs in request response format only.
- He should be able to develop APIs independently of UI. And at the same time, he should take care that UI dev must not complain about API response
