import styled from "styled-components";

interface ContentImageProps {
  $image: string; // Define $image prop with the $ prefix
}

const ContentImage = styled.section<ContentImageProps>`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  height: 300px; /* Adjust the height as needed */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface HeadingBackImageProps {
  text: string;
  image: string;
}

const HeadingBackImage: React.FC<HeadingBackImageProps> = ({ text, image }) => {
  return (
    <ContentImage $image={image}>
      {" "}
      {/* Use $image prop */}
      <h1>{text}</h1>
    </ContentImage>
  );
};

export default HeadingBackImage;
