# Train Travel API

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

### Endpoints

http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML

Get all stations. XML response.

---

http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=D

Get All Stations with Type being one of the following:
A for All, M for Mainline, S for suburban and D for DART.

> Any other value will be changed to A

---

http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML

Returns a listing of 'running trains', i.e. trains that are between origin and destination or are due to start within 10 minutes of the query time.

Returns TrainStatus, TrainLatitude, TrainLongitude, TrainCode, TrainDate, PublicMessage and Direction

- TrainStatus = N for not yet running or R for running
- TrainCode is Irish Rail's unique code for an individual train service on a date
- Direction is either Northbound or Southbound for trains between Dundalk and Rosslare and between Sligo and Dublin. For all other trains the direction is to the destination eg. To Limerick
- Public Message is the latest information on the train uses for a line break e.g. AA509 11:00 - Waterford to Dublin Heuston (0 mins late) - Departed Waterford next stop Thomastown
