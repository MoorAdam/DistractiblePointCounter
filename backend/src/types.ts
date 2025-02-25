import { ObjectId } from "mongoose";

interface IPoint {
  _id?: ObjectId;
  point: number;
  date: Date;
  competitor: string;
  description: string;
}

interface IEpisode {
  _id?: ObjectId;
  date: Date;
  title?: string | "Untitled Episode";
  host: string;
  points: IPoint[];
  winner: string | null;
  competitors: string[];
}
interface IDBResponse{
  success : boolean;
  errorCode? : number;
  errorMessage? : string;
  data? : any;
}

export {
  IDBResponse,
  IPoint,
  IEpisode
}