import React from 'react';
import {State, Station} from './Types';
import Card from "./Card";
import Styled from 'styled-components';

const Container = Styled.div`
  margin: 0 auto;
  with: 2vw;
`;

interface StationsProps {
  stations: Station[];
  onClick: (selected: string, media: string) => void
  state: State
}

const Stations = ({stations = [], state, onClick}: StationsProps) => {

  return <Container>
  { stations.map(station => 
    <div onClick={() =>onClick(station.id, station.streamUrl)}>
      <Card station={station} />
    </div>)
  }
  </Container>
}

export default Stations;