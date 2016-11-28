// initialize the javascript document 
$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBA9aMvPQ6pxeyEC4nS2WPR9rR2FxhEqYI",
        authDomain: "trainscheduler-7ef88.firebaseapp.com",
        databaseURL: "https://trainscheduler-7ef88.firebaseio.com",
        storageBucket: "trainscheduler-7ef88.appspot.com",
        messagingSenderId: "502300233400"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //Global variables
    var trainName = '';
    var destination = '';
    var frequency;
    var nextArrival;
    var currentTime;
    var firstTrain;
    var timeDifference;
    var minutesAway;
    var nextTrain;

    //Submit button for adding new trains to the schedule
    $('#submit-train').on('click', function() {

        // Grabs user input. Perform calculations for firstTrain, timeDifference, nextTrain by using moment
        trainName = $('#train-name').val().trim();
        destination = $('#destination-name').val().trim();
        frequency = $('#frequency').val().trim();
        firstTrain = moment($('#first-train-time').val().trim(), 'HH:mm').subtract(1, 'years').format('X');
        timeDifference = moment().diff(moment.unix(firstTrain), 'minutes');
        minutesAway = frequency - (timeDifference % frequency);
        nextTrain = moment().add(minutesAway, 'minutes').format('HH:mm');

        //Push the values to the keys in the database
        // Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: firstTrain,
            nextArrival: nextTrain,
            minutesAway: minutesAway,

        });

        // Clears all of the text-boxes on the page after their values have been submitted to Firebase
        $('#train-name').val('');
        $('#destination-name').val('');
        $('#first-train-time').val('');
        $('#frequency').val('');

        // Don't refresh the page!
        return false;
    });

    // // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on('child_added', function(childSnapshot) {

            var row = $('<tr>');
            $(row).append($('<td>').text(childSnapshot.val().trainName));
            $(row).append($('<td>').text(childSnapshot.val().destination));
            $(row).append($('<td>').text(childSnapshot.val().frequency));
            $(row).append($('<td>').text(childSnapshot.val().nextArrival));
            $(row).append($('<td>').text(childSnapshot.val().minutesAway));
            $('#table-body').append(row);


            // Handle the errors
        },
        function(errorObject) {
            console.log('Errors handled: ' + errorObject.code);

        });
});
