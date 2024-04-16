import React from "react";
import { useGetAllSurahQuery } from "@app/apis/quran/apiSlice";
import { Col, Container, Row } from "react-bootstrap";
import OneSurah from "./OneSurah";
import BtnPlus from "@common/BtnPlus";
import Loading from "@common/Loading";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  numberOfAyahs: number;
}

export interface SurahResponse {
  data: Surah[];
}

const SomeQuran: React.FC = () => {
  const { data: ListSurahs, isLoading, error, isError } = useGetAllSurahQuery();

  const first10Surahs = ListSurahs?.data?.slice(0, 9);

  return (
    <Container className="my-5" style={{ minHeight: "400px" }}>
      {isLoading && (
        <Loading
          type="quran"
          isLoading={isLoading}
          error={error as string}
          isError={isError}
        />
      )}

      <Row className="g-2">
        {first10Surahs?.map((surah: Surah) => (
          <Col xs={6} md={3} key={surah.number}>
            <OneSurah surah={surah} />
          </Col>
        ))}
        <Col xs={6} md={3}>
          <BtnPlus />
        </Col>
      </Row>
    </Container>
  );
};

export default SomeQuran;
