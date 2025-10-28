# Jokebook (CSC372 - Assignment 7)

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
   Paste the provided SQL file into Neon's SQL editor to create and populate:
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

# Technologies Used
- Node.js
- Express.js
- PostgreSQL (Neon)
- Thunder Client (API Testing)
- HTML, CSS, JavaScript (Frontend)

# Author
Hamza Ahmed  
CSC372 - Web Development  
Fall 2025  
University of North Carolina at Greensboro
