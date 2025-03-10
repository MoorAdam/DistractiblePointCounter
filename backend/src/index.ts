const express = require('express')
const app = express()
const port = 3000
const dataBase = require("./databaseManager");
import { IPoint, IEpisode, IDBResponse, INewPointData, INewEpisodeData } from "./types";

(async () => {
  try {
      await dataBase.connectDatabase();
      console.log('Database connection established.');
  } catch (error) {
      console.error('Failed to connect to the database:', error);
  }
})();

app.use(express.json());

app.get('/', (res) => {
  res.send('Yes, im working!')
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})

//Episode based endpoints

app.post('/api/create-episode', async (req: { body: INewEpisodeData; }, res: { status: (arg0: number) => void; send: (arg0: string | IDBResponse<unknown>) => void; }) => {

  const newEpisode : INewEpisodeData = req.body;

  const response : IDBResponse<string>= await dataBase.createEpisode(newEpisode);

  console.log(response);

  if(response.success){
    res.status(201);
    res.send(response.data);
  }
  else{
    res.status(response.errorCode);
    res.send(response.errorMessage);
  }
})

app.get('/api/get-episode-by-date', async (req: { body: { date: any; }; }, res: { status: (arg0: number) => void; send: (arg0: any) => void; }) => {

  //TODO validate date!

  const date = req.body.date;
  const result = await dataBase.getEpisodeByDate(date);

  if(result.success){
    res.status(200);
    res.send(result.data);
  }
  else{
    res.status(result.errorCode);
    res.send(result.errorMessage);
  }
})

//Point based endpoints

app.post('/api/add-point-to-episode', async(req, res) => {

    const point : INewPointData = req.body.point
    const episodeId = req.body.episodeId;

    const result = await dataBase.addPoint(point, episodeId);

    if(result.success){
      res.status(200);
      res.send({pointId : result.data.publicId});
    }
    else{
      res.status(result.errorCode);
      res.send(result.errorMessage);
    }
})

app.get('/api/get-all-points-from-episode', async(req: { body: { episodeId: any; }; }, res: { status: (arg0: number) => void; send: (arg0: any) => void; }) => {
  const episodeId = req.body.episodeId;
  const result = await dataBase.getAllPointsFromEpisode(episodeId);
  if(result.success){
    res.status(200);
    res.send(result.data);
  }
  else{
    res.status(result.errorCode);
    res.send(result.errorMessage)
  }
})