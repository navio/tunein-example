import { State, StationsActions, StationsEvents } from "./Types";

const audio = new Audio();

const reducer = (state:State, action: StationsActions): State => {
    switch (action.type) {
      case StationsEvents.play:{
        const {selected, media } = action.payload; 
        let newStatus = 'playing';
        if(state.selected && state.selected.id === selected.id){
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
export default reducer;