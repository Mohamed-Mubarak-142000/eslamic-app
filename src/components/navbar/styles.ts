import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  height: 60px;
  background-color: ${(props) => props.theme.colors.block};
  color: ${(props) => props.theme.colors.text};
  position: relative;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

export const NavbarContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
  @media screen and (min-width: 768px) {
    justify-content: space-center;
    gap: 9rem;
  }
`;

export const Logo = styled.div`
  font-size: 28px;
  color: #0066fa;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: "Andalus";
`;

export const MenuBtn = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

export const MenuBtnBurger = styled.div`
  width: 30px;
  height: 2px;
  background-color: #0066fa;
  margin-bottom: 6px;
`;

export const Menu = styled(motion.ul)`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5rem;
  margin: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuResponsive = styled(motion.ul)<{ isOpen: boolean }>`
  list-style: none;
  display: none;
  gap: 20px;
  @media (max-width: 768px) {
    position: absolute;
    top: 102%;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-radius: 0 0px 10px 0;
    background-color: ${(props) => props.theme.colors.block};
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    ${({ isOpen }) => (isOpen ? "display: flex;" : "display: none;")}
  }
`;

export const MenuItem = styled(motion.li)`
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  &.active {
    background-color: #0066fa;
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    width: 80%;
    padding: 10px;
    &:hover {
      background-color: ${(props) => props.theme.colors.background};
    }
  }
`;

export const Btn = styled(Link)`
  text-decoration: none;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.primary};
  padding: 5px 20px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    color: ${(props) => props.theme.colors.text};
    transition: all 0.2s ease-in-out;
  }
`;
