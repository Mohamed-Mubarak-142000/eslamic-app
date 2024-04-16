import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import styled from "styled-components";

const LayoutStyle = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;
const Layout = () => {
  return (
    <LayoutStyle>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        {" "}
        <Outlet />
      </div>
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;
