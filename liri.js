require("dotenv").config();

var moment = require('moment');

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var fs = require("fs")

var exec = require('child_process');

var spotify = new Spotify(keys.spotify);

var axios = require('axios');

var searchType = process.argv[2];

var userInput = "";

for (let i = 3; i < process.argv.length; i++) {
    if (i > 3) {
        userInput = userInput + "+" + process.argv[i];
    } else {
        userInput = process.argv[i];
    }
}

if (searchType === "concert-this") {
    var urlConcerts = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(urlConcerts).then(
        function(response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
            console.log("Date: " + moment(response.data[0].datetime).format('L'));
            // console.log("venue");
            // console.log("location");
            // console.log("date")
        })
} else if (searchType === "spotify-this-song") {
    if (process.argv.length === 3) {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
        .then(function(data) {
        console.log("Artist: " + data.artists[0].name);
        console.log("Song: " + data.name);
        console.log("Preview: " + data.preview_url);
        console.log("Album: " + data.album.name);
        })
        .catch(function(err) {
        console.error('Error occurred: ' + err); 
        });
    } else {
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
    }

} else if (searchType === "movie-this") {
    if (process.argv.length === 3) {
        userInput = "Mr.+Nobody"
    }
    var urlOMBD = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(urlOMBD)
    .then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Production Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
} else if (searchType === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
    exec('"liri.js " + data');
    // searchType = data;
    if (error) {
        return console.log(error);
    }
    })
}




