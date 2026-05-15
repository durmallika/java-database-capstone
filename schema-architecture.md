**Section 1: Architecture summary: ** [a paragraph or two describing your application's architecture in your own words]
This Spring Boot application uses both MVC and REST controllers. 
Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules.
The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). 
All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. 
MySQL uses JPA entities while MongoDB uses document models.

**Section 2: Numbered flow of data and control:** [Create a numbered list (1 to 7) describing each step of the data flow based on the architecture diagram.]

1. User Interface Layer: User accesses AdminDashboard or Appointment pages.
2. Controller Layer: The action is routed to the appropriate Thymeleaf or REST controller.
3. Service Layer: The controller calls the service layer...which acts as the heart of the backend system.
4. Repository Layer: The service layer communicates with the Repository Layer to perform data access operations.
   This layer includes two types of repositories:  MySQL Repositories & MongoDB Repository,
5. Database access: Each repository interfaces directly with the underlying database engine:
        -> MySQL stores all core entities that benefit from a normalized relational schema and constraints—such as users, roles, and appointments.
        -> MongoDB stores flexible and nested data structures, such as prescriptions, which may vary in format and allow for rapid schema evolution.
    This dual-database setup leverages the strengths of both structured and unstructured data storage approaches.
   
6.Model binding: Once data is retrieved from the database, it is mapped into Java model classes that the application can work with. 
This process is known as model binding.

      -> In the case of MySQL, data is converted into JPA entities, which represent rows in relational tables and are annotated with @Entity.
      ->For MongoDB, data is loaded into document objects, typically annotated with @Document, which map to BSON/JSON structures in collections.

  These model classes provide a consistent, object-oriented representation of the data across the application layers.   

7. Application models in use: Finally, the bound models are used in the response layer:

        -> In MVC flows, models are passed from the controller to Thymeleaf templates, where they are rendered as dynamic HTML for the browser.
       ->In REST flows, the same models (or transformed DTOs) are serialized into JSON and sent back to the client as part of an HTTP response.
  
  This marks the end of the request-response cycle, delivering either a full web page or structured API data, depending on the consumer.


