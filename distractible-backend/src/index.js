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

app.get('/', (req, res) => {
  res.send('Yes, im working!')
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})