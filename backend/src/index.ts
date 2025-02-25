const express = require('express')
const app = express()
const port = 3000
const dataBase = require("./databaseManager");
import { IPoint, IEpisode, IDBResponse } from "./types";

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

  console.log(req.body);

  const newEpisode : IEpisode = req.body;

  const response : IDBResponse= await dataBase.createEpisode(newEpisode);

  console.log(response);

  if(response.success){
    res.status(201);
    res.send(response);
  }
  else{
    res.status(409);
    res.send(response.errorMessage);
  }
})

app.get('/api/get-episode-by-date', async (req, res) => {

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

app.post('/api/add-point-to-episode', async(req, res) => {

    const point : IPoint = req.body.point
    const episodeDate = req.body.episodeDate;

    const result = await dataBase.addPoint(point, episodeDate);

    if(result.success){
      res.status(result.errorCode);
      res.send(result.errorMessage);
    }
    else{
      res.status(200);
      res.send(result.errorMessage);
    }
})
app.get('/api/get-all-points-from-episode', async(req,res) => {
  const date = req.body.date;
  const result = await dataBase.getAllPointsFromEpisode(date);
  if(result.success){
    res.status(200);
    res.send(result.data);
  }
  else{
    res.status(result.errorCode);
    res.send(result.errorMessage)
  }
})