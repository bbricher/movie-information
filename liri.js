require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require('axios');

var searchType = process.argv[2];

var userInput = "";

for (let i = 2; i < process.argv.length; i++) {
    if (i > 2) {
        userInput = userInput + "+" + process.argv[i];
    } else {
        userInput = process.argv[i];
    }
}

var urlConcerts = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

var urlOMBD = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";






if (searchType === "concert-this") {
    console.log("venue");
    console.log("location");
    console.log("date")
} else if (searchType === "spotify-this-song") {
    if (process.argv.length < 3) {
        userInput = "The+Sign"
    }
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log(data); 
    });
    
    console.log("artist");
    console.log("song name");
    console.log("preview link");
    console.log("album");

} else if (searchType === "movie-this") {
    if (process.argv.length < 3) {
        userInput = "Mr.+Nobody"
    }
    axios.get(urlOMBD)
    .then(function(response) {
        
    });
} else if (searchType === "do-what-it-says") {

}




