import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface DateTimeProps {
  date: string;
  day: string;
  time: string;
}

const StyledDateTime = styled(motion.section)`
  color: white;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.border};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); /* Shadow effect */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  text-transform: capitalize;
  border-radius: 10px;
  font-size: 35px;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const GetTime: React.FC<DateTimeProps> = ({ time, date, day }) => {
  return (
    <StyledDateTime>
      <span>{time}</span>
      <span>{date}</span>
      <span>{day}</span>
    </StyledDateTime>
  );
};

export default GetTime;
