import mongoose, { Schema, ObjectId } from "mongoose";
import {IEpisode, IPoint, IDBResponse} from "./types";

import * as dotenv from "dotenv";
dotenv.config();

const pointSchema = new Schema<IPoint>({
  point : {type: Number, required: true},
  date: {type: Date, required: true},
  competitor: {type: String, required: true},
  description: {type: String, required: true}
});

const episodeSchema = new Schema<IEpisode>({
  date: { type: Date, required: true },
  title: { type: String },
  host: { type: String, required: true },
  points: [pointSchema],
  winner: { type: String },
  competitors: { type: [String], required: true },
});

const Episode = mongoose.model("Episode", episodeSchema);
const Point = mongoose.model("Point", pointSchema);

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit process with failure
  }
}

async function getEpisodeByDate(date: string): Promise<IDBResponse> {
  try {
    console.log("Trying to query episde by date: " + date);

    const result : IEpisode = await Episode.findOne().where({ date: new Date(date) });

    console.log("Search result: " + result);

    if (result != null) {
      return {success: true, data: result};
    } else {
      return {
        success: false,
        errorCode : 404,
        errorMessage:
          "Can't find episode with the provided date! Check if the format or the date is right!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorCode : 400,
      errorMessage:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function addPoint(point: IPoint, episodeId: string): Promise<IDBResponse> {
  console.log("Trying to new point into episode: " + episodeId);

  try {
    if (
      !point.point ||
      !point.date ||
      !point.description ||
      !point.competitor
    ) {
      return { 
        success: false,
        errorCode : 400,
        errorMessage: "One or more fields are missing!" };
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

      return { success: true};
    } else {
      console.log("Episode " + episodeId + " was not found!");
      return { 
        success: false,
        errorCode : 404,
        errorMessage: "Episode was not found" };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      errorCode : 400,
      errorMessage:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function createEpisode(episode : IEpisode): Promise<IDBResponse> {
  try {
    console.log("Trying to fetch episode with date: " + episode.date);

    const searchResult = await Episode.find().where({ date: episode.date });

    if (searchResult.length < 1) {
      console.log("Episode not have been found! Trying to create new episode!");

      const newEpisode = new Episode({
        date: episode.date,
        host: episode.host,
        competitors: episode.competitors,
        title: episode.title,
      });
      await newEpisode.save();
      console.log("New episode have been created! id: " + newEpisode._id);
      return { success: true };
    } else {
      return { success: false, errorCode : 400, errorMessage: "Episode with this date already exists!" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorCode : 400,
      errorMessage:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

async function getAllPointsFromEpisode(episodeDate: string): Promise<IDBResponse> {
  try {

    const episode = await Episode.findOne().where({date : episodeDate});

    if(episode != null){
        return {success : true, data : episode.points};
    }
    else{
        return {success : false, errorCode: 400, errorMessage: "Couldn't find episode with provided date!"};
    }

  } catch (error) {
    console.log(error);
    return {
    success: false,
    errorCode : 400,
    errorMessage:
        "Something went wrong! Please check if request was submitted with the right data, in the right format!",
    };
  }
}

module.exports = {
  connectDatabase,
  getEpisodeByDate,
  addPoint,
  createEpisode,
  getAllPointsFromEpisode,
};

