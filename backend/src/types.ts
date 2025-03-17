import { ObjectId } from "mongoose";

interface IPoint {
  publicId : string,
  point: number;
  date: Date;
  competitor: string;
  description: string;
}

interface IEpisode {
  publicId : string,
  isClosed : true | false,
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

type INewPointData = Omit<IPoint, "publicId">;
type INewEpisodeData = Omit<IEpisode, "publicId">;

export {
  INewEpisodeData,
  INewPointData,
  IDBResponse,
  IPoint,
  IEpisode
}