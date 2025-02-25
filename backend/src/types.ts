interface IPoint {
  point: number;
  date: Date;
  competitor: string;
  description: string;
}

interface IEpisode {
  date: Date;
  title?: string | "Untitled Episode";
  host: string;
  points: IPoint[];
  winner: string | null;
  competitors: string[];
}

interface IError {
  errorCode : number;
  errorMessage : string;
}

export {
  IError,
  IPoint,
  IEpisode
}