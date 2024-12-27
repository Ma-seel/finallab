# finallab
Tourism Management System API
Overview
This project is a Tourism Management System that provides an API for managing tourist attractions, visitors, and their reviews. It allows users to perform CRUD operations (Create, Read, Update, Delete) on the following entities:

Attractions: Locations or tourist spots with details such as name, location, entry fee, and rating.
Visitors: People visiting attractions, with their name and email.
Reviews: Feedback from visitors about attractions, including a score and comments.
The system is built using Node.js, Express, and MongoDB, and it includes various routes to manage and query the data effectively.

Features
Attractions Management:

Add, update, delete, and list tourist attractions.
View top-rated attractions.
Visitor Management:

Add, update, delete, and list visitors.
Track visitors' activities and their visited attractions.
Reviews Management:

Add, update, delete, and list reviews for attractions.
Calculate and update average ratings for each attraction based on reviews.
Additional Functionality:

Retrieve top 5 attractions based on rating.
Get visitor activity data, including average review scores and the number of attractions visited.
Technologies Used
Node.js: For building the server and handling API requests.
Express.js: For routing and middleware support.
MongoDB: For storing and retrieving data related to attractions, visitors, and reviews.
Mongoose: An ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
Project Structure
models/: Contains Mongoose models for the Attraction, Visitor, and Review entities.
routes/: Contains the API routes for managing attractions, visitors, and reviews.
server.js: The entry point of the application, where the server is set up and routes are integrated.
How to Run
Clone the repository to your local machine.
Install the required dependencies using:
bash
Copy code
npm install
Create a .env file and add the following:
makefile
Copy code
MONGO_URI=your_mongo_database_uri
PORT=5000
Start the server using:
bash
Copy code
npm start
The API will be available at http://localhost:5000.
Endpoints
POST /api/attractions: Add a new attraction.

GET /api/attractions: List all attractions.

GET /api/attractions/:id: Get a specific attraction.

PUT /api/attractions/:id: Update an attraction.

DELETE /api/attractions/:id: Delete an attraction.

POST /api/visitors: Add a new visitor.

GET /api/visitors: List all visitors.

GET /api/visitors/:id: Get a specific visitor.

PUT /api/visitors/:id: Update a visitor.

DELETE /api/visitors/:id: Delete a visitor.

POST /api/reviews: Add a review for an attraction.

GET /api/reviews: List all reviews.

GET /api/reviews/:id: Get a specific review.

PUT /api/reviews/:id: Update a review.

DELETE /api/reviews/:id: Delete a review.

GET /api/attractions/top-rated: Get the top 5 attractions based on rating.

GET /api/visitors/activity: Get visitor activity, including attractions visited and average review score.

