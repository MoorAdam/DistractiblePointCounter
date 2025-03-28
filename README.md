


# DistractiblePointCounter
This is a fan-made site for managing points for the podcast  [Distractible](https://open.spotify.com/show/2X40qLyoj1wQ2qE5FVpA7x), hosted by 
- Mark Fishbach [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC7_YxT-KID8kRbqZo7MyscQ)
- Bob Muyskens [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@muyskerm)
- Wade Barnes [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@LordMinion777)<br>

It adheres to the rules of __The Concile Of Distractible__ which says that every point the host gives must contain a description which tells why the point was given.

![main-screenshot](/readme-images/background.jpg)
![main-screenshot](/readme-images/episodes%20page.png)
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
To do so, pull this project to your computer, and in the root folder of the project, run this command

```
docker compose -f 'docker-compose.yaml' up -d --build
```

This will create all the necessary images, download dependencies, and starts the container itself.

Now, you can just simply go to your browser, and on [http://localhost:8080/](http://localhost:8080/) you can view the application

## Usage

The application is used for managing episodes, and assing points for the contestants of said episodes. 

When you open the application, you will find yourself on the episodes page. This is where all the existing episodes are visible. Here you can see some information about the episode, and have the ability to open the episode. You also have the ability, to create a new episode, witht the __Create Episode__ button on the top menu bar

![episodes-page-image](/readme-images/episodes%20page.png)

### Creating a new episode

When you click on the __Create Episode__ button, the app jumps to the episode page, and reveales a dialog box. Here, the user can assign a few properties for the episode, like 
- Title (not required, can be changed later)
- Recording Date
- Release Date (not required, can be changed later)
- Host (required)

Pressing __Create Episode__ will hide the dialog box, and lets the user to start assigning points

![new-episode-image](/readme-images/new%20episode.png)

### Episode

When you either open an episode, or create a new one, three contestants appear ont the page. These three are the 3 main participants in the podcast. They compete with each other, while the host (user) assigns points for them (even the host can be in the race). The user, from the start of the podcast episode, will assign points to the contestants. These can be positive and negative numbers. 

![point-table-image](/readme-images/competitor%20board.png)

### Adding points

The user can write the number to the left input box. The user is also required to add a description in the left input box. Without it, the system won't allow submission. 

The points can be saved with the Submit button. The system will save the point in a list and display it under the input fields.

![point-table-with-score-image](/readme-images/competitor%20board%20with%20points.png)

### Calculating the winner

At the end of the episode, the user can click on the __Calculate Winner__ button, to reveal the winner. It will display the name and score of the victorious contestant.

![winner-image](/readme-images/winner.png)

### Ending the episode

After the winner is revealed, the user can choose to end the episode. This will reveale a dialog box, where the user can change the properties of the episode if they so choose to (it's not required)

When they press save, the system will save the changes

![end-episode-image](/readme-images/end%20episode%20dialog.png)

## Future Plans
- Savable and loadable wheel of fortune
- A coin flip function
- The __The Concile Of Distractible__ has many rules, that this this project does not adhere to. In the future, there will be options for these laws to be fulfilled easily. (For example, Futurama references made by Bom, should always grant 10 points)

