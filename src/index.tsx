import React, { useEffect, useState, useReducer } from 'react';
import { render } from 'react-dom';
import Stations from './Stations';
import {Station, initialState, State, StationsEvents, StationsActions} from './Types';
import {getStations} from './API';
import Styled from 'styled-components';
import './index.css'
import Ribbon from './Ribbon';
import reducer, { ERRORLOADING } from './Reducer';

const Header = Styled.div`
  position: fixed;
  background: #1c203c;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid gray;
  color:white;
`;

const UnderHeader = Styled.div`
  height: 80px;
  background: white;
`;

// const audio = new Audio();

export const App = () => {
  
  

  const [stations, setStations] = useState<Station[]>([]);

  const [state, Dispatch] = useReducer(reducer,undefined,() => initialState);

  const onStationSelect = (selected:Station, media:string) => {
    Dispatch({type: StationsEvents.play, payload: {selected, media} })
  }

  document.addEventListener(ERRORLOADING,() => {
    Dispatch({type: StationsEvents.stop, payload: {} });
  })

  useEffect(() => {
    getStations().then(data => {setStations(data)})
  },[]);

  return (
      <div>
        <Header><h1>TuneIn: Internet Radio</h1></Header>
        <UnderHeader/>
        <Stations stations={stations} onClick={onStationSelect} state={state} />
        <Ribbon state={state} onClick={onStationSelect} />
      </div>
    );
}

render(<App />, document.getElementById('root'));
