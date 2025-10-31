# Jokebook: CSC372 - Assignment 7 (Look below at the Demo Video Section to view the Demo video)

This project is a full-stack web application built with Node.js, Express, and PostgreSQL. It allows users to view, search, and add jokes stored in a relational database. The database is hosted on Neon and accessed securely through environment variables.    

# Setup Instructions

1. Clone the Repository
   git clone https://github.com/hamza890890/assignment-7-jokebook.git
   cd assignment-7-jokebook

2. Install Dependencies
   npm install

3. Create a Neon Database
   - Go to https://neon.tech
   - Copy your DATABASE_URL
   - Create a .env file and paste:
     DATABASE_URL=your_neon_database_url_here

4. Run the SQL Setup Script
   Paste the provided SQL script (at the bottom of these instructions) into Neon's SQL editor to create and populate: 
   - categories table
   - jokes table
   - Initial jokes for funnyJoke and lameJoke

5. Start the Server
   node server.js
   Then open your browser at http://localhost:3000

# API Endpoints

Method | Endpoint | Description
-------|-----------|-------------
GET | /jokebook/categories | Returns all joke categories
GET | /jokebook/category/:category | Returns jokes in a specific category
GET | /jokebook/random | Returns one random joke
POST | /jokebook/add | Adds a new joke (category, setup, delivery)

# Example POST Request

URL:
http://localhost:3000/jokebook/add

Form Data (Body):
Key | Value
----|------
category | funnyJoke
setup | Why did the computer show up at work late?
delivery | It had a hard drive!

Expected JSON Output:
[
  {
    "setup": "Why did the student eat his homework?",
    "delivery": "Because the teacher told him it was a piece of cake!",
    "category": "funnyJoke"
  },
  {
    "setup": "Why did the computer show up at work late?",
    "delivery": "It had a hard drive!",
    "category": "funnyJoke"
  }
]

# Webpage Functionality
- Displays a random joke on page load
- Show Categories button lists all joke categories
- Selecting a category or searching shows jokes from that category
- Add Joke form lets users submit a new joke
- Category name is displayed beside each joke

# Testing with Thunder Client
All endpoints can be tested inside VS Code using Thunder Client:

1. Create requests for each endpoint.
2. For POST, choose Body → Form Data and include 3 keys:
   - category
   - setup
   - delivery

# Demo Video
https://uncg.instructuremedia.com/embed/ac6f7f2e-76bd-42ba-95d9-5f128419d2b9

# Technologies Used
- Node.js
- Express.js
- PostgreSQL (Neon)
- Thunder Client (API Testing)
- HTML, CSS, JavaScript (Frontend)

# Provided SQL Script (Copy and paste the following into your SQL Editor and click run)

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE jokes (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  setup TEXT NOT NULL,
  delivery TEXT NOT NULL
);

INSERT INTO categories (name) VALUES
('funnyJoke'),
('lameJoke');

INSERT INTO jokes (category_id, setup, delivery) VALUES
(1, 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!'),
(1, 'What kind of tree fits in your hand?', 'A palm tree'),
(1, 'What is worse than raining cats and dogs?', 'Hailing taxis');

INSERT INTO jokes (category_id, setup, delivery) VALUES
(2, 'Which bear is the most condescending?', 'Pan-DUH'),
(2, 'What would the Terminator be called in his retirement?', 'The Exterminator');

SELECT * FROM categories;
SELECT * FROM jokes;

# Author
Hamza Ahmed  
CSC372 - Web Development  
Fall 2025  
University of North Carolina at Greensboro
