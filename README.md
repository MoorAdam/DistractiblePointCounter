


# DistractiblePointCounter
This is a fanmade site for managing points for podcast  [Distractible](https://open.spotify.com/show/2X40qLyoj1wQ2qE5FVpA7x), hosted by 
- Mark Fishbach [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC7_YxT-KID8kRbqZo7MyscQ)
- Bob Muyskens [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@muyskerm)
- Wade Barnes [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@LordMinion777)<br>

It adheres to the rules of __The Concile Of Distractible__ which says that every point the host gives must contain a description which tells why the point was given.

![main-screenshot](/readme-images/boards%20with%20points%20screenshot.png)

## Developers

MoorAdam [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white)](https://github.com/MoorAdam)

## Technologies

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en)<br>
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](http://mongodb.com/)<br>
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)](https://daisyui.com/)<br>
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)<br>
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)<br>
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)<br>
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://www.w3schools.com/js/js_intro.asp)<br>
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](https://en.wikipedia.org/wiki/HTML)<br>
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](https://en.wikipedia.org/wiki/CSS)<br>


## Running from Docker

This application is dockerized. Meaning that you only need the Docker application to run it.
To do so, pull this project to your computer, and in the root folder of the project, type this command

```
docker build -t distractible-point-counter
```

This will create a Docker Container in the Docker Dekstop app. You can either run the app from there, or use the command

```
docker run -p 127.0.0.1:3000:3000 distractible-point-counter
```

This will start up the application, with all of its parts, including the Frontend Backend and Database

You can now open the application on [http://127.0.0.1:8080](http://127.0.0.1:8080)


## Running the frontend application

This application's front end uses Vite as its main build tool.
You will need [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en) to run this app! (You can download it by clicking on the green label)
Vite requires external libraries to run, so you need to install those.
In the terminal, navigate to the project directory. There, navigate into the frontend folder, and type
```js
npm install
```
This will download all the necessary libraries into the __node_mobules__ folder.

To run the application with __Node.js__, you can open a terminal in the project's frontend directory, and type 
``` javascript
npm run dev
```
This will allow you to view the frontend application in the browser. Use the __URL__ provided by the terminal. It should look like this: 
```
http://localhost:5173/
``` 
(Remember that __Ctrl + C__ will stop the running application, i recomend using __leftClick + copy instead__)

### Backend

To start the backend, you first need to step into the backend directory
```
cd backend
```
Then install dependencies

```
npm i
```

(if the app doesnt start without errors, use npm audit fix. This will be fixed later)

Since this project uses a mongodb backend, please install a local mongodb from https://www.mongodb.com/try/download/community
The installer will install the mongoDb compass, so you can manage databases. There, create a new database, and copy the connection link. it will look something like this *mongodb://localhost:27017/*

In the .env file inside the backend folder, put your url after the DB_URL key, and put your database's name behind the /

Now you can run your backend

```
npm run start
```

When it says "Database Connected", you are all good to go

## Usage

There are three contestants (even the host can be in the race). The user, from the start of the podcast episode, will assign points to the contestants. These can be positive and negative numbers. 

![point-table-image](/readme-images/competitor%20board.png)

The user can write the number to the left input box. The user is also required to add a description in the left input box. Without it, the system won't allow submission. 

When the user adds points and a description, they can press submit. The system will record the point in a list and display the point, description, and submission date.

![point-table-with-score-image](/readme-images/competitor%20board%20with%20points.png)

At the end of the episode, the user can click on the __Calculate Winner__ button, to reveal the winner. It will display the name and score of the victorious contestant.

![winner-image](/readme-images/winner.png)

## Future Plans
- Savable and loadable wheel of fortune
- A coin flip function
- The __The Concile Of Distractible__ has many rules, that this this project does not adhere to. In the future, there will be options for these laws to be fulfilled easily. (For example, Futurama references made by Bom, should always grant 10 points)

