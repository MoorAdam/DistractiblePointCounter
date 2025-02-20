const express = require('express')
const app = express()
const port = 3000
const dataBase = require("./databaseManager");

(async () => {
  try {
      await dataBase.connectDatabase();
      console.log('Database connection established.');
  } catch (error) {
      console.error('Failed to connect to the database:', error);
  }
})();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Yes, im working!')
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})

app.post('/api/create-episode', async (req, res) => {

  const host : string = req.body.host;
  const date : string = req.body.date;
  const title : string = req.body.title;
  const competitors : string[] = req.body.competitors;

  const response = await dataBase.createEpisode(date, host, competitors, title);

  if(!response.error){
    res.status(201);
    res.send(response);
  }
  else{
    res.status(409);
    res.send(response.error);
  }
})

app.get('/api/get-episode-by-date', async (req, res) => {

  //TODO validate date!

  const date = req.body.date;
  const result = await dataBase.getEpisodeByDate(date);

  if(!result.error){
    res.status(200);
    res.send(result);
  }
  else{
    res.status(404);
    res.send(result.error);
  }
})

app.post('/api/add-point-to-episode', async(req, res) => {

    const point = req.body.point
    const episodeId = req.body.episodeId;

    const result = await dataBase.addPoint(point, episodeId);

    if(result.error){
      res.status(406);
      res.send(result.error);
    }
    else{
      res.status(200);
      res.send(result.error);
    }
})
app.get('/api/get-all-points-from-episode', async(req,res) => {
  const episodeId = req.body.episodeId;
  const result = await dataBase.getAllPointsFromEpisode(episodeId);
  if(!result.error){
    res.status(200);
    res.send(result);
  }
  else{
    res.status(404);
    res.send("Couldn't find episode with provided id!")
  }
})