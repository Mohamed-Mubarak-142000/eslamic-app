import useTheme from "src/hooks/useThemes";
import styled from "styled-components";
import { IoClose, IoSettings } from "react-icons/io5";
import { motion } from "framer-motion";
import { MdOutlineLightMode } from "react-icons/md";
import React from "react";

// Create a styled component using the theme
const StyledButton = styled.section`
  position: absolute;
  top: 100px;
  left: 0px;
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.primary};
  padding: 10px 5px;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  z-index: 10000;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  main {
    border-radius: 7px;
    padding: 10px 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.colors.block};
  }
  div {
    border-radius: 5px;
    padding: 5px 20px;
    position: relative;
    &:hover {
      transition: all 0.2s ease-in-out;
      background-color: ${(props) => props.theme.colors.background};
      corsur: pointer;
    }
  }
`;

interface ThemeBtnProps {
  toggleSidebar: () => void;
  rotate: number;
  open: string;
}
const ThemeBtn: React.FC<ThemeBtnProps> = ({ toggleSidebar, rotate, open }) => {
  const { isLightTheme, toggleTheme } = useTheme();

  return (
    <StyledButton>
      {open === "true" ? (
        <IoClose onClick={toggleSidebar} size={30} />
      ) : (
        <motion.span style={{ rotate: rotate }}>
          <IoSettings onClick={toggleSidebar} size={30} />
        </motion.span>
      )}

      {open === "true" && (
        <main>
          <div onClick={toggleTheme}>
            mode
            {isLightTheme ? (
              <MdOutlineLightMode color="gold" size={20} />
            ) : (
              <MdOutlineLightMode color="gray" size={20} />
            )}
          </div>
        </main>
      )}
    </StyledButton>
  );
};

export default ThemeBtn;
