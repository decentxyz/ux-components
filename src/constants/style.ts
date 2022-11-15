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
      padding-left: 1.5rem;
      padding-right: 1.5rem; 
      padding-top: 1.5rem; 
      margin-bottom: 2rem; 
      flex-direction: row; 
      justify-content: space-between; 
      cursor: pointer; 
      
      @media (min-width: 768px) { 
        padding-top: 1rem;
        padding-bottom: 1rem; 
        margin-bottom: 0; 
      }
    `,
    playerHr: () => css`
      margin-left: 1.5rem;
      margin-right: 1.5rem; 
      border-top-width: 1px;
      border-color: #A39792];
    `,
    playerContainer: () => css`
      display: flex; 
      flex-direction: column-reverse;

      @media (min-width: 768px) { 
        flex-direction: row; 
        justify-content: space-between; 
      }
    `,
    playerControlContainer: () => css`
      display: flex; 
      margin-top: 1.5rem;
      margin-bottom: 1.5rem; 
      margin-left: 1.5rem;
      justify-content: center; 
      align-items: center; 
      gap: 1.25rem; 

      @media (min-width: 768px) { 
        margin-top: 1rem;
        margin-bottom: 1rem; 
        margin-right: 2.5rem; 
      }
    `,
    playerMinuteString: () => css`
      min-width: 42px;
    `,
    playerMinuteDurationString: () => css`
      min-width: 42px;
      padding-right: 2.5rem; 
    `,
    playerText: () => css`
      overflow: hidden; 
      text-overflow: ellipsis;

      :hover {
        color: #9969FF;
      }
    `,
    playerTextContainer: () => css`
      white-space: nowrap; 

      @media (min-width: 768px) { 
        margin-right: 1rem; 
        text-align: right; 
        width: 16rem; 
      }
    `,
    playerTracklineContainer: () => css`
      display: flex; 
      margin-left: 1.5rem;
      margin-right: 1.5rem; 
      margin-left: 1.25rem;
      justify-content: center; 
      align-items: center; 
      flex-grow: 1;
      gap: 1.25rem;
      
      @media (min-width: 768px) { 
        margin-left: 0;
        margin-right: 0; 
      }
    `,
    nextButtonBase: () => css`
      background-color: transparent;
      border: none;

      @media (min-width: 768px) { 
        order: 3; 
      }
      :hover {
        cursor: pointer; 
      }
    `,
    previousButtonBase: () => css`
      background-color: transparent;
      border: none;

      @media (min-width: 768px) { 
        order: 2; 
      }
      :hover {
        cursor: pointer; 
      }
    `,
    repeatButtonBase: () => css`
      background-color: transparent;
      border: none;

      @media (min-width: 768px) { 
        order: 5; 
      }
      :hover {
        cursor: pointer; 
      }
    `,
    shuffleButtonBase: () => css`
      background-color: transparent;
      border: none;

      @media (min-width: 768px) { 
        order: 4; 
      }
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
    `
  },
};
