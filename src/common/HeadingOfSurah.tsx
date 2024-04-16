import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
interface Tdata {
  name: string | undefined;
  numberOfAyahs: number | undefined;
  revelationType: string | undefined;
  englishName: string | undefined;
}

const RowStyle = styled(Row)`
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
  padding: 5px 0;
  margin: 2rem 0 0rem 0;
`;
const HeadingOfSurah: React.FC<Tdata> = ({
  name,
  numberOfAyahs,
  revelationType,
  englishName,
}) => {
  return (
    <RowStyle>
      <Col xs={6} lg={3}>
        <h6>{name}</h6>
      </Col>
      <Col xs={6} lg={3}>
        <h6>الايات:({numberOfAyahs}) </h6>
      </Col>
      <Col xs={6} lg={3}>
        <h6>مكان النزول:{revelationType}</h6>
      </Col>
      <Col xs={6} lg={3}>
        <h6>{englishName}</h6>
      </Col>
    </RowStyle>
  );
};

export default HeadingOfSurah;
