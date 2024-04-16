import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const Heading = styled(motion.h2)`
  margin: 1rem 0;
  background-color: #2980b9;
  padding: 20px; /* Add padding for spacing */
  color: #fff; /* Text color */
  text-align: center; /* Center align text */
  font-size: 28px; /* Adjust font size */
  font-weight: bold; /* Make text bold */
`;

interface Ttext {
  text: string | undefined | number;
  mainText: string;
}
const HeadingWithMotion = ({ text, mainText }: Ttext) => {
  const controls = useAnimation();

  useEffect(() => {
    const scrollHandler = () => {
      const windowHeight = window.innerHeight;
      const heading = document.getElementById("heading");

      if (heading) {
        const headingTop = heading.getBoundingClientRect().top;

        // If heading is within the viewport, animate it
        if (headingTop < windowHeight * 0.75) {
          controls.start({ opacity: 1, y: 0 });
        } else {
          controls.start({ opacity: 0, y: 50 });
        }
      }
    };

    window.addEventListener("scroll", scrollHandler);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [controls]);

  return (
    <Container>
      <Heading
        id="heading"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        {mainText}
        <span>({text})</span>
      </Heading>
    </Container>
  );
};

export default HeadingWithMotion;
