import axios from 'axios';
import XMLParser from './XMLParser.service';

interface IStation {
  Description: string;
  Alias?: string;
  Geolocation: { Latitude: number; Longitude: number };
  Code: string;
  Id: number;
}

interface ITrainInfo {
  Code: string;
  StationName: string;
  Stationcode: string;
  Origin: string;
  Destination: string;
  OriginTime: string;
  DestinationTime: string;
  Status: string;
  LastLocation?: string;
  DueIn: number;
  Late: number;
  ExpectedArrival: string;
  ExpectedDepart: string;
  ScheduledArrival: string;
  ScheduledDepart: string;
  Direction: string;
  Type: string;
  LocationType: string;
}

const BASE_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';

export default class StationService {
  static async GetAllStations() {
    const data = await axios.get(`${BASE_URL}/getAllStationsXML`).then((resp) => resp.data);

    // The ".ArrayOfObjStationData.objStationData" part is necessary due to
    // the way the data comes from the Irish Rail API and the way xml-js parses it
    let obj = XMLParser.Parse(data).ArrayOfObjStation.objStation;

    if (!obj) throw new Error('No stations found');

    if (!(obj instanceof Array)) obj = [obj];
    if (obj[0].error) throw obj[0].error;

    // Normalizing data
    const resp: IStation[] = obj.map((o: any) => {
      return {
        Code: o.StationCode._text.trim(),
        Description: o.StationDesc._text,
        Alias: o.StationAlias._text,
        Id: o.StationId._text,
        Geolocation: { Latitude: o.StationLatitude._text, Longitude: o.StationLongitude._text },
      };
    });

    return resp;
  }

  static async GetAllTrainsForStation(station: string) {
    const data = await axios
      .get(`${BASE_URL}/getStationDataByNameXML?StationDesc=${station}`)
      .then((resp) => resp.data);

    // The ".ArrayOfObjStationData.objStationData" part is necessary due to
    // the way the data comes from the Irish Rail API and the way xml-js parses it
    let obj = XMLParser.Parse(data).ArrayOfObjStationData.objStationData;

    if (!obj) throw new Error('No trains found for the next 90 minutes, please try another station.');

    if (!(obj instanceof Array)) obj = [obj];
    if (obj[0].error) throw new Error(obj[0].error.message);

    // Normalizing data
    const resp: ITrainInfo[] = obj.map((o: any) => {
      return {
        Code: o.Traincode._text,
        StationName: o.Stationfullname._text,
        Stationcode: o.Stationcode._text,
        Origin: o.Origin._text,
        Destination: o.Destination._text,
        OriginTime: o.Origintime._text,
        DestinationTime: o.Destinationtime._text,
        Status: o.Status._text,
        LastLocation: o.Lastlocation._text,
        DueIn: Number(o.Duein._text),
        Late: Number(o.Late._text),
        ExpectedArrival: o.Exparrival._text,
        ExpectedDepart: o.Expdepart._text,
        ScheduledArrival: o.Scharrival._text,
        ScheduledDepart: o.Schdepart._text,
        Direction: o.Direction._text,
        Type: o.Traintype._text,
        LocationType: o.Locationtype._text,
      };
    });

    return resp;
  }
}
