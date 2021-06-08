import React from 'react';
import {PlayEvent, State, Station} from './Types';
import Card from "./Card";
import Styled from 'styled-components';

const Container = Styled.div`
  margin: 0 auto;
  width: 95vw;
  cursor: pointer
`;

const PlayerSpace = Styled.div`
  height: 100px;
  background:black;
`;

const CardCointer = Styled.div`
  border-bottom: 1px solid gray;
`;

interface StationsProps {
  stations: Station[];
  onClick: (selected: Station, media: string) => void
  state: State
}

const Stations = ({stations = [], state, onClick}: StationsProps) => {

  return <Container>
  { stations.map(station => 
    <CardCointer onClick={() =>onClick(station, station.streamUrl)}>
      <Card station={station} state={state} />
    </CardCointer>)
  }
  {state.status === PlayEvent.playing ? <PlayerSpace /> : <></>}
  </Container>
}

export default Stations;