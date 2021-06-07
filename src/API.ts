import { Station } from './Types';
const API = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com';

export const getStations = (): Promise<Station[]> =>
  fetch(`${API}/stations.json`)
    .then(response =>
      response.ok ? response.json() : new Error('Error Fetching')
    )
    .then(rawData => {
      const Stations: Station[] = rawData.data;
      return Stations;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
