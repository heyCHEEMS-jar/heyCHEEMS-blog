import type { Song } from './types'

export const STORAGE_KEY_VOLUME = 'music-player-volume'

export const DEFAULT_VOLUME = 0.7

export const LOCAL_PLAYLIST: Song[] = [{
  id: 1779947282405,
  title: 'Duvet',
  artist: 'Bôa',
  duration: 203,
  cover: '/assets/music/cover/Duvet.jpg',
  url: '/assets/music/url/Duvet.mp3'
}, {
  id: 1779947172805,
  title: 'Ref:rain',
  artist: 'Aimer',
  duration: 290,
  cover: '/assets/music/cover/Ref_rain.jpg',
  url: '/assets/music/url/Ref_rain.mp3'
}]

export const DEFAULT_SONG: Song = {
    title: 'Sample Song',
    artist: 'Sample Artist',
    cover: '/favicon/favicon.ico',
    url: '',
    duration: 0,
    id: 0
}

export const DEFAULT_METING_API = 'https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r'
export const DEFAULT_METING_ID = '14164869977'
export const DEFAULT_METING_SERVER = 'netease'
export const DEFAULT_METING_TYPE = 'playlist'

export const ERROR_DISPLAY_DURATION = 3000
export const SKIP_ERROR_DELAY = 1000
