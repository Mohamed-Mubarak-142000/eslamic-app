import React, { useState } from "react";
import { useGetAllBooksQuery } from "@app/apis/ahadith/apiSliceHadith";
import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import ShowContentHadith from "./ShowContentHadith";
import { motion } from "framer-motion";
import Loading from "@common/Loading";
import { BsList } from "react-icons/bs";
import { translateHadithKey } from "@utils/functionsTime";

interface Book {
  id: string;
  name: string;
}

const SideBar = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.block};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
  position: absolute;
  z-index: 3000;
  h3 {
    text-align: center;
    border-radius: 10px 10px 0 0;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
  }
  div {
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    &:hover {
      background-color: ${(props) => props.theme.colors.background};
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Ahadith: React.FC = () => {
  const { data, isLoading, isError, error } = useGetAllBooksQuery();
  const [person, setPerson] = useState<string>("muslim");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isLoading ? (
        <Loading
          isLoading={isLoading}
          isError={isError}
          error={error as string}
          type="hadith"
        />
      ) : (
        <Container className="mt-2">
          <Row className="g-3">
            <Col lg={2}>
              <Button
                variant="outline-primary"
                style={{
                  width: "50px",
                  height: "50px",
                  padding: "10px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={toggleSidebar}
              >
                <BsList size={30} />
              </Button>
              <SideBar
                onClick={toggleSidebar}
                initial={false}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={{
                  open: {
                    height: "500px",
                    width: "300px",
                    transition: { ease: "easeOut", duration: 0.3 },
                  },
                  closed: {
                    height: 0,
                    width: 0,
                    transition: { ease: "easeIn", duration: 0.3 },
                  },
                }}
              >
                {data?.data?.map((book: Book, i: number) => (
                  <div key={i} onClick={() => setPerson(book.id)}>
                    {translateHadithKey(book.name)}
                  </div>
                ))}
              </SideBar>
            </Col>
            <Col lg={12}>
              <ShowContentHadith person={person} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Ahadith;
