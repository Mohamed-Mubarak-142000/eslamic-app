import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Btn = styled(Link)`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.secondary};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.2s ease-in-out;
  }
`;
const BtnPlus = () => {
  return (
    <Btn to={"/all-quran"}>
      <FaPlus size={80} />
    </Btn>
  );
};

export default BtnPlus;
