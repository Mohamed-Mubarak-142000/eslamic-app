import styled from "styled-components";

const FooterStyle = styled.div`
  border-top: 1px solid gray;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  text-transform: capitalize;
`;
const Footer = () => {
  return (
    <FooterStyle>
      <span>.&copy;2024 all right reversed</span>
    </FooterStyle>
  );
};

export default Footer;
