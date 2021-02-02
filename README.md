# Train Travel API

Train Travel is a web app that uses the Irish Rail API to show all trains attending the selected station in the next 90 minutes. It shows the train code, origin, destination, due time in minutes and direction. The selection of the stations is made by an auto-complete feature. The project was made with Vue and Vuetify, and it's also available in my public repositories, named `train-travel-web`.

The `train-travel-api` is the complement to the web app. It's a NodeJS with Express REST API written in Typescript. It provides the developers with two simple routes to get all the stations available and the trains attending a given station. All the data is dynamically fetched from the Irish Rail API and converted from XML to JSON to better serve the web app.

> Author: **Cristian Mocho**
>
> cristiandmocho@gmail.com

## To install all dependencies

```
npm ci (to ensure a CLEAN install)
```

## To run the project locally

```
npm start
```

This will install all the dependencies and start a server on http://localhost:8000 (if the port is free)

> If you find any problems with this code or you, please get in touch using the email above!

## Irish Rail Realtime API

http://api.irishrail.ie/realtime/
