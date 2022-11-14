import AudioPlayer from "./audio-player/AudioPlayer";
import {
  DispatchPlayerContext,
  PlayerContext,
} from "./context/player.context";
import {
  playerReducer,
  playerInitialState
} from "./reducers/player.reducer"
// import "./constants/main.css"

export {
  // Audio Player
  AudioPlayer,
  DispatchPlayerContext,
  PlayerContext,
  playerReducer,
  playerInitialState
};
