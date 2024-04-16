import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

interface TOneTafser {
  id: number;
  name: string;
  sura_id: number;
  tafasir_id: number;
  url: string;
}
interface Tplayer {
  playing: string; // Change the type to string
}
const CardStyle = styled(Card)<Tplayer>`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.playing === "true"
      ? props.theme.colors.primary
      : props.theme.colors.block};

  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 0;
  &:hover {
    transform: scale(0.9);
    transition: all 0.5s ease;
    border-radius: 7px;
  }
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div:last-child {
    audio {
      width: 100%;
    }
  }
`;
const OneTafser: React.FC<TOneTafser> = ({ name, url, tafasir_id }) => {
  const [playing, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  return (
    <CardStyle playing={playing ? "true" : "false"}>
      <div>
        <h6>{name}</h6>
        <h6>{tafasir_id}</h6>
      </div>
      <div>
        <audio
          onPlay={handlePlay}
          onPause={handlePause}
          controls
          preload="auto"
        >
          <source src={`${url}`} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </CardStyle>
  );
};
export default OneTafser;
