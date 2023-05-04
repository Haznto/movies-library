# Movies Library - Version 1.0

**Author Name**: Hasan Tummalei

## WRRC
![WRRC for My Movie Library!](./movie%20library%20wrrc.jpg "Trending Movies!")
## Overview

This is the first version of my first server using node and express.

## Getting Started

1. Install the latest version of stable Nodejs.
2. Make a directory  for the project.
3. Create server.js file as a starting point for the application.
4. Initiate package.json file using  `npm init -y` 
5. Installing express and cors packages using `npm i express cors`
6. Then use express and cors packages to build up your server by declaring a variable for each, containing the required framework and library.
7. Created a constructor function to regenerate the info we are importing (requiring the db.json) into a template of our choice to deal with.
8. We used a databased so you should have your own db.json you will reply on to make your project work.
9. Start dealing with requests mainly in this project we used `get` http request to recieve requests and send responses using the built in parameters passed into our call back function eg. `req,res` and we declared a path (routes) so our function will execute once that path been called by the user, once it's called a response will got back using `res.send` as an example.
10. Then we created Error handlers using different methods for each.

## Project Features

- Recieving requests from users based on the url path they are visiting and rendering information from our data base as a response using expressJs framework.
- Handling errors if happened during the user experience using the website.
- The project was built with NodeJs on local machine as a first version object.
- data are returned in json format to deal with clients.
