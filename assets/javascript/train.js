$(document).ready(function() {
    // var tablePosition = 0;
    // $('#submit-button').on('click', function() {
    //     var row = $('#table').insertRow(tablePosition);
    //     var cell0 = row.insertCell(0);
    //     var cell1 = row.insertCell(1);
    //     var cell2 = row.insertCell(2);
    //     var cell3 = row.insertCell(3);
    //     var cell4 = row.insertCell(4);
    //     var cell5 = row.insertCell(5);
    // });

    // should be getting the x
    // var trainSchedule = [
    //     {
    //         train: '',
    //         times: '',
    //     }
    // ];

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




    // pre-loaded train times can come from an object 

    // var trainSchedule = {
    //         schedules: [
    //         {
    //             trainName: 'Hogwarts Express',
    //             destination: ['London', 'Montpelier', 'Barre City', 'Burlington'],
    //             frequency: ,
    //             nextArrival,
    //             minutesAway
    //         }, {
    //             trainName: 'Pride and Prejudice',
    //             destination: ['Battleboro', 'Montpelier', 'Barre City', 'Burlington'],
    //             frequency: ,
    //             nextArrival,
    //             minutesAway
    //         }, 
    //         ]}

    // to calculate next arrival and minutes away
    // next Train time = (frequency of trains * #trains passed) + initial Time 
    // minutes away to next train === minutes away = moment(time).fromNow()
    // difference between current time and next train time
    // nextTrain time - 

    //Global variables
    var trainName = "";
    var destination = "";
    var frequency;
    var nextArrival;
    var currentTime;
    var firstTrain;
    var timeDifference;
    var minutesAway;
    var nextTrain;

    //When the submit for the form is clicked
    $('#submit-train').on('click', function() {
        trainName = $("#train-name").val().trim();
        destination = $("#destination-name").val().trim();
        frequency = $('#frequency').val().trim();
        firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").subtract(1, "years").format("X");

        timeDifference = moment().diff(moment.unix(firstTrain), "minutes");
        minutesAway = frequency - (timeDifference % frequency);
        nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

        console.log("currentTime =", moment());
        console.log("time difference =", timeDifference);
        console.log("firstTrain=", firstTrain);
        console.log("minutesAway =", minutesAway);
        console.log("nextTrain =", nextTrain);





        //Push the values to the keys in the database
        // Code for handling the push

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: firstTrain

            // nextArrival: nextArrival,
            // minutesAway: minutesAway

        });

        // Don't refresh the page!
        return false;
    });

    // // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

        //     // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);

        //     console.log(childSnapshot.val().role);
        //     console.log(childSnapshot.val().startDate);
        //     console.log(childSnapshot.val().monthlyRate);
        //     console.log(childSnapshot.val().dateAdded);
        //     console.log(childSnapshot.val().monthsWorked);
        //     console.log(childSnapshot.val().billed);
        // var row = $('<tr>');


        // $(row).append($('<td>').text(childSnapshot.val().trainName));


        //     $(row).append($('<td>').text(childSnapshot.val().role));
        //     $(row).append($('<td>').text(childSnapshot.val().startDate));
        //     $(row).append($('<td>').text(childSnapshot.val().monthsWorked));
        //     $(row).append($('<td>').text("$" + childSnapshot.val().monthlyRate));
        //     $(row).append($('<td>').text("$" + childSnapshot.val().billed));
        //     $('#table-body').append(row);


        //     // Handle the errors
        // },
        // function(errorObject) {
        //     console.log("Errors handled: " + errorObject.code);

    });




});
