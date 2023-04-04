# Bookings-app Backend

This is a demo project that showcases various features of a web application. The project is built using Node.js and Express.js framework , and firebase as database.

The project includes the following _features_:

**Server Setup**:
The server is set up in the index.js file. The console.log statement in the file logs the URL of the demo project.

**Routing**:
The routing is handled in the index.js file. The file contains a route that sends a response to the client with a message "This is my demo project".

**Sending Gmail**:
The sendGmail function in the users.js file sends an email using the nodemailer package. The function uses the Gmail service to send an email to the specified email address. The email contains a table and an outro.

**Retrieving Data from Firestore**:
The users function in the users.js file retrieves data from the Firestore database. The function retrieves all the documents from the "bookings" collection and returns them in the response.

**Adding Data to Firestore**:
The bookingDetails function in the users.js file adds data to the Firestore database. The function adds a new document to the "bookings" collection with the specified data.

**Error Handling**:
The error handling is done in the users.js file. The file contains error handling code that returns an error response to the client in case of an error.

**To run the project, follow these steps:**

1.Clone the repository

2.Install the dependencies using the command "npm install"

3.Start the server using the command "npm start"

4.Open a web browser and go to "http://localhost:3000" to view the demo project.
