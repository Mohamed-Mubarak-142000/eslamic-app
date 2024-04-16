import { Container } from "react-bootstrap";
import styled from "styled-components";
import Bg_Image from "@assets/kaba.jpg";
import { useGetAllLiveQuery } from "@app/apis/audio/apiSlice";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "@common/Loading";

interface ContentImageProps {
  $image: string; // Define $image prop with the $ prefix
}

const ContainerStyle = styled(Container)<ContentImageProps>`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.6)
    ),
    url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  height: 600px; /* Adjust the height as needed */
  color: white;
  border-radius: 10px;
  position: relative;
  margin-bottom: 2rem;
`;

const SliderContent = styled(Slider)`
  padding: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
  border-radius: 10px;
  position: absolute;
  top: 70%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 450px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  z-index: 1000;
`;

const Live = () => {
  const { data, isLoading, isError, error } = useGetAllLiveQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ContainerStyle $image={Bg_Image}>
      {isLoading ? (
        <Loading
          isError={isError}
          isLoading={isLoading}
          error={error as string}
          type="live"
        />
      ) : (
        <SliderContent {...settings}>
          {data?.livetv?.map((live) => (
            <div key={live.id}>
              <h3>{live.name}</h3>
              <ReactPlayer controls height={400} width="100%" url={live.url} />
            </div>
          ))}
        </SliderContent>
      )}
    </ContainerStyle>
  );
};

export default Live;
