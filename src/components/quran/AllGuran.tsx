import { useGetAllSurahQuery } from "@app/apis/quran/apiSlice";
import { Col, Container, Row } from "react-bootstrap";
import OneSurah from "./OneSurah";
import HeadingBackImage from "@common/HeadingBackImage";
import BackgroundImage from "@assets/cars1.jpg";
import styled from "styled-components";
import useInput from "src/hooks/useInput";
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

const Search = styled.div`
  margin: 1rem 0;
  padding: 5px;
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  label {
    font-size: 20px;
    font-weight: 600;
  }

  input {
    border-radius: 5px;
    padding: 5px 10px;
    width: 50%;
    outline: none;
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.block};
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.border};

    &:focus {
      border: 1px solid;
      border-color: ${(props) => props.theme.colors.primary};
      transition: all 0.2s ease-in-out;
    }
  }
`;

const HeadingWarning = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
`;

const AllGuran = () => {
  const { data: ListSurahs, isLoading, isError, error } = useGetAllSurahQuery();
  const { value, onChange } = useInput();

  // Function to filter data based on search query
  const filterData = () => {
    return (
      ListSurahs?.data?.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase())
      ) || []
    );
  };

  return (
    <>
      <HeadingBackImage
        image={BackgroundImage}
        text={
          "الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلَاوَتِهِ أُولَئِكَ يُؤْمِنُونَ بِهِ وَمَن يَكْفُرْ بِهِ فَأُولَئِكَ هُمُ الْخَاسِرُونَ"
        }
      />
      {isLoading ? (
        <Loading
          isLoading={isLoading}
          isError={isError}
          error={error as string}
          type="quran"
        />
      ) : (
        <Container>
          <Row className="g-2">
            <Col lg={12}>
              <Search>
                <label htmlFor="surahName">البحث</label>
                <input
                  type="text"
                  id="surahName"
                  placeholder="أدخل اسم السورة"
                  value={value}
                  onChange={onChange}
                />
              </Search>
            </Col>

            {filterData().length > 1 ? (
              <>
                {filterData().map((surah: Surah) => (
                  <Col xs={6} md={3} key={surah.number}>
                    <OneSurah surah={surah} />
                  </Col>
                ))}
              </>
            ) : (
              <HeadingWarning>لا يوجد شئ لعرضه</HeadingWarning>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default AllGuran;
