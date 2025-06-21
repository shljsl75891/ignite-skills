# JWT Authentication

- Expire the JWT token, otherwise if someone would have access to it. He can perform actions on behalf of us lifetime.
- Use middlewares to validate the token, and easier to apply it in all APIs.
- Prefer to use `mongoose` schema methods to put reusable logic attached to the instances of model, such as creating JWT, validating password etc.
- It is OK to use longer understandable variable names. As we write codes for humans to understand.
