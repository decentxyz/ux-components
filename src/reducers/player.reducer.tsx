import type { Reducer } from "react"
import type { ProjectPayload, Song } from "../types/shared"

export const playerInitialState = {
  isPlaying: false,
  currentSongSrc: "",
  release: null,
  songList: [],
  audioVolume: 1,
}

const extractSongData = (release: ProjectPayload) => ({
  currentSongSrc: release?.songUrl,
  release,
})


export enum PlayerActionType {
  SET_SONG_LIST = "SET_SONG_LIST",
  TOGGLE_PLAY = "TOOGLE_PLAY",
  TOGGLE_PAUSE = "TOGGLE_PAUSE",
  CHANGE_AUDIO_SRC = "CHANGE_AUDIO_SRC",
  UPDATE_SONG_INFO = "UPDATE_SONG_INFO",
  NEXT_TRACK = "NEXT_TRACK",
  SET_AUDIO_VOLUME = "SET_AUDIO_VOLUME",
}

export type PlayerAction = {
  type: PlayerActionType
  payload?: any
}
export type PlayerState = typeof playerInitialState

export const playerReducer: Reducer<PlayerState, PlayerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case PlayerActionType.SET_SONG_LIST: {
      return { ...state, songList: action.payload }
    }
    case PlayerActionType.TOGGLE_PLAY: {
      return { ...state, isPlaying: true }
    }
    case PlayerActionType.TOGGLE_PAUSE: {
      return { ...state, isPlaying: false }
    }
    case PlayerActionType.CHANGE_AUDIO_SRC: {
      return { ...state, currentSongSrc: action.payload }
    }
    case PlayerActionType.UPDATE_SONG_INFO: {
      return { ...state, release: action.payload }
    }
    case PlayerActionType.NEXT_TRACK: {
      const { currentSongSrc } = state
      const { isShuffle, delta } = action.payload
      if (!currentSongSrc) return state

      const isCurrentSong = (songData: any) => songData?.songUrl === currentSongSrc
      const currentSongIndex = state.songList.findIndex(isCurrentSong)
      let nextSongIndex = ((currentSongIndex + delta) + state.songList.length) % state.songList.length

      if (isShuffle) {
        do {
          nextSongIndex = Math.floor(Math.random() * state.songList.length)
        } while (nextSongIndex === currentSongIndex)
      }

      return {
        ...state,
        ...extractSongData(state.songList[nextSongIndex])
      }
    }
    case PlayerActionType.SET_AUDIO_VOLUME: {
      if (action.payload >= 0 && action.payload <= 1) {
        return { ...state, audioVolume: action.payload }
      }

      return state
    }
    default:
      return state
  }
}

export const setSongListAction = (songList: Array<Song>) => ({ type: PlayerActionType.SET_SONG_LIST, payload: songList })
export const playTrackAction = () => ({ type: PlayerActionType.TOGGLE_PLAY })
export const pauseTrackAction = () => ({ type: PlayerActionType.TOGGLE_PAUSE })
export const changeTrackAction = (newSrc: string) => ({ type: PlayerActionType.CHANGE_AUDIO_SRC, payload: newSrc })
export const updateTrackInfoAction = (payload: ProjectPayload) => ({ type: PlayerActionType.UPDATE_SONG_INFO, payload })
export const nextTrackAction = (delta: number, isShuffle: boolean) => ({ type: PlayerActionType.NEXT_TRACK, payload: { isShuffle, delta } })
export const setAudioVolumeAction = (level: number) => ({ type: PlayerActionType.SET_AUDIO_VOLUME, payload: level })
