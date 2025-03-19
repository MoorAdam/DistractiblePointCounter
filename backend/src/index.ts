const express = require('express')
const app = express()
const port = 3000
const dataBase = require("./databaseManager");
import {IDBResponse, INewPointData, INewEpisodeData, IEpisode } from "./types";

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

app.post('/api/create-episode', async (req, res) => {

  const newEpisode : INewEpisodeData = req.body;

  const response : IDBResponse<string> = await dataBase.createNewEpisode(newEpisode);

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

app.post('/api/add-point', async(req, res) => {

    const point : INewPointData = req.body.point
    const episodeId = req.body.episodeId;

    console.log(req.body)

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

app.get('/api/get-episode/:episodeId', async (req, res) => {
  
  const episodeId: string = req.params.episodeId;

  if(episodeId === null){
    res.status(400);
    res.send("episodeId is empty!");
  }

  const response: IDBResponse = await dataBase.getEpisodeById(episodeId) 

  if(response.success){
    res.status(200);
    res.send(response.data);
  }
  else{
    res.status(response.errorCode);
    res.send(response.errorMessage);
  }
})

app.patch('/api/update-episode', async (req, res) => {
  
  const episodeId: string = req.body.episodeId;
  const updates : Partial<IEpisode> = req.body.updates;

  if(episodeId === null || updates === null){
    res.status(400);
    res.send("episodeId or updates is empty!");
  }

  const response: IDBResponse = await dataBase.updateEpisode(episodeId, updates) 

  if(response.success){
    res.status(201);
    res.send();
  }
  else{
    res.status(response.errorCode);
    res.send(response.errorMessage);
  }
})