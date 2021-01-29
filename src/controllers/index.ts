import express, { Request, Response } from 'express';
import StationService from '../services/getStationData.service';

const Router = express.Router();

Router.get('/stations', (req: Request, res: Response) => {
  StationService.GetAllStations()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

Router.get('/trains/:station', (req: Request, res: Response) => {
  StationService.GetAllTrainsForStation(req.params.station)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default Router;
