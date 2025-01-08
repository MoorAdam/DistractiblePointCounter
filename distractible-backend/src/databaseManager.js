const db = require('mongoose');
require('dotenv').config();

const point = db.Schema({
    point : {type : Number, required : true},
    date : {type : Date, required : true},
    competitor : {type : String, required : true},
    description : {type : String, required : true}
});

const episode = new db.Schema({
    date : {type : Date, required : true},
    title: {type : String},
    points : {type : Array, "default" : []},
    host : [point]
});

async function connectDatabase() {
    try {
        await db.connect(process.env.DB_URL);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = {
    connectDatabase,
    getTodaysEpisode,
    addPoint,
    createEpisode
};

async function getTodaysEpisode(){
    //This function will return today's episode's information. If there wasnt an episode today, it will return null
}

async function addPoint(date, point, description, competitor){
    //This function will insert a point to the episode by date. It will return an error if there is episode with that date
    //it will return the id of the point
}

async function createEpisode(date, host, competitors, title = null){
    //this function will create a record of a new episode, from date, host, an array of competitors, and an optional title.
    //It returns an error if an episode already exists on that date
    //it returns the id of the new episode
} 