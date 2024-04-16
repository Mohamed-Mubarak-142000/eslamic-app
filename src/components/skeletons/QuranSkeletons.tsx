import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const QuranSkeletons: React.FC = () => {
  const renderSkeleton = Array(4)
    .fill(0)
    .map((_, index) => {
      return (
        <Col lg={3} key={index}>
          <ContentLoader
            speed={2}
            width={350}
            height={160}
            viewBox="0 0 320 160"
            backgroundColor="#e6e6e6"
            foregroundColor="#ffffff"
          >
            <rect x="13" y="12" rx="3" ry="3" width="246" height="135" />
            <rect x="92" y="164" rx="10" ry="10" width="147" height="18" />
          </ContentLoader>
        </Col>
      );
    });
  return (
    <Container className="mt-5">
      <Row>{renderSkeleton}</Row>
      <Row>{renderSkeleton}</Row>
    </Container>
  );
};

export default QuranSkeletons;
