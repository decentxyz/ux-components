import { css } from "@emotion/css";
import { ThemeOptions } from "./theme";

export const Style = {
  theme: ThemeOptions,
  useDefaultStyles: true,
  styles: {
    buttonTransparent: () => css`
      background-color: transparent;
      border: none;
    `,
    playIcon: () => css`
      fill: #9969FF;
      &:hover {
        fill: #730FE6;
      }
    `,
    player: () => css`
      width: 100%;
      position: fixed;
      bottom: 0px;
      z-index: 10;
      background-color: rgb(255 255 255);
    `,
    playerArtContainer: () => css`
      display: flex; 
      padding-left: 124px;
      padding-right: 1.5rem;
      margin-right: auto;
      flex-direction: row; 
      cursor: pointer;
      position: relative;
      min-width: 350px;
      max-width: 500px;

      @media (min-width: 768px) { 
        margin-bottom: 0; 
      }
    `,
    playerSpinner: () => css`
      position: absolute;
      top: -15px;
      left: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      ::after {
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        background-color: white;
        position: absolute;
        border-radius: 999px;
      }

      animation-name: spin;
      animation-duration: 5000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    
      @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
      }
    `,
    playerHr: () => css`
      margin-left: 1.5rem;
      margin-right: 1.5rem; 
      border-top-width: 1px;
      border-color: #A39792];
    `,
    playerImage: () => css`
      border-radius: 999px;

      :hover {
        opacity: 0.9; 
      }
    `,
    playerContainer: () => css`
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      @media (min-width: 1050px) { 
        flex-wrap: nowrap; 
      }
    `,
    playerControlContainer: () => css`
      display: flex; 
      margin-top: 1rem;
      margin-bottom: 1rem; 
      margin-right: 1rem; 
      margin-left: 1.5rem;
      justify-content: center; 
      align-items: center; 
      gap: 1.5rem;

    `,
    playerMinuteString: () => css`
      min-width: 42px;
    `,
    playerMinuteDurationString: () => css`
      min-width: 42px;
    `,
    playerText: () => css`
      display:block;
      overflow: hidden; 
      text-overflow: ellipsis;

      :hover {
        color: #9969FF;
      }
    `,
    playerTextContainer: () => css`
      width: 100%;
      white-space: nowrap;
      padding: 12px 10px 12px 20px;
    `,
    playerTracklineContainer: () => css`
      display: flex;
      min-width: min(100vw, 400px);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 1rem;
      padding-top: 1rem;
      justify-content: center; 
      align-items: center; 
      flex-grow: 1;
      gap: 1.25rem;
    `,
    nextButtonBase: () => css`
      background-color: transparent;
      border: none;

      :hover {
        cursor: pointer; 
      }
    `,
    previousButtonBase: () => css`
      background-color: transparent;
      border: none;

      :hover {
        cursor: pointer; 
      }
    `,
    repeatButtonBase: () => css`
      background-color: transparent;
      border: none;

      :hover {
        cursor: pointer; 
      }
    `,
    shuffleButtonBase: () => css`
      background-color: transparent;
      border: none;

      :hover {
        cursor: pointer; 
      }
    `,
    sliderRange: () => css`
      position: absolute; 
      height: 100%; 
      border-radius: 9999px; 
      background-color: #222225;
      .group[active] {
        background-color: #9969FF;
      }
    `,
    sliderRoot: () => css`
      display: flex; 
      position: relative; 
      align-items: center; 
      width: 100%; 
      cursor: pointer; 
    `,
    sliderThumb: () => css`
      display: block; 
      width: 0.75rem; 
      height: 0.75rem; 
      border-radius: 9999px; 
      background-color: #222225;
      .group[hover] {
        --transform-scale-x: 1.5;
        --transform-scale-y: 1.5; 
        background-color: #730FE6;
      }
    `,
    sliderTrack: () => css`
      width: 100%; 
      height: 0.25rem; 
      border-radius: 9999px;  
      background-color: #D6C7C0;
      flex-grow: 1;
    `,
  },
};
