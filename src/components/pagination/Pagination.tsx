import { Button, ButtonProps } from "react-bootstrap";
import styled from "styled-components";

// Define the type for styled button component
const BtnPagination = styled(Button)<ButtonProps>`
  background-color: ${(props) => props.theme.colors.block};
  border-color: ${(props) => props.theme.colors.border};
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

// Pagination component
const Pagination = ({ itemsPerPage, totalItems, paginate }: any) => {
  const pageNumbers = [];

  // Generate page numbers based on total items and items per page
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {/* Use styled Button component */}
            <BtnPagination
              onClick={() => paginate(number)}
              className="m-1 page-link"
            >
              {number}
            </BtnPagination>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
