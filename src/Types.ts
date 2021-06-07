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
}

export enum PlayEvent {
  playing = "playing",
  paused = "paused"
}

export const initialState = {
  status: PlayEvent.paused
};

export enum StationsEvents {
  play = 'Play',
  select = 'Select'
}


export interface StationsActions {
  type: StationsEvents;
  payload: any;
}
