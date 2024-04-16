import { azkar } from "src/data/AzkarDb";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContentAzkar = styled.div`
  border-radius: 10px;
  height: 600px;
  background-color: ${(props) => props.theme.colors.block};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
`;

const SliderContent = styled(Slider)`
  padding: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
  border-radius: 10px;
  text-align: center;
  width: 90%;
  margin: auto;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

interface TCategory {
  category: string;
}
const ShowContentAzkar: React.FC<TCategory> = ({ category }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed in milliseconds (3 seconds in this case)
  };

  return (
    <ContentAzkar>
      <h2
        style={{
          textAlign: "center",
          borderRadius: "10px 10px 0 0",
          padding: "5px",
        }}
        className="bg-primary"
      >
        {category}
      </h2>
      {Object.entries(azkar).map(([key, val], i) => {
        const res = key === category;
        if (res) {
          return (
            <div key={i}>
              <SliderContent {...settings}>
                {val.map((v, j) => (
                  <div key={j}>
                    <h2 key={j}>{v.content}</h2>
                    <h3>{v.description}</h3>
                    <h4 className="text-primary">({v.count}) مرات</h4>
                  </div>
                ))}
              </SliderContent>
            </div>
          );
        } else {
          return null;
        }
      })}
    </ContentAzkar>
  );
};

export default ShowContentAzkar;
