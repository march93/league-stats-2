# League Stats 2

The league stats apps displays match information for a specified summoner. Enter the name of a summoner and retrieve all their latest matches and details.

## Features

* Search for summoner matches based on name
* Determine the outcome (win or defeat)
* View game duration (h:mm:ss format)
* View summoner name
* View summoner spells and their respective icons and names
* Name of the champion and level played during the match
* KDA ratio
* View name of items bought during the match
* Total creep score and creep score per minute
* View more matches by clicking the view more button at the bottom

## Front End

The front end of this app is built entirely with React/Redux.

## Back End

The back end is built with NodeJS to handle all the logic. It also makes API calls to League of Legend's public API, then sends that data over to the front end. A reverse proxy is used to redirect calls to the correct location.

## Popular Libraries/Frameworks

The app makes heavy use of Bootstrap and Material UI for the interface. This cuts down time spent on custom UI pieces. Axios is the go to HTTP client to make API calls. It's use of promises provides a more robust capability to handle the workflow for this project.

## Deployment

The app is currently deployed on Heroku. Config Vars are used to store the League API key so as to not hard code it in the actual files. You can access the app here: https://league-stats-2.herokuapp.com