import { AudioPlayerState, AudioPlayerAction } from "@/types/audioPlayer";

export const initialAudioPlayerState: AudioPlayerState = {
  isPlaying: false,
  isLoading: false,
  progress: 0,
  bufferedProgress: 0,
  currentTime: 0,
  duration: 0,
};

const audioPlayerReducer = (
  state: AudioPlayerState,
  action: AudioPlayerAction
): AudioPlayerState => {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_BUFFERED_PROGRESS":
      return { ...state, bufferedProgress: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "RESET":
      return initialAudioPlayerState;
    default:
      return state;
  }
};

export default audioPlayerReducer;
