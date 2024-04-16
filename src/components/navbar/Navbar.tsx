import { useState } from "react";
import LogoImage from "@assets/logo.svg?react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Btn,
  Logo,
  Menu,
  MenuBtn,
  MenuBtnBurger,
  MenuItem,
  MenuResponsive,
  NavbarContainer,
  NavbarWrapper,
} from "./styles";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <Logo onClick={() => navigate("/")}>
          <LogoImage />
          <span>المؤمن</span>
        </Logo>
        <MenuBtn onClick={toggleMenu}>
          <MenuBtnBurger />
          <MenuBtnBurger />
          <MenuBtnBurger />
        </MenuBtn>

        <MenuResponsive
          onClick={toggleMenu}
          isOpen={isOpen}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
          transition={{ duration: 0.2 }}
        >
          <MenuItem as={NavLink} to={"/"}>
            الرئيسية
          </MenuItem>
          <MenuItem as={NavLink} to={"/ahadith"}>
            أحاديث النبوية
          </MenuItem>
          <MenuItem as={NavLink} to={"/tafser"}>
            تفسير القران
          </MenuItem>
          <MenuItem as={NavLink} to={"/azkar"}>
            أذكار المسلم
          </MenuItem>
          <MenuItem as={NavLink} to={"/prayer-timing"}>
            توقيتات الصلاة
          </MenuItem>{" "}
          <MenuItem as={NavLink} to={"/library"}>
            مكتبتي
          </MenuItem>
          <Btn to={"/login"}>تسجيل الدخول</Btn>
        </MenuResponsive>

        <Menu
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MenuItem as={NavLink} to={"/"}>
            الرئيسية
          </MenuItem>
          <MenuItem as={NavLink} to={"/ahadith"}>
            أحاديث النبوية
          </MenuItem>
          <MenuItem as={NavLink} to={"/tafser"}>
            تفسير القران
          </MenuItem>
          <MenuItem as={NavLink} to={"/azkar"}>
            أذكار المسلم
          </MenuItem>{" "}
          <MenuItem as={NavLink} to={"/prayer-timing"}>
            توقيتات الصلاة
          </MenuItem>
          <MenuItem as={NavLink} to={"/library"}>
            مكتبتي
          </MenuItem>
          <Btn to={"/login"}>تسجيل الدخول</Btn>
        </Menu>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
