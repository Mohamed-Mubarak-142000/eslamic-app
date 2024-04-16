import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { OneWishList, removeFromWishlist } from "@app/apis/audio/wishList";

const SectionStyle = styled.section`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};
  border-radius: 7px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.border};
  padding: 5px;
  margin-bottom: 10px;

  div {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;

    audio {
      width: 100%;
      background-color: ${(props) => props.theme.colors.block};
    }
  }
`;

const LibraryItems = () => {
  const dispatch: AppDispatch = useDispatch();
  const wishlist = useSelector(
    (state: RootState) => state.wishlist?.wishlistItems
  );

  const memoizedWishlist = useMemo(() => wishlist, [wishlist]);

  const handleRemoveWishlist = (id: number) => {
    dispatch(
      removeFromWishlist({
        id: id,
        name: "",
        moshafLink: "",
        linkAudio: "",
        moshfName: "",
        reciterName: "",
      })
    );
  };

  return (
    <Container className="mt-4">
      <h1 style={{ fontWeight: "bold" }}>مكتبتك</h1>
      <Row xs={1} md={2}>
        {wishlist.length ? (
          memoizedWishlist?.map((item: OneWishList) => (
            <Col key={item.id}>
              <SectionStyle className="mb-4">
                <div className="d-flex justify-content-between align-items-center px-4 py-2">
                  <h6>سورة :{item.name}</h6>
                  <h6>{item.makkia ? "Makkia" : "Madania"}</h6>

                  <FaHeart
                    style={{ cursor: "pointer" }}
                    color={"red"}
                    onClick={() => handleRemoveWishlist(item.id)}
                  />
                </div>

                <div>
                  <audio controls preload="auto">
                    <source src={`${item.moshafLink}${item.linkAudio}.mp3`} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="d-flex justify-content-between px-4 py-2">
                  <span>الشيخ:{item.reciterName}</span>
                  <span>{item.moshfName}</span>
                </div>
              </SectionStyle>
            </Col>
          ))
        ) : (
          <h1 className="text-secondary text-center">
            لا يوجد شئ في مكتبتك لعرضها
          </h1>
        )}
      </Row>
    </Container>
  );
};

export default LibraryItems;
