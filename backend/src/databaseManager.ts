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

//TODO: The release and recording dates dont need to be unique

const episodeSchema = new Schema<IEpisode>({
  publicId : { type: String, required: true, unique: true},
  isClosed : { type : Boolean, default: false},
  recordingDate: { type: Date, required: true},
  releaseDate : { type: Date},
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
    console.log("Trying to query episode by date: " + date);

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
        "Something went wrong! Please check if request was submitted with the right data, in the right format! " + error.errorMessage,
    };
  }
}

async function createNewEpisode(episode : INewEpisodeData): Promise<IDBResponse> {
  try {
    console.log(episode);
    const newEpisode = new Episode({
      ...episode,
      publicId: uuidv4(),
    });

    await newEpisode.save(); // Await without callback

    return { success: true, data: { episodeId: newEpisode.publicId } };
  } catch (error) {

    if(error.code === 11000){
      console.log(`full error: ${error}`)
      return {
        success: false,
        errorCode: 409,
        errorMessage: `An episode with these properties already exists`, // Access `message` correctly
      };
    }
    return {
      success: false,
      errorCode: 400,
      errorMessage: `Error saving episode: ${error.message}`, // Access `message` correctly
    };
  }
}



async function addPoint(point: INewPointData, episodeId: string): Promise<IDBResponse> {
  console.log("Trying to new point into episode: " + episodeId);

  try {

    const searchedEpisode = await Episode.findOne().where({publicId : episodeId});

    //TODO: make new point uses the IPoint interface

    if (searchedEpisode) {
      const newPoint : IPoint = {
        ...point, publicId : uuidv4()
      };

      searchedEpisode.points.push(newPoint);
      await searchedEpisode.save();

      //const updatedEpisode = await Episode.findOne().where({date : episodeId});

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

async function updateEpisode(episodeId: string, episodeData: Partial<IEpisode>): Promise<IDBResponse> {
  try {
    const episode = await Episode.findOne({ publicId: episodeId });

    if (!episode) {
      return {
        success: false,
        errorCode: 404,
        errorMessage: `Can't find episode with episodeId: ${episodeId}`
      };
    }

    Object.keys(episodeData).forEach((key) => {
      if (key in episode) {
        (episode as any)[key] = episodeData[key as keyof IEpisode];
      }
    });

    await episode.save();

    return { success: true };

  } catch (error) {
    console.error("Error updating episode:", error);

    return {
      success: false,
      errorCode: 500,
      errorMessage: "An error occurred while updating the episode."
    };
  }
}

async function getEpisodeById(episodeId: string): Promise<IDBResponse> {
  try {
    const episode = await Episode.findOne({ publicId:
      episodeId });

    if (!episode) {
      return {
        success: false,
        errorCode: 404,
        errorMessage: `Can't find episode with episodeId: ${episodeId}`
      };
    }
    return { success: true, data: episode };
  } catch (error) {
    console.error("Error getting episode by id:", error);
    return {
      success: false,
      errorCode: 500,
      errorMessage: "An error occurred while getting the episode."
    };
  }
}

module.exports = {
  connectDatabase,
  getEpisodeByDate,
  addPoint,
  createNewEpisode,
  getAllPointsFromEpisode,
  updateEpisode,
  getEpisodeById
};