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

app.put('/api/set-episode-title', async (req, res) => {

  const episodeId: string = req.body.episodeId;
  const episodeTitle: string = req.body.episodeTitle;

  if(episodeId === null || episodeTitle === null){
    res.status(400);
    res.send("episodeId or episodeTitle is empty!");
  }

  const updates : Partial<IEpisode> = {title : episodeTitle}

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

app.put('/api/set-episode-release-date', async (req, res) => {

  const episodeId: string = req.body.episodeId;
  const episodeReleaseDate: string = req.body.episodeReleaseDate;

  if(episodeId === null || episodeReleaseDate === null){
    res.status(400);
    res.send("episodeId or episodeDate is empty!");
  }

  const updates : Partial<IEpisode> = {releaseDate : new Date(episodeReleaseDate)}

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

app.put('/api/close-episode', async (req, res) => {

  const episodeId: string = req.body.episodeId;

  if(episodeId === null){
    res.status(400);
    res.send("episodeId or episodeDate is empty!");
  }

  const updates : Partial<IEpisode> = {isClosed : true}

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