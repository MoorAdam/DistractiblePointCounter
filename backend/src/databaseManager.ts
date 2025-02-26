import mongoose, { Schema } from "mongoose";
import {IEpisode, IPoint, IDBResponse, INewEpisodeData, INewPointData} from "./types";
import {v4 as uuidv4} from "uuid";

import * as dotenv from "dotenv";
dotenv.config();

const pointSchema = new Schema<IPoint>({
  point : {type: Number, required: true},
  date: {type: Date, required: true},
  competitor: {type: String, required: true},
  description: {type: String, required: true}
});

const episodeSchema = new Schema<IEpisode>({
  publicId : { type: String, required: true, unique: true},
  recordingDate: { type: Date, required: true},
  releaseDate : { type: Date, unique: true},
  title: { type: String },
  host: { type: String, required: true },
  points: [pointSchema],
  winner: { type: String },
  competitors: { type: [String], required: true },
});

const Episode = mongoose.model("Episode", episodeSchema);

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

async function createEpisode(episode : INewEpisodeData): Promise<IDBResponse> {
  try {

      const newEpisode = new Episode({
        ...episode, publicId : uuidv4()
      });
      await newEpisode.save();
      return { success: true, data: newEpisode.publicId };
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



async function addPoint(point: INewPointData, episodeId: string): Promise<IDBResponse> {
  console.log("Trying to new point into episode: " + episodeId);

  try {

    const searcedEpisode = await Episode.findOne().where({publicId : episodeId});

    //TODO: make new point uses the IPoint interface

    if (searcedEpisode) {
      const newPoint : IPoint = {
        ...point, publicId : uuidv4()
      };

      searcedEpisode.points.push(newPoint);
      await searcedEpisode.save();

      const updatedEpisode = await Episode.findOne().where({date : episodeId});

      //TODO: add check for saved episode, and its in the Points array

      return { success: true, data: newPoint };
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

async function getAllPointsFromEpisode(episodeId: string): Promise<IDBResponse> {
  try {

    const episode = await Episode.findOne().where({publicId : episodeId});

    if(episode != null){
        return <IDBResponse<IPoint[]>>{success : true, data : episode.points};
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

