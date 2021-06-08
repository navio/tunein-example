import { State, StationsActions, StationsEvents } from "./Types";

export const ERRORLOADING = "ErrorLoading";

const audio = new Audio();
audio.addEventListener('error', () => {
  alert('Station is not available. Please select another Station.');
  document.dispatchEvent(new Event(ERRORLOADING));
})

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
      case StationsEvents.stop: {
        audio.pause();
        const newStatus = 'paused';
        return { ...state, status: newStatus, selected: undefined, media: undefined};
      }
      case StationsEvents.select:{
        const { selected } = action.payload; 
        return { ...state, selected }
      }
    }
}


export default reducer;