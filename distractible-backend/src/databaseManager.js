const { ListSearchIndexesCursor, ObjectId } = require("mongodb");
const db = require("mongoose");
require("dotenv").config();

const pointSchema = db.Schema({
  point: { type: Number, required: true },
  date: { type: Date, required: true },
  competitor: { type: String, required: true },
  description: { type: String, required: true },
});

const episodeSchema = new db.Schema({
  date: { type: Date, required: true },
  title: { type: String },
  host: { type: String, required: true },
  points: [pointSchema],
  winner: { type: String },
  competitors: { type: Array, required: true },
});

async function connectDatabase() {
  try {
    await db.connect(process.env.DB_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = {
  connectDatabase,
  getEpisodeByDate,
  addPoint,
  createEpisode,
  getAllPointsFromEpisode,
};

const Episode = db.model("Episode", episodeSchema);
const Point = db.model("Point", pointSchema);

async function getEpisodeByDate(date) {
  try {
    console.log("Trying to query episde by date: " + date);

    const result = await await Episode.find().where({ date: new Date(date) });

    console.log("Search result: " + result);

    if (result != null) {
      return result;
    } else {
      return {
        error:
          "Can't find episode with the provided date! Check if the format or the date is right!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function addPoint(point, episodeId) {
  console.log("Trying to new point into episode: " + episodeId);

  try {
    if (
      !point.point ||
      !point.date ||
      !point.description ||
      !point.competitor
    ) {
      return { error: "One or mode fields are missing!" };
    }

    const searcedEpisode = await Episode.findById(episodeId);

    if (searcedEpisode) {
      const newPoint = new Point({
        point: point.point,
        date: new Date(point.date),
        description: point.date,
        competitor: point.description,
      });
      searcedEpisode.points.push(newPoint);
      const updatedEpisode = await searcedEpisode.save();

      return updatedEpisode._id;
    } else {
      console.log("Episode " + episodeId + " was not found!");
      return { error: "Episode was not found" };
    }
  } catch (err) {
    console.log(error);
    return {
      error:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function createEpisode(date, host, competitors, title = null) {
  try {
    console.log("Trying to fetch episode with date: " + date);

    const searchResult = await Episode.find().where({ date: date });

    if (searchResult.length < 1) {
      console.log("Episode not have been found! Trying to create new episode!");

      const newEpisode = new Episode({
        date: date,
        host: host,
        competitors: competitors,
        title: title,
      });
      newEpisode.save();
      console.log("New episode have been created! id: " + newEpisode._id);
      return await Episode.findOne({ date: date });
    } else {
      return { error: "An episode for this date already exists!" };
    }
  } catch (error) {
    console.log(error);
    return {
      error:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function getAllPointsFromEpisode(episodeId) {
  try {

    const episode = await Episode.findById(episodeId);

    if(episode != null){
        return episode.points;
    }
    else{
        return {error: "Couldn't find episode with rpovided id!"};
    }

  } catch (error) {
    console.log(error);
    return {
      error:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}
