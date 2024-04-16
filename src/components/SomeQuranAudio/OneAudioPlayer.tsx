import { addToWishlist, removeFromWishlist } from "@app/apis/audio/wishList";
import Lottie from "lottie-react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import styled from "styled-components";
import loveAnimation from "@assets/lottiFiles/Love.json";

interface matchingSurah {
  matchingSurahId: number;
  matchingSurahName: string;
  moshafLink: string;
  makkia: boolean;
  moshfName: string;
  reciterName?: string;
}

interface Tplayer {
  playing: string; // Change the type to string
}

const CardStyle = styled(Card)<Tplayer>`
  color: ${(props) => props.theme.colors.text};
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) =>
    props.playing === "true"
      ? props.theme.colors.primary
      : props.theme.colors.block};

  text-align: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
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

const LoveAnimate = styled.div`
  border-radius: 5px;
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* Center the element horizontally and vertically */
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
  background-color: ${(props) => props.theme.colors.background};
`;

const OneAudioPlayer: React.FC<matchingSurah> = ({
  matchingSurahName,
  matchingSurahId,
  moshafLink,
  makkia,
  moshfName,
  reciterName,
}) => {
  const [showLoveAnimation, setShowLoveAnimation] = useState(false); // State for managing animation visibility
  const dispatch: AppDispatch = useDispatch();
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  const [playing, setIsPlaying] = useState(false);
  const linkAudio = matchingSurahId.toString().padStart(3, "0"); // Convert matchingSurahId to string before using padStart

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const isItemInWishlist = wishlist.find(
    (item) => item.id === matchingSurahId && item.reciterName === reciterName
  );

  const handleToggleWishlist = () => {
    if (isItemInWishlist) {
      // Remove from wishlist
      dispatch(
        removeFromWishlist({
          id: matchingSurahId,
          name: matchingSurahName,
          moshafLink: moshafLink,
          linkAudio: linkAudio,
          moshfName: moshfName,
          reciterName: reciterName,
        })
      );
    } else {
      // Add to wishlist
      dispatch(
        addToWishlist({
          id: matchingSurahId,
          name: matchingSurahName,
          moshafLink: moshafLink,
          linkAudio: linkAudio,
          moshfName: moshfName,
          reciterName: reciterName,
        })
      );
      if (!showLoveAnimation) {
        // Show animation only if it's not already shown
        setShowLoveAnimation(true);
        // Set a timeout to reset showLoveAnimation after 2 seconds
        setTimeout(() => {
          setShowLoveAnimation(false);
        }, 2000); // Adjust the duration as needed
      }
    }
  };

  return (
    <>
      <CardStyle playing={playing ? "true" : "false"}>
        <div>
          <h6>سورة :{matchingSurahName}</h6>
          <h6>{makkia ? "Makkia" : "Madania"}</h6>
          <h6>
            <FaHeart
              style={{ cursor: "pointer" }}
              color={isItemInWishlist ? "red" : "gray"}
              onClick={handleToggleWishlist}
            />
          </h6>
        </div>
        <div>
          <audio
            onPlay={handlePlay}
            onPause={handlePause}
            controls
            preload="auto"
          >
            <source src={`${moshafLink}${linkAudio}.mp3`} />
            Your browser does not support the audio element.
          </audio>
        </div>
      </CardStyle>

      {/* Render LoveAnimate if showLoveAnimation is true */}
      {showLoveAnimation && (
        <LoveAnimate>
          <Lottie animationData={loveAnimation} />
        </LoveAnimate>
      )}
    </>
  );
};

export default OneAudioPlayer;
