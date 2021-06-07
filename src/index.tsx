import React, { useEffect, useState, useReducer, useRef } from 'react';
import { render } from 'react-dom';
import Stations from './Stations';
import {Station, initialState, State, StationsEvents, StationsActions} from './Types';
import {getStations} from './API';
import Styled from 'styled-components';
import './index.css'

const Header = Styled.div`
  position: fixed;
  background: white;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const UnderHeader = Styled.div`
  height: 80px;
  background: white;
`;

const audio = new Audio();

export const App = () => {
  
  const reducer = (state:State, action: StationsActions): State => {
  switch (action.type) {
    case StationsEvents.play:{
      const {selected, media } = action.payload; 
      let newStatus = 'playing';
      if(state.selected === selected){
        if(state.status === 'playing'){
         newStatus = 'paused';
          audio.pause();
        }else{
         newStatus = 'playing'
         audio.play();
        }  
      }else{
        audio.src = media;
        audio.play()
      }
      return { ...state, selected, media, status: newStatus};
    }
    case StationsEvents.select:{
      const { selected } = action.payload; 
      return { ...state, selected }
    }
  }
 }

  const [stations, setStations] = useState<Station[]>([]);

  const [state, Dispatch] = useReducer(reducer,undefined,() => initialState);

  const onStationSelect = (selected:string, media:string) => {
    Dispatch({type: StationsEvents.play, payload: {selected, media} })
  }

  useEffect(() => {
    getStations().then(data => {setStations(data)})
  },[]);

  return (
      <div>
        <Header><h1>Radio Stations</h1></Header>
        <UnderHeader></UnderHeader>
        <Stations stations={stations} onClick={onStationSelect} state={state} />
      </div>
    );
}

render(<App />, document.getElementById('root'));
