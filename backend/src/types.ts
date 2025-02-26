import { ObjectId } from "mongoose";

interface IPoint {
  _id: ObjectId;
  point: number;
  date: Date;
  competitor: string;
  description: string;
}

interface IEpisode {
  _id: ObjectId;
  recordingDate: Date;
  releaseDate?: Date;
  title?: string | "Untitled Episode";
  host: string;
  points: IPoint[];
  winner: string | null;
  competitors: string[];
}
interface IDBResponse<T = unknown>{
  success : boolean;
  errorCode? : number;
  errorMessage? : string;
  data? : T | null;
}

type INewPointData = Omit<IPoint, "_id">;
type INewEpisodeData = Omit<IEpisode, "_id">;

export {
  INewEpisodeData,
  INewPointData,
  IDBResponse,
  IPoint,
  IEpisode
}