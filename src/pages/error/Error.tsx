import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.section`
  width: 90%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  h1 {
    font-size: 135px;
  }

  p {
    font-size: 50px;
  }

  a {
    text-align:center
    font-size: 20px;
  }
`;
const Error = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>page not found</p>
      <Link to={"/"} replace={true}>
        how about going back to safty
      </Link>
    </Container>
  );
};

export default Error;
