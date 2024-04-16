import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const HadithSkeleton: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col lg={3}>
          <ContentLoader
            speed={2}
            width={500}
            height={600}
            viewBox="0 0 500 600"
            backgroundColor="#e6e6e6"
            foregroundColor="#ffffff"
          >
            <rect x="115" y="51" rx="0" ry="0" width="284" height="476" />
          </ContentLoader>
        </Col>
        <Col lg={9}>
          <ContentLoader
            speed={2}
            width={500}
            height={600}
            viewBox="0 0 500 600"
            backgroundColor="#e6e6e6"
            foregroundColor="#ffffff"
          >
            <rect x="-188" y="43" rx="4" ry="4" width="616" height="53" />
            <rect x="-185" y="106" rx="4" ry="4" width="616" height="53" />
            <rect x="-186" y="166" rx="4" ry="4" width="616" height="53" />
            <rect x="-183" y="231" rx="4" ry="4" width="616" height="53" />
            <rect x="-182" y="296" rx="4" ry="4" width="616" height="53" />
          </ContentLoader>
        </Col>
      </Row>
    </Container>
  );
};

export default HadithSkeleton;
