import HeadingWithMotion from "@common/Heading";
import Live from "@components/Live/Live";
import SomeQuranAudio from "@components/SomeQuranAudio/SomeQuranAudio";
import MyCarousel from "@components/carousle/Carousel";
import SomeQuran from "@components/quran/SomeQuran";
import styled from "styled-components";

const ContainerHome = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const Home = () => {
  return (
    <ContainerHome>
      <MyCarousel />
      <HeadingWithMotion text={"(قراءة)"} mainText=" القران الكريم" />
      <SomeQuran />
      <SomeQuranAudio />
      <Live />
    </ContainerHome>
  );
};

export default Home;
