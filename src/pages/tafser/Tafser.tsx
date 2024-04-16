import { TOneTafser, useGetTafserQuranQuery } from "@app/apis/audio/apiSlice";
import HeadingBackImage from "@common/HeadingBackImage";
import useInput from "src/hooks/useInput";
import BackgroundImage from "@assets/cars1.jpg";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import OneTafser from "./OneTafser";
import Loading from "@common/Loading";

const HeadingWarning = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
`;

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
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.block};

    &:focus {
      border: 1px solid;
      border-color: ${(props) => props.theme.colors.primary};
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Tafser = () => {
  const { data, isLoading, isError, error } = useGetTafserQuranQuery();
  const { value, onChange } = useInput();

  // Function to filter data based on search query
  const filterData = () => {
    return (
      data?.tafasir.soar?.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase())
      ) || []
    );
  };

  console.log("first", data);
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
                {filterData().map((tafser: TOneTafser) => (
                  <Col xs={6} md={3} key={tafser.id}>
                    <OneTafser sura_id={0} {...tafser} />
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

export default Tafser;
