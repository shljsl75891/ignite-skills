# DevTinder Project

A Tinder application for making connections specifically designed for developers.

> If planning is good, writting code will be very much easy.

## Requirements

- SignUp and SignIn
- Create and Update Profile
- Feed / Explore Page for developers
- Send / Ignore Connection Requests
- Page for seeing connections and received requests
- Page for seeing sent connection requests
- Chatting with developers

## High Level Design

### Architecture

Microservices Architecture - Two Microservices

- Front End microservice using React.js
- Back End microservice using Node.js
- NoSQL Database - MongoDB

### Database Design

We should be very much conscious while designing DB schema while planning. Especially for SQL databases. As, changing schema later is a big pain.

- User collection
  - firstName
  - lastName
  - gender
  - email
  - age
  - password
- Connection Request collection
  - fromUserId
  - toUserId
  - status = `interested` | `ignored` | `accepted` | `rejected`

### API Design

HTTP REST APIs

- POST `/signup` - for creating account in dev tinder
- POST `/login` - for logging in the application
- POST `/logout` - for logging out from the application
- GET `/profile` - for getting profile details
- POST `/profile` - for creating profile
- PATCH `/profile` - for updating profile
- POST `/connection-requests` - for sending or ignoring connection requests
- GET `/connection-requests` - for fetching received or sent connection requests
- PATCH `/connection-requests` - for updating status of connection requests

> We may do changes in these designs later. No design is flawless. We are humans, and can do mistakes. More important is do planning first before writting even single line of code.
