# Decent UX Components

Decent's UX Components allows you to easily create your own music player, minting site, or music marketplace with Decent infrastructure.

This library works alongside the Decent [minting studio](https://hq.decent.xyz/) allows for DAOs and individuals to run their own decentralized record labels. Arbitrary music NFTs across a wide variety of contract implementations are supported.

### Main components:

- `<AudioPlayer />`
  - play / pause button.
- `<PersistentPlayer />`
  - full play bar.

### Quickstart

1. Add package:

```bash
yarn add decent-audio-player
```

### ⏯️ decent-audio-player 🎧

- example: [decent-audio-player](https://decentaudioplayer.vercel.app)

2 options:

- `<AudioPlayer />` - single track controls.
- `<PersistentPlayer />` - full-width playbar with playlists.

![DECENT_AUDIO_PLAYER](https://user-images.githubusercontent.com/23249402/201524220-eaa1c4d4-f24c-409d-9cee-bcaf40c66f0c.gif)

### Usage

1. Add Providers:

```tsx
import { useReducer } from "react";
import {
  DispatchPlayerContext,
  PlayerContext,
  playerInitialState,
  playerReducer,
} from "decent-audio-player";

const App = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(playerReducer, playerInitialState);
  return (
    <PlayerContext.Provider value={state}>
      <DispatchPlayerContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </DispatchPlayerContext.Provider>
    </PlayerContext.Provider>
  );
};
```

2. Render a simple Audio Player:

```tsx
import { AudioPlayer } from "decent-audio-player";

export const Page = () => (
  <AudioPlayer
    size={56}
    audioSrc="https://nftstorage.link/ipfs/QmWNaSdhXq2WdusiBcVC2Ju5A1JJySRDVNrQMEBGcaazvC"
    callbackAfterPlay={console.log}
    active
  />
);
```

2. Render a full Persistent Player:

```tsx
import { AudioPlayer } from "decent-audio-player";

const PLAYLIST = [
  {
    songUrl:
      "https://nftstorage.link/ipfs/bafybeihxtxizfgtp5nazudkuc6dvtru2rykyklsse7t5r3rquydirgunxy/SHINY_7.wav",
    project: "shiny",
    artist: "kat dahlia",
    website: "https://github.com/decentxyz",
    image:
      "https://nftstorage.link/ipfs/QmVJBGbMXHNyBe62ruPByK5MG6KdbZkSGPiBMfpqRQ6qP2",
  },
  {
    songUrl:
      "https://nftstorage.link/ipfs/bafybeid3su3rqfwj7ydk52coz3xinku5vc7uu557t7rdkxx5dswcbxolda",
    project: "rugburn by sad alex",
    artist: "sad alex & chillpill",
    website: "https://github.com/decentxyz",
    image:
      "https://nftstorage.link/ipfs/bafybeif55mfehhzipicowg7fpdvdmgulwk6jgz2pbbxwuxjt7pmr7swlvu",
  },
];

export const Page = () => {
  return <PersistentPlayer playlist={PLAYLIST} />;
};
```

### Props

- `<AudioPlayer />`

  - `size` - size of Audio Player.
  - `audioSrc` - src of audio.
  - `callbackAfterPlay` - function to call after track begins playing.
  - `active` - flag for pre-released tracks to be unplayable / disabled.

- `<PersistentPlayer />`
  - `playlist` - Array of Songs `Song[]`.

Song

```
export type Song = {
  songUrl: string;
  project: string;
  artist?: string;
  website?: string;
  image: string;
};
```
