import React, { useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import Stations from './Stations';
import { Station, initialState, SortStations } from './Types';
import { getStations } from './API';
import Styled from 'styled-components';
import './index.css'
import Ribbon from './Ribbon';
import reducer, { ERRORLOADING, FilterBy, PauseAction, PlayAction, RenderStations, SortBy, UpdateStations } from './Reducer';

const Header = Styled.div`
  position: fixed;
  background: #1c203c;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid gray;
  color:white;
`;

const UnderHeader = Styled.div`
  height: 110px;
  background: white;
`;

const FiltersElement = Styled.div`
  display:flex;
  flex-flow: row-reverse;
  margin: 1rem;
`;

export const App = () => {

  const [state, Dispatch] = useReducer(reducer, undefined, () => initialState);

  const onStationSelect = (selected: Station, media: string) => {
    Dispatch(PlayAction(selected, media));
  }

  document.addEventListener(ERRORLOADING, () =>
    Dispatch(PauseAction()))

  useEffect(() => {
    getStations().then(data => {
      Dispatch(UpdateStations(data));
    })
  }, []);

  return (
    <div>
      <Header>
        <h1>TuneIn: Internet Radio</h1>
        <FiltersElement>
        <div>Filter by:
          <select onChange={(ev) => {
            Dispatch(FilterBy(ev.target.value))
            }} >
              <option> All </option>
              {state.tags
                .map((key) => 
                <option value={key} selected={key === state.filter}>
                  {key}
                </option>)}
            </select>
          </div>

          <div>Sort by:
          <select onChange={(ev) => {
            Dispatch(SortBy(SortStations[ev.target.value]))
            }} >
              {Object.keys(SortStations)
                .map((key) => 
                <option value={key} selected={state.sorted === SortStations[key]}>
                  {SortStations[key]}
                </option>)}
            </select>
          </div>
        </FiltersElement>
      </Header>
      <UnderHeader />
      <Stations stations={RenderStations(state)} onClick={onStationSelect} state={state} />
      <Ribbon state={state} onClick={onStationSelect} />
    </div>
  );
}

render(<App />, document.getElementById('root'));
