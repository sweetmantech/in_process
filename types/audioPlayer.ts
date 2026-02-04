export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  bufferedProgress: number;
  currentTime: number;
  duration: number;
}

export type AudioPlayerAction =
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_BUFFERED_PROGRESS"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "RESET" };
