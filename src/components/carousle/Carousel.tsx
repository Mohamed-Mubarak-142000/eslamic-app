import HomeAnimation from "@assets/lottiFiles/HomeAnimation.json";
import GetTime from "@utils/GetTime";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "@assets/cars1.jpg";
import { motion } from "framer-motion";
import { getFormattedDateTime } from "@utils/functionsTime";
import { Col, Container, Row } from "react-bootstrap";
// Define the image path here

interface ContentImageProps {
  $image: string; // Define $image prop with the $ prefix
}

const Content = styled.section<ContentImageProps>`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.7)
    ),
    url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  min-height: 600px;
  gap: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};

  main {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    h1 {
      width: 90%;
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;
    }
  }
`;

function MyCarousel() {
  const [formattedDateTime, setFormattedDateTime] = useState<{
    day: string;
    date: string;
    time: string;
  }>(getFormattedDateTime());

  const text =
    "الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلَاوَتِهِ أُولَئِكَ يُؤْمِنُونَ بِهِ وَمَن يَكْفُرْ بِهِ فَأُولَئِكَ هُمُ الْخَاسِرُونَ";

  const textVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05, // Adjust the delay between each character
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDateTime(getFormattedDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Content $image={backgroundImage}>
      <Container>
        <Row>
          <Col lg={6}>
            <Lottie animationData={HomeAnimation} />
          </Col>

          <Col lg={6}>
            <main>
              <GetTime
                time={formattedDateTime.time}
                day={formattedDateTime.day}
                date={formattedDateTime.date}
              />

              <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {text.split("").map((char, index) => (
                  <motion.span
                    style={{
                      textShadow: " 4px 4px 4px rgba(0.5, 0.5, 0.5, 0.8)",
                    }}
                    key={index}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </main>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}

export default MyCarousel;
