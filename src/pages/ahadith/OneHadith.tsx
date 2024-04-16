import { OneHadith as TOneHadith } from "@app/apis/ahadith/apiSliceHadith";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styled from "styled-components";

const dropdownVariants = {
  open: {
    maxHeight: "500px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    maxHeight: "0",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const ContentOneHadith = styled.section`
  h5 {
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
    background-color: ${(props) => props.theme.colors.block};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.border};
    border-top: none;
    border-radius: 0 0 10px 10px;
    padding: 5px 10px;
    font-size: 18px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); /* Shadow effect */
  }
`;

const OneHadith: React.FC<TOneHadith> = ({ number, arab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ContentOneHadith>
      <h5 onClick={toggleDropdown} aria-expanded={isOpen}>
        <span>الحديث ({number})</span>

        <span>{isOpen ? <FaAngleDown /> : <FaAngleUp />}</span>
      </h5>
      <motion.div
        variants={dropdownVariants}
        animate={isOpen ? "open" : "closed"}
        style={{ overflow: "hidden" }}
        aria-hidden={!isOpen}
      >
        <p>{arab}</p>
      </motion.div>
    </ContentOneHadith>
  );
};

export default OneHadith;
