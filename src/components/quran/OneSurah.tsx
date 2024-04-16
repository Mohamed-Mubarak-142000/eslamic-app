import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardStyle = styled(Card)`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.border};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
  &:hover {
    transform: scale(0.9);
    transition: all 0.5s ease;
    border-radius: 7px;
  }
`;
const CardTitle = styled(Card.Title)`
  color: ${(props) => props.theme.colors.text};
`;

const CardSubtitle = styled(Card.Subtitle)`
  color: ${(props) => props.theme.colors.secondary};
`;
const CardText = styled(Card.Text)`
  color: ${(props) => props.theme.colors.primary};
`;

const CardBody = styled(Card.Body)`
  text-decoration: none;
`;

interface Tsurah {
  number: number | undefined;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  englishNameTranslation?: string;
}

const OneSurah = ({ surah }: { surah: Tsurah }) => {
  return (
    <CardStyle>
      <CardBody as={Link} to={`/surah/${surah.number}`}>
        <CardTitle>{surah.name}</CardTitle>
        <CardSubtitle>{surah.englishName}</CardSubtitle>
        <CardText>عدد الايات : {surah.numberOfAyahs}</CardText>
        <CardText> رقم السورة : {surah.number}</CardText>
      </CardBody>
    </CardStyle>
  );
};

export default OneSurah;
