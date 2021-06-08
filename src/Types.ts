export interface Station {
  id: string;
  description: string;
  name: string;
  imgUrl: string;
  streamUrl: string;
  reliability: number;
  popularity: number;
  tags: string[]; // maybe enums
}

export interface State {
  media?: string ;
  status: string;
  selected?: Station;
  stations: Station[];
  sorted?: SortStations;
  filter?: string;
  tags: string[];
}

export enum SortStations{
  popularity = "Popular",
  unpopular = "Unpopular",
  reliable = "Reliability"
}

export enum PlayEvent {
  playing = "playing",
  paused = "paused"
}

export const initialState = {
  status: PlayEvent.paused,
  stations: [],
  sorted: SortStations.reliable,
  tags: []

};

export enum StationsEvents {
  play = 'Play',
  select = 'Select',
  stop = "Stop",
  update = "UpdateStations",
  sort = "SortStations",
  byTag = "FilterStationsByTag"
}


export interface StationsActions {
  type: StationsEvents;
  payload: any;
}
