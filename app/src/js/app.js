var UI = require('ui');
var Feature = require('platform/feature');
var ajax = require('ajax');
var ideaData = [];
var participants = 1;
const listURL = "https://boredapi.com/api/activity?participants=";

//home screen
var homeCard = new UI.Card({
    title: '1',
    body: 'Participant(s)\n\nPebble Activities!',
    scrollable: false,
    action: {
        backgroundColor: Feature.color('may-green', 'black'),
        up: 'images/up.png',
        select: 'images/start.png',
        down: 'images/down.png',
    }
});

//activity suggestion screen
var ideaCard = new UI.Card({
    title: "Loading...",
    scrollable: true,
    action: {
        backgroundColor: Feature.color('may-green', 'black'),
        up: 'images/up.png',
        select: 'images/refresh.png',
        down: 'images/down.png'
    }
});

//show home screen
homeCard.show();

//handle home screen button presses
homeCard.on('click', function(e) {
    switch (e.button) {
        case "up":
            //increase participants
            if (participants < 5) {
                participants++;
            }
            homeCard.title(participants);
            break;
        case "select":
            //start
            loadIdea();
            break;
        case "down":
            //decrease participants 
            if (participants > 1) {
                participants--;
            }
            homeCard.title(participants);
            break;
    }
});

//when center button clicked on compliment screen...
ideaCard.on('click', function(e) {
    //refresh compliment
    loadIdea();
});

//load compliment and display it
function loadIdea() {
    //randomly pick activity
    var pUrl = listURL + participants;
    ajax({ url: pUrl, type: 'json' },
        function(data) {
            ideaData = data;

            //update card with idea info
            ideaCard.title(ideaData.type);
            ideaCard.body(ideaData.activity);

            //show card
            ideaCard.show();
        }
    );
}