// when the document initializes, run this code: 
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

    //Submit button for adding new trains to the schedule
    $('#submit-train').on('click', function() {

        // Grabs user input. firstTrain is displayed in the military time format
        var trainName = $('#train-name').val().trim();
        var destination = $('#destination-name').val().trim();
        var frequency = $('#frequency').val().trim();
        var hour = $('#first-train-time-hour');
        var minute = $('#first-train-time-minute');
        var hourValue = hour.val().trim();
        var minuteValue = minute.val().trim();
        var hourMinute = hourValue + ":" + minuteValue;
        var firstTrain = moment(hourMinute, 'HH:mm').subtract(1, 'years').unix();


        //Push the values to the keys in the database. Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: firstTrain,
        });

        // Clears all of the text-boxes on the page after their values have been submitted to Firebase
        $('.new-train-input').val('');

        // Don't refresh the page!
        return false;
    });

    // render function for appending data to the DOM 
    function render() {
        // rows variable creates divs dynamically
        var rows = $('<div>');
        // for loop goes through all of the trains listed in the trains array (trains inputed through the train added table)
        for (var i = 0; i < trains.length; i++) {
            // setting the variable train equal to the trains variable at each index
            var train = trains[i];
            // the row variable dynamically creates table row elements in the DOM
            var row = $('<tr>');
            // for each trainName, destination, and frequency added, the text is appended in the DOM 
            // in that cell of the table 
            $(row).append($('<td>').text(train.trainName));
            $(row).append($('<td>').text(train.destination));
            $(row).append($('<td>').text(train.frequency));

            // timeDifference variable is set to the difference between now and the train's startTime in unix format, 
            // and to display that information in minutes
            var timeDifference = moment().diff(moment.unix(train.startTime), 'minutes');
            // the variable minutes away takes the frequency of the train found in the trains object and subtracts the modulus 
            // of the timeDifference and the train frequency. The result equals the minutesAway
            var minutesAway = train.frequency - (timeDifference % train.frequency);
            // nextTrain variable is calculated  by adding the minutesAway variable in minutes and formatting the number in military time
            var nextTrain = moment().add(minutesAway, 'minutes').format('HH:mm');
            // nextTrain and minutesAway are appended to the DOM in their specified cells in the table
            $(row).append($('<td>').text(nextTrain));
            $(row).append($('<td>').text(minutesAway));
            // each row is appended to the dynamically created rows div
            rows.append(row);

        }
        // table body is emptied, then the dynamically created div from the rows variable is re-appended with the children 
        $('#table-body').empty().append(rows.children());

    }
    // set Interval takes the render fuction updates it every minute 
    setInterval(render, 1000 * 60);

    // trains variable is initialized to an empty array
    var trains = [];

    // // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on('child_added', function(childSnapshot) {
            // set a variable childValue equal to the value of the childSnapshot- this value of the childSnapshot
            var childValue = childSnapshot.val();
            // push the values from Firebase to the trains array
            trains.push(childValue);
            // call the render function
            render();

            // Handle the errors
        },

        function(errorObject) {});
    // }

});
