import { Button, Col, Container, Row } from "react-bootstrap";
import { azkar } from "../../data/AzkarDb";
import styled from "styled-components";
import { useState } from "react";
import ShowContentAzkar from "./ShowContentAzkar";
import { motion } from "framer-motion";
import { BsList } from "react-icons/bs";

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

const Azkar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState("أذكار الصباح");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Container className="mt-5">
      <Row className="g-3">
        <Col lg={3}>
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
            {Object.entries(azkar).map(([key], i) => (
              <div key={i} onClick={() => setCategory(key)}>
                {key}
              </div>
            ))}
          </SideBar>
        </Col>
        <Col lg={12}>
          <ShowContentAzkar category={category} />
        </Col>
      </Row>
    </Container>
  );
};

export default Azkar;
