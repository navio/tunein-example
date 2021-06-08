import { SortStations, State, Station, StationsActions, StationsEvents } from "./Types";

export const ERRORLOADING = "ErrorLoading";

// AUDIO ENGINE
const audio = new Audio();
audio.addEventListener('error', () => {
  alert('Station is not available. Please select another Station.');
  document.dispatchEvent(new Event(ERRORLOADING));
})

// UTILS
export const moreReliable = (stations: Station[]) => stations.sort((a, b) =>
  b.reliability - a.reliability
)

export const topPopularity = (stations: Station[]) => stations.sort((a, b) =>
  b.popularity - a.popularity
);

export const lessPopularity = (stations: Station[]) => topPopularity(stations).reverse();

export const filterTags = (key: string, stations: Station[]) => key === 'All' ? stations : stations.filter(station => station.tags.includes(key));


// ACTIONS
export const PlayAction = (selected: Station, media: string): StationsActions => (
  { type: StationsEvents.play, payload: { selected, media } }
);
export const PauseAction = (): StationsActions => { return { type: StationsEvents.stop, payload: {} } }

export const UpdateStations = (stations: Station[]): StationsActions => { return { type: StationsEvents.update, payload: { stations } } }

export const FilterBy = (filter: string): StationsActions => { return { type: StationsEvents.byTag, payload: { filter } } }

export const SortBy = (sorted: SortStations): StationsActions => { return { type: StationsEvents.sort, payload: { sorted } } }


// Resolver For Render
export const RenderStations = (state): Station[] => {
  const { filter, sorted, stations = [] } = state;
  let stationsToLoad = [...stations];

  if (filter) {
    stationsToLoad = filterTags(filter, stationsToLoad)
  }

  if (sorted) {
    switch (sorted) {
      case SortStations.popularity: {
        stationsToLoad = topPopularity(stationsToLoad);
        break;
      }
      case SortStations.unpopular: {
        stationsToLoad = lessPopularity(stationsToLoad);
        break;
      }
      case SortStations.reliable:
      default:
        stationsToLoad = moreReliable(stationsToLoad);
    }
  }

  return [...stationsToLoad];

}

// REDUCER
const reducer = (state: State, action: StationsActions): State => {
  switch (action.type) {
    case StationsEvents.play: {
      const { selected, media } = action.payload;
      let newStatus = 'playing';
      if (state.selected && state.selected.id === selected.id) {
        if (state.status === 'playing') {
          newStatus = 'paused';
          audio.pause();
        } else {
          newStatus = 'playing'
          audio.play();
        }
      } else {
        audio.src = media;
        audio.play()
      }
      return { ...state, selected, media, status: newStatus };
    }
    case StationsEvents.stop: {
      audio.pause();
      const newStatus = 'paused';
      return { ...state, status: newStatus, selected: undefined, media: undefined };
    }
    case StationsEvents.select: {
      const { selected } = action.payload;
      return { ...state, selected }
    }
    case StationsEvents.update: {
      let { stations } = action.payload;
      
      const tags = stations.reduce((final, station) => final.concat(station.tags) ,[])

      return { ...state, stations, tags: Array.from(new Set<string>(tags)) }
    }
    case StationsEvents.sort: {
      return { ...state, sorted: action.payload.sorted }
    }
    case StationsEvents.byTag: {
      const { filter } = action.payload
      return { ...state, filter }
    }
  }
}


export default reducer;