# Microservices vs Monolith Architecture

### What is Software Development Lifecycle (SDLC) ?

This is also known as **WaterFall Model**.

1. **Requirements Gathering:** This is generally done by Project Manager. In small companies, sometimes even CEO.
2. **Design:** This is done by collaboration between Project Manager and Designers for mock UI Designs. Tech Stack, Architecture, LLD, HLD is also decided in this phase by Architects and Senior Engineers and design documents are prepared.
3. **Development:** Writting code and unit tests are covered in this phase. Interns, Junior and Senior engineers comes into picture in this phase.
4. **Testing:** This is done by QAs for automated and manual testing of all the use cases. In small companies, sometimes developers do the testing.
5. **Deployement:** This is generally done by Devops or Developers. Devops manage the end servers which serve final web application.
6. **Maintainence:** Following same lifecycle again for adding new features.

### Microservices v/s Monolith Architecture

| Parameters             | Monolith                          | Microservice                      |
| ---------------------- | --------------------------------- | --------------------------------- |
| Development Speed      | Slower                            | Faster                            |
| Code Repository        | Single                            | Multiple                          |
| Scalability            | Difficult                         | Easier                            |
| Deployement            | Single                            | Multiple                          |
| Tech Stack             | Stick to single                   | Luxury to choose different        |
| InfraCost              | Lower                             | Higher                            |
| Complexity             | High                              | Low                               |
| Fault Isolation        | Nightmare, 1 issue whole app down | Only 1 service down               |
| Testing                | End2End easy                      | End2End tough                     |
| Ownership              | Single team                       | Multiple teams                    |
| Maintainence           | Difficult                         | Easier                            |
| Revamps                | Difficult                         | Easier                            |
| Debugging              | Easier                            | Difficult (which service's issue) |
| Development Experience | Not good                          | Good                              |
