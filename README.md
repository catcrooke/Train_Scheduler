# Train_Scheduler
This is the train scheduler assignment for Week 6. The goal of this project is to have both train schedules that appear on a page that will show the following: 
-train name
-train destination
-frequency of train
-train's next arrival time as it relates to the current time
-minutes away that train is from the current time

-In addition, there will be a form below the train schedule that will allow a user to add a train to the schedule 

Step 1: Make the primary files needed for project: 
-index.html
-assets folder containing:
a) css folder for style.css document
b) images folder for any images to be applied as styling for the document
c) javascript folder for the train.js document 
-index.php file for deploying to heroku

Step 2: Link the local CSS and JS files to the HTML page, as well as the JQuery library and Bootstrap library so that they can be accessed during the project. Later on when styling is being performed for the page, Google font links can be added to the HTML page for use as part of styling the page- in this instance, there would be a link for the HTML page and a specific font name to be used in the CSS page.  

Step 3: Create skeleton HTML page so that the javascript document can be used to dynamically update information displayed on the page. A table and a form with input fields an a submit button are the primary items that need to be added. The table will be where the train schedules will be displayed, and the form will be where new trains can be added to the schedule.

Step 4: work on the JS file- initialize the JS document with the on ready function, initialize Firebase, determine the global variables, create an on-submit function that take the values or calculates the values needed for the Train Schedule from the input fields of the form. Push the values collected in the input fields to the keys of the Firebase database, then clear all of the values in the input fields after the submit button is clicked. Firebase watcher updates the Train Schedule by appending the values of each field to the table dynamically. Anonymous function errorObject handles any errors. 

Step 5: Add styling as needed- background image, Google font


