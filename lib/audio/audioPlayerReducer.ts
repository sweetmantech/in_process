import { AudioPlayerState, AudioPlayerAction } from "@/types/audioPlayer";

export const initialAudioPlayerState: AudioPlayerState = {
  isPlaying: false,
  isLoading: false,
  progress: 0,
  bufferedProgress: 0,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
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
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_MUTED":
      return { ...state, isMuted: action.payload };
    case "RESET":
      return { ...initialAudioPlayerState, volume: state.volume, isMuted: state.isMuted };
    default:
      return state;
  }
};

export default audioPlayerReducer;
