import React from 'react';
import { Station } from './Types';
import styled from "styled-components";

export interface MediaControlCardProps {
  station: Station;
}

const MediaCard = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  margin: 1rem 0;
  & > p {
    margin: 0;
  }
`;

const MediaTitle = styled.div`
  display: flex;
  flex-flow: row;
  place-items: baseline;
  margin: .5rem 0;

  & span {
    margin-left:.5rem;
  }
`;

const MediaContent = styled.div`
  padding: 0 1rem;
`;

const Title = styled.h2`
  margin: 0;
`;

const TagsContainer = styled.ol`
  display:flex;
  flex-direction: row;
  list-style: none;
  & li {
    color: white;
    background: black;
    border-radius: 1rem;
    padding: .2rem;
    display: inline-block;
    margin-right: 1rem;
    padding: 0 .5rem;
  }
`;

const Tags = ({tags = []}: {tags: string[]}) => {
  return <TagsContainer>{tags.map(tag => <li>{tag}</li>)}</TagsContainer>
}

export default function MediaControlCard({ station }: MediaControlCardProps) {
  return <MediaCard>
    <img alt="Logo" aria-hidden src={station.imgUrl} />
    <MediaContent>
    <MediaTitle>
    <Title>{station.name}</Title>
     <span>Reliability: {station.reliability}</span>
     <span>Popularity: {station.popularity}</span>
     <Tags tags={station.tags} />
    </MediaTitle>
    <p>{station.description}</p>
    </MediaContent>
   
  </MediaCard>
}