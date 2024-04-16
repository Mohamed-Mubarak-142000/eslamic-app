import React, { useState, useMemo, lazy } from "react";
import {
  OneMoshaf,
  OneReciter,
  OneSurah,
  useGetAllRecitersQuery,
  useGetAllSurahsQuery,
  useGetOneReciterQuery,
} from "@app/apis/audio/apiSlice";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "@components/pagination/Pagination";
import SelectedList from "./SelectedList";
import styled from "styled-components";
import BackgroundImage from "@assets/cars2.jpg";
import Loading from "@common/Loading";

// Lazy load the OneAudioPlayer component
const OneAudioPlayer = lazy(() => import("./OneAudioPlayer"));
interface ContentImageProps {
  $image: string; // Define $image prop with the $ prefix
}

const ContainerSelected = styled.section<ContentImageProps>`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.5)
    ),
    url(${(props) => props.$image});

  background-size: cover;
  background-position: center;
  height: 300px; /* Adjust the height as needed */
  position: relative;
  margin-bottom: 3rem;
  border-radius: 7px;
  @media (max-width: 768px) {
    width: 100%;
  }

  section {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%);
    height: 200px;
    width: 50%;
    z-index: 10000;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    border-radius: 7px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5); /* Shadow effect */
    h4 {
      color: ${(props) => props.theme.colors.primary};
    }
    div {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;

const SomeQuranAudio = () => {
  const { data: allReciters } = useGetAllRecitersQuery();
  const { data, isLoading, isError, error } = useGetAllSurahsQuery();
  const [selectedReciterId, setSelectedReciterId] = useState<number | null>(
    null
  );

  const { data: oneReciterData } = useGetOneReciterQuery(
    selectedReciterId || undefined
  );

  const [selectedMoshafId, setSelectedMoshafId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items per page

  //Function handleReciterChange
  const handleReciterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value);
    setSelectedReciterId(isNaN(id) ? null : id);
    setSelectedMoshafId(null); // Reset selected moshaf when reciter changes
  };

  //Function handleMoshafChange
  const handleMoshafChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value);
    setSelectedMoshafId(isNaN(id) ? null : id);
  };

  // Memoize the mapping functions
  const audioPlayers = useMemo(() => {
    if (!oneReciterData || !data || selectedMoshafId === null) return null;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = oneReciterData.reciters
      .flatMap((reciter: OneReciter) =>
        reciter.moshaf?.flatMap((moshaf: OneMoshaf) => {
          if (moshaf.id === selectedMoshafId) {
            return moshaf.surah_list.split(",").map((surahId: string) => {
              const matchingSurah = data.suwar.find(
                (suwar: OneSurah) => suwar.id === parseInt(surahId)
              );

              if (matchingSurah) {
                return (
                  <Col lg={3} key={matchingSurah.id}>
                    <OneAudioPlayer
                      makkia={matchingSurah.makkia}
                      moshafLink={moshaf.server}
                      matchingSurahName={matchingSurah.name}
                      matchingSurahId={matchingSurah.id}
                      moshfName={moshaf.name}
                      reciterName={reciter.name}
                    />
                  </Col>
                );
              }
              return null;
            });
          }
          return null;
        })
      )
      .slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  }, [oneReciterData, data, selectedMoshafId, currentPage, itemsPerPage]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total items for pagination
  const totalSurahs = useMemo(() => {
    if (!oneReciterData || !selectedMoshafId) return 0;

    return oneReciterData.reciters.reduce((total, reciter) => {
      const matchingMoshaf = reciter.moshaf?.find(
        (moshaf) => moshaf.id === selectedMoshafId
      );
      if (matchingMoshaf) {
        return matchingMoshaf.surah_list.split(",").length;
      }
      return total;
    }, 0);
  }, [oneReciterData, selectedMoshafId]);

  const totalItems = totalSurahs || 0;
  return (
    <Container>
      <Row className="g-2">
        <ContainerSelected $image={BackgroundImage}>
          <section>
            <h4>أختر القارئ المفضل:</h4>
            <div>
              <SelectedList
                options={allReciters?.reciters || []}
                value={selectedReciterId}
                onChange={handleReciterChange}
              />
            </div>
            <h4>أختر القراءة المفضلة:</h4>

            <div>
              <SelectedList
                options={
                  oneReciterData?.reciters
                    .filter(
                      (reciter: OneReciter) => reciter.id === selectedReciterId
                    )
                    .flatMap((reciter: OneReciter) => reciter.moshaf) || []
                }
                value={selectedMoshafId}
                onChange={handleMoshafChange}
                disabled={!selectedReciterId}
              />
            </div>
          </section>
        </ContainerSelected>

        <div style={{ minHeight: "400px", marginTop: "3rem" }}>
          {isLoading ? (
            <Loading
              type="audio"
              isLoading={isLoading}
              error={error as string}
              isError={isError}
            />
          ) : (
            <Row className="g-2">{audioPlayers}</Row>
          )}
        </div>
      </Row>

      <Row>
        <Col lg={12} className=" g-1 d-flex justify-content-center">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginate={paginate}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SomeQuranAudio;
