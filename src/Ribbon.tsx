import React from 'react';
import Styled from 'styled-components';
import { PlayEvent, State, Station } from './Types';

const Play = () => <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-ga-event-category="material-icons" data-ga-event-action="click" data-ga-event-label="PlayCircleFilledWhite"><path transform="scale(0.5, 0.5)" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"></path></svg>;

const Pause = () => <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>

const Container = Styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: white;
    border-top: 1px solid lightgray;
    display: flex;
    
    & div {
        display: inline-flex;
        align-items: center;
        align-content: space-around;
        flex-direction: column-reverse;
        align-self: stretch;
        width: 100%;
    }

`;

const Ribbon = ({state, onClick}: { state: State, onClick: (selected:Station, media:string) => void}) => {


    return state.selected !== undefined ? <Container onClick={() => onClick(state.selected, state.media)}>
        <img src={state.selected.imgUrl} alt="Station Logo" aria-hidden />
        <div>
        { state.status === PlayEvent.paused ? <Play /> : <Pause />}
        {state.selected.name}
        </div>
       
    </Container> : <></>

}

export default Ribbon;