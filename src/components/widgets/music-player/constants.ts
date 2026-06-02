import type { Song } from './types'

export const STORAGE_KEY_VOLUME = 'music-player-volume'

export const DEFAULT_VOLUME = 0.7

export const LOCAL_PLAYLIST: Song[] = [{
  id: 1779947282405,
  title: '僕らの手には何もないけど、',
  artist: 'RAM WIRE',
  duration: 252,
  cover: '/assets/music/cover/僕らの手には何もないけど、.png',
  url: '/assets/music/url/僕らの手には何もないけど、.mp3'
}, {
  id: 1779947172805,
  title: 'ただ声一つ',
  artist: 'ロクデナシ/MIMI',
  duration: 161,
  cover: '/assets/music/cover/ただ声一つ.png',
  url: '/assets/music/url/ただ声一つ.mp3'
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
