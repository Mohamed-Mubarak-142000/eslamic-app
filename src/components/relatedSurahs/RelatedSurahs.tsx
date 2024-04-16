import { useGetAllSurahsOfJuzQuery } from "@app/apis/quran/apiSlice";
import HeadingWithMotion from "@common/Heading";
import Loading from "@common/Loading";
import OneSurah from "@components/quran/OneSurah";
import { Col, Container, Row } from "react-bootstrap";

interface TnumberOfJuz {
  numberOfJuz: number | undefined;
}
const RelatedSurahs: React.FC<TnumberOfJuz> = ({ numberOfJuz }) => {
  const {
    data: allGetSurahOfJuz,
    isLoading: isLoadingJuz,
    isError: isErrorJuz,
    error: errorJuz,
  } = useGetAllSurahsOfJuzQuery(numberOfJuz);

  if (isLoadingJuz) {
    return (
      <Loading
        error={errorJuz as string}
        isError={isErrorJuz}
        isLoading={isLoadingJuz}
        type="quran"
      />
    );
  }
  if (isErrorJuz) {
    return (
      <Container>
        <div>Error: {errorJuz as string} </div>
      </Container>
    );
  }
  return (
    <Row className="g-2">
      <Col lg={12}>
        <HeadingWithMotion
          mainText="السور المشتركة في نفس الجزء"
          text={numberOfJuz}
        />
      </Col>
      {Object.entries(allGetSurahOfJuz?.data?.surahs || {}).map(
        ([surahNumber, surah]) => (
          <Col xs={6} md={3} key={surah.number}>
            <OneSurah key={surahNumber} surah={surah} />
          </Col>
        )
      )}
    </Row>
  );
};

export default RelatedSurahs;
