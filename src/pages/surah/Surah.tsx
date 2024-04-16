import { OneAyah, useGetOneSurahQuery } from "@app/apis/quran/apiSlice";
import HeadingOfSurah from "@common/HeadingOfSurah";
import Loading from "@common/Loading";
import RelatedSurahs from "@components/relatedSurahs/RelatedSurahs";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContentSurah = styled.section`
  height: 100vh;
  overflow-y: scroll;
  padding: 0 15px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
  line-height: 35px;
  h2,
  h5 {
    text-align: center;
    margin-top: 1rem;
  }
`;

const Surah = () => {
  const { number } = useParams();
  const { data, isLoading, isError, error } = useGetOneSurahQuery(number);

  if (isLoading) {
    return (
      <Loading
        error={error as string}
        isError={isError}
        isLoading={isLoading}
        type="quran"
      />
    );
  }
  if (isError) {
    return (
      <Container>
        <div>Error: {error as string} </div>
      </Container>
    );
  }

  console.log(data?.data);

  return (
    <Container>
      <HeadingOfSurah
        name={data?.data?.name}
        numberOfAyahs={data?.data?.numberOfAyahs}
        revelationType={data?.data?.revelationType}
        englishName={data?.data?.englishName}
      />
      <ContentSurah>
        <h2>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</h2>
        {data?.data?.ayahs?.map((ayah: OneAyah, index: number) => (
          <span key={index}>
            {ayah.text
              .replace(/\n/g, "")
              .replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", " ")}
            ۞
          </span>
        ))}
        <h5>صدق الله العظيم</h5>
      </ContentSurah>

      <RelatedSurahs numberOfJuz={data?.data?.ayahs[0]?.juz} />
    </Container>
  );
};

export default Surah;
